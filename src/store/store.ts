import { AppState, AppStep, ScoreResult, QuestionResponse, FeatureToScore, BatchScoring, Toast, ConfirmDialog, ScoringSession, SessionFeature } from '../types';
import { getTierForScore } from '../data/tiers';
import { supabaseStore } from './supabase-store';
import { sessionStore } from './session-store';

const STORAGE_KEY = 'ice-scorecard-data';
const MAX_SAVED_SCORES = 100;

export class AppStore {
  private state: AppState;
  private listeners: Set<(state: AppState) => void> = new Set();
  private isRestoringFromHistory = false;

  constructor() {
    this.state = this.loadState();
    this.initializeHistory();
    this.loadScoresFromSupabase();
    this.loadSessionsFromSupabase();
  }

  private async loadScoresFromSupabase() {
    if (!supabaseStore) return; // Supabase not configured

    try {
      const scores = await supabaseStore.loadScores();
      if (scores.length > 0) {
        this.state.savedScores = scores;
        this.notify();
      }
    } catch (error) {
      console.error('Failed to load scores from Supabase:', error);
    }
  }

  private async loadSessionsFromSupabase() {
    try {
      const sessions = await sessionStore.loadSessions();
      if (sessions.length > 0) {
        this.state.sessions = sessions;
        this.notify();
      }
    } catch (error) {
      console.error('Failed to load sessions from Supabase:', error);
    }
  }

  private initializeHistory() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.step) {
        this.isRestoringFromHistory = true;
        this.state.currentStep = event.state.step;
        this.notify();
        this.isRestoringFromHistory = false;
      }
    });

    // Set initial history state
    if (window.history.state === null) {
      window.history.replaceState(
        { step: this.state.currentStep },
        '',
        `#${this.state.currentStep}`
      );
    }
  }

  private loadState(): AppState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return {
          currentStep: 'landing',
          featureName: '',
          scoredBy: 'PM',
          responses: {
            impact: [],
            confidence: [],
            effort: [],
          },
          savedScores: data.savedScores || [],
          toasts: [],
          sessions: [],
        };
      }
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
    }

    return {
      currentStep: 'landing',
      featureName: '',
      scoredBy: 'PM',
      responses: {
        impact: [],
        confidence: [],
        effort: [],
      },
      savedScores: [],
      toasts: [],
      sessions: [],
    };
  }

  private saveState(): void {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          savedScores: this.state.savedScores,
        })
      );
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        alert('Storage quota exceeded. Please clear old scores to continue.');
      }
    }
  }

  getState(): AppState {
    return { ...this.state };
  }

  subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.getState()));
  }

  setStep(step: AppStep): void {
    this.state.currentStep = step;

    // Update browser history (but not when restoring from history)
    if (!this.isRestoringFromHistory) {
      window.history.pushState(
        { step },
        '',
        `#${step}`
      );
    }

    this.notify();
  }

  setFeatureInfo(featureName: string, scoredBy: string): void {
    this.state.featureName = featureName;
    this.state.scoredBy = scoredBy || 'PM';
    this.notify();
  }

  setResponse(section: 'impact' | 'confidence' | 'effort', questionId: string, value: number): void {
    const responses = this.state.responses[section];
    const existingIndex = responses.findIndex((r) => r.questionId === questionId);

    if (existingIndex >= 0) {
      responses[existingIndex].value = value;
    } else {
      responses.push({ questionId, value });
    }

    this.notify();
  }

  getResponse(section: 'impact' | 'confidence' | 'effort', questionId: string): number | undefined {
    const response = this.state.responses[section].find((r) => r.questionId === questionId);
    return response?.value;
  }

  calculateScore(): ScoreResult {
    const impact = this.calculateAverage(this.state.responses.impact);
    const confidence = this.calculateAverage(this.state.responses.confidence);
    const ease = this.calculateAverage(this.state.responses.effort); // "Effort" questions use inverted scale, so higher = easier
    const iceScore = Number((impact * confidence * ease).toFixed(2));

    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().slice(0, 5);

    const result: ScoreResult = {
      featureName: this.state.featureName,
      scoredBy: this.state.scoredBy,
      impact: Number(impact.toFixed(2)),
      confidence: Number(confidence.toFixed(2)),
      effort: Number(ease.toFixed(2)), // Store as "effort" for consistency, but it's actually "ease"
      iceScore,
      tier: getTierForScore(iceScore),
      date,
      time,
      // Store detailed responses for later analysis
      responses: {
        impact: [...this.state.responses.impact],
        confidence: [...this.state.responses.confidence],
        effort: [...this.state.responses.effort],
      },
    };

    this.state.currentScore = result;
    this.notify();

    return result;
  }

  private calculateAverage(responses: QuestionResponse[]): number {
    if (responses.length === 0) return 0;
    const sum = responses.reduce((acc, r) => acc + r.value, 0);
    return sum / responses.length;
  }

  setJustification(justification: string): void {
    if (this.state.currentScore) {
      this.state.currentScore.justification = justification;
      this.notify();
    }
  }

  async saveCurrentScore(): Promise<void> {
    if (this.state.currentScore) {
      if (this.state.savedScores.length >= MAX_SAVED_SCORES && !supabaseStore) {
        this.showToast(`Maximum of ${MAX_SAVED_SCORES} scores reached. Please clear old scores.`, 'error');
        return;
      }

      // Generate a unique ID for the score
      const scoreWithId = {
        ...this.state.currentScore,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to Supabase if configured
      if (supabaseStore) {
        try {
          const savedScore = await supabaseStore.saveScore(scoreWithId);
          if (savedScore) {
            // Use the score from Supabase (has proper UUID)
            this.state.savedScores.push(savedScore);
          } else {
            // Fallback to local storage
            this.state.savedScores.push(scoreWithId);
          }
        } catch (error) {
          console.error('Failed to save to Supabase, using local storage:', error);
          this.state.savedScores.push(scoreWithId);
        }
      } else {
        // No Supabase, just use local storage
        this.state.savedScores.push(scoreWithId);
      }

      this.saveState();
      this.notify();
    }
  }

  async updateScore(id: string, updates: Partial<ScoreResult>): Promise<void> {
    const index = this.state.savedScores.findIndex((score) => score.id === id);
    if (index === -1) {
      console.error(`Score with ID ${id} not found`);
      return;
    }

    // Recalculate ICE score if any component changed
    let updatedScore = { ...this.state.savedScores[index], ...updates };

    if (updates.impact !== undefined || updates.confidence !== undefined || updates.effort !== undefined) {
      const impact = updates.impact ?? updatedScore.impact;
      const confidence = updates.confidence ?? updatedScore.confidence;
      const ease = updates.effort ?? updatedScore.effort;
      updatedScore.iceScore = Number((impact * confidence * ease).toFixed(2));
      updatedScore.tier = getTierForScore(updatedScore.iceScore);
    }

    updatedScore.updatedAt = new Date().toISOString();

    // Update in Supabase if configured
    if (supabaseStore) {
      try {
        await supabaseStore.updateScore(id, updatedScore);
      } catch (error) {
        console.error('Failed to update in Supabase:', error);
      }
    }

    this.state.savedScores[index] = updatedScore;
    this.saveState();
    this.notify();
  }

  async deleteScore(id: string): Promise<void> {
    const index = this.state.savedScores.findIndex((score) => score.id === id);
    if (index !== -1) {
      // Delete from Supabase if configured
      if (supabaseStore) {
        try {
          await supabaseStore.deleteScore(id);
        } catch (error) {
          console.error('Failed to delete from Supabase:', error);
        }
      }

      this.state.savedScores.splice(index, 1);
      this.saveState();
      this.notify();
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async clearAllScores(): Promise<void> {
    // Delete from Supabase if configured
    if (supabaseStore) {
      try {
        await supabaseStore.deleteAllScores();
      } catch (error) {
        console.error('Failed to clear scores from Supabase:', error);
      }
    }

    this.state.savedScores = [];
    this.saveState();
    this.notify();
  }

  resetForNewScore(): void {
    this.state.featureName = '';
    this.state.scoredBy = 'PM';
    this.state.responses = {
      impact: [],
      confidence: [],
      effort: [],
    };
    this.state.currentScore = undefined;
    this.state.currentStep = 'feature-input';
    this.notify();
  }

  needsJustification(): boolean {
    if (!this.state.currentScore) return false;
    const score = this.state.currentScore.iceScore;
    // Require justification for very high scores (top tier) or very low scores (bottom tier)
    return score >= 701 || score <= 100;
  }

  startBatchScoring(features: FeatureToScore[], scoredBy: string): void {
    this.state.batchScoring = {
      features,
      currentFeatureIndex: 0,
      scoredBy,
    };
    this.state.scoredBy = scoredBy;
    this.state.currentStep = 'batch-list';
    this.notify();
  }

  startScoringCurrentBatchFeature(): void {
    if (!this.state.batchScoring) return;

    const currentFeature = this.state.batchScoring.features[this.state.batchScoring.currentFeatureIndex];
    if (!currentFeature) return;

    // Mark as in-progress
    currentFeature.status = 'in-progress';

    // Set up for scoring
    this.state.featureName = currentFeature.name;
    this.state.scoredBy = this.state.batchScoring.scoredBy;
    this.state.responses = {
      impact: [],
      confidence: [],
      effort: [],
    };
    this.state.currentScore = undefined;
    this.state.currentStep = 'impact-intro';
    this.notify();
  }

  startScoringBatchFeatureByIndex(index: number): void {
    if (!this.state.batchScoring) return;
    if (index < 0 || index >= this.state.batchScoring.features.length) return;

    const feature = this.state.batchScoring.features[index];
    if (!feature || feature.status === 'completed') return;

    // Update current index
    this.state.batchScoring.currentFeatureIndex = index;

    // Mark as in-progress
    feature.status = 'in-progress';

    // Set up for scoring
    this.state.featureName = feature.name;
    this.state.scoredBy = this.state.batchScoring.scoredBy;
    this.state.responses = {
      impact: [],
      confidence: [],
      effort: [],
    };
    this.state.currentScore = undefined;
    this.state.currentStep = 'impact-intro';
    this.notify();
  }

  skipCurrentBatchFeature(): void {
    if (!this.state.batchScoring) return;

    const currentFeature = this.state.batchScoring.features[this.state.batchScoring.currentFeatureIndex];
    if (!currentFeature) return;

    // Mark as skipped
    currentFeature.status = 'skipped';

    // Move to next pending feature
    this.moveToNextPendingFeature();
  }

  private moveToNextPendingFeature(): void {
    if (!this.state.batchScoring) return;

    const features = this.state.batchScoring.features;
    const currentIndex = this.state.batchScoring.currentFeatureIndex;

    // Find next pending feature
    for (let i = currentIndex + 1; i < features.length; i++) {
      if (features[i].status === 'pending') {
        this.state.batchScoring.currentFeatureIndex = i;
        this.notify();
        return;
      }
    }

    // If no pending features found after current, check from beginning
    for (let i = 0; i < currentIndex; i++) {
      if (features[i].status === 'pending') {
        this.state.batchScoring.currentFeatureIndex = i;
        this.notify();
        return;
      }
    }

    // No pending features left, stay on batch list
    this.notify();
  }

  completeBatchFeature(): void {
    if (!this.state.batchScoring) return;

    const currentIndex = this.state.batchScoring.currentFeatureIndex;
    const currentFeature = this.state.batchScoring.features[currentIndex];
    if (!currentFeature) return;

    // Mark as completed
    currentFeature.status = 'completed';

    // Move to next pending feature
    this.state.currentStep = 'batch-list';
    this.moveToNextPendingFeature();
  }

  cancelBatchScoring(): void {
    this.state.batchScoring = undefined;
    this.state.currentStep = 'landing';
    this.notify();
  }

  isBatchScoring(): boolean {
    return !!this.state.batchScoring;
  }

  // Toast management
  showToast(message: string, type: Toast['type'] = 'info', duration: number = 4000): void {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const toast: Toast = { id, message, type, duration };

    this.state.toasts.push(toast);
    this.notify();

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(id);
      }, duration);
    }
  }

  removeToast(id: string): void {
    this.state.toasts = this.state.toasts.filter(t => t.id !== id);
    this.notify();
  }

  // Confirm dialog management
  showConfirm(
    title: string,
    message: string,
    options?: {
      confirmText?: string;
      cancelText?: string;
      type?: 'danger' | 'warning' | 'info';
    }
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const id = `confirm-${Date.now()}`;
      const dialog: ConfirmDialog = {
        id,
        title,
        message,
        confirmText: options?.confirmText,
        cancelText: options?.cancelText,
        type: options?.type,
        onConfirm: () => {
          this.state.confirmDialog = undefined;
          this.notify();
          resolve(true);
        },
        onCancel: () => {
          this.state.confirmDialog = undefined;
          this.notify();
          resolve(false);
        },
      };

      this.state.confirmDialog = dialog;
      this.notify();
    });
  }

  handleConfirmResponse(id: string, confirmed: boolean): void {
    if (this.state.confirmDialog && this.state.confirmDialog.id === id) {
      if (confirmed && this.state.confirmDialog.onConfirm) {
        this.state.confirmDialog.onConfirm();
      } else if (!confirmed && this.state.confirmDialog.onCancel) {
        this.state.confirmDialog.onCancel();
      }
    }
  }

  // Session Management Methods

  async createSession(
    name: string,
    createdBy: string,
    description?: string,
    aggregationMethod: 'mean' | 'median' | 'weighted' | 'trimmed' = 'mean'
  ): Promise<ScoringSession | null> {
    const session = await sessionStore.createSession(name, createdBy, description, aggregationMethod);
    if (session) {
      this.state.sessions.push(session);
      this.state.currentSession = session;
      this.notify();
      this.showToast('Session created successfully', 'success');
    }
    return session;
  }

  async loadSessionWithDetails(sessionId: string) {
    const sessionDetails = await sessionStore.loadSessionWithDetails(sessionId);
    if (sessionDetails) {
      // Update or add session to sessions list
      const index = this.state.sessions.findIndex(s => s.id === sessionId);
      if (index >= 0) {
        this.state.sessions[index] = sessionDetails;
      } else {
        this.state.sessions.push(sessionDetails);
      }
      this.state.currentSession = sessionDetails;
      this.notify();
    }
    return sessionDetails;
  }

  async addFeaturesToSession(sessionId: string, features: { name: string; description?: string }[]): Promise<SessionFeature[]> {
    const addedFeatures = await sessionStore.addFeaturesToSession(sessionId, features);
    if (addedFeatures.length > 0) {
      this.showToast(`${addedFeatures.length} features added to session`, 'success');
      // Reload session to get updated data
      await this.loadSessionWithDetails(sessionId);
    }
    return addedFeatures;
  }

  async saveSessionScore(
    sessionId: string,
    featureId: string,
    scoredBy: string,
    impact: number,
    confidence: number,
    effort: number,
    iceScore: number,
    justification?: string,
    responses?: any
  ): Promise<boolean> {
    const tier = getTierForScore(iceScore);
    const score = await sessionStore.saveSessionScore(
      sessionId,
      featureId,
      scoredBy,
      impact,
      confidence,
      effort,
      iceScore,
      tier,
      justification,
      responses
    );

    if (score) {
      this.showToast('Score saved to session', 'success');
      return true;
    } else {
      this.showToast('Failed to save score', 'error');
      return false;
    }
  }

  async hasUserScoredFeature(sessionId: string, featureId: string, scoredBy: string): Promise<boolean> {
    return await sessionStore.hasUserScoredFeature(sessionId, featureId, scoredBy);
  }

  async getUserScore(sessionId: string, featureId: string, scoredBy: string) {
    return await sessionStore.getUserScore(sessionId, featureId, scoredBy);
  }

  async getFeatureBreakdown(sessionId: string, featureId: string) {
    return await sessionStore.getFeatureBreakdown(sessionId, featureId);
  }

  async updateSessionStatus(sessionId: string, status: 'active' | 'completed' | 'archived'): Promise<boolean> {
    const success = await sessionStore.updateSessionStatus(sessionId, status);
    if (success) {
      const session = this.state.sessions.find(s => s.id === sessionId);
      if (session) {
        session.status = status;
        this.notify();
      }
      this.showToast(`Session marked as ${status}`, 'success');
    }
    return success;
  }

  async deleteSession(sessionId: string): Promise<boolean> {
    const confirmed = await this.showConfirm(
      'Delete Session',
      'Delete this scoring session? All scores and data will be permanently deleted.',
      { type: 'danger', confirmText: 'Delete', cancelText: 'Cancel' }
    );

    if (!confirmed) return false;

    const success = await sessionStore.deleteSession(sessionId);
    if (success) {
      this.state.sessions = this.state.sessions.filter(s => s.id !== sessionId);
      if (this.state.currentSession?.id === sessionId) {
        this.state.currentSession = undefined;
      }
      this.notify();
      this.showToast('Session deleted', 'success');
    }
    return success;
  }

  setCurrentSession(session: ScoringSession | undefined): void {
    this.state.currentSession = session;
    this.notify();
  }

  async refreshSessions(): Promise<void> {
    const sessions = await sessionStore.loadSessions();
    this.state.sessions = sessions;
    this.notify();
  }
}

export const appStore = new AppStore();
