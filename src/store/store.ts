import { AppState, AppStep, ScoreResult, QuestionResponse, FeatureToScore, BatchScoring } from '../types';
import { getTierForScore } from '../data/tiers';

const STORAGE_KEY = 'ice-scorecard-data';
const MAX_SAVED_SCORES = 100;

export class AppStore {
  private state: AppState;
  private listeners: Set<(state: AppState) => void> = new Set();

  constructor() {
    this.state = this.loadState();
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

  saveCurrentScore(): void {
    if (this.state.currentScore) {
      if (this.state.savedScores.length >= MAX_SAVED_SCORES) {
        alert(`Maximum of ${MAX_SAVED_SCORES} scores reached. Please clear old scores.`);
        return;
      }

      // Generate a unique ID for the score
      const scoreWithId = {
        ...this.state.currentScore,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.state.savedScores.push(scoreWithId);
      this.saveState();
      this.notify();
    }
  }

  updateScore(id: string, updates: Partial<ScoreResult>): void {
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

    this.state.savedScores[index] = updatedScore;
    this.saveState();
    this.notify();
  }

  deleteScore(id: string): void {
    const index = this.state.savedScores.findIndex((score) => score.id === id);
    if (index !== -1) {
      this.state.savedScores.splice(index, 1);
      this.saveState();
      this.notify();
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  clearAllScores(): void {
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

  completeBatchFeature(): void {
    if (!this.state.batchScoring) return;

    const currentIndex = this.state.batchScoring.currentFeatureIndex;
    const currentFeature = this.state.batchScoring.features[currentIndex];
    if (!currentFeature) return;

    // Mark as completed
    currentFeature.status = 'completed';

    // Move to next feature
    const nextIndex = currentIndex + 1;
    if (nextIndex < this.state.batchScoring.features.length) {
      this.state.batchScoring.currentFeatureIndex = nextIndex;
      this.state.currentStep = 'batch-list';
    } else {
      // All features scored, go to export
      this.state.currentStep = 'batch-list';
    }

    this.notify();
  }

  cancelBatchScoring(): void {
    this.state.batchScoring = undefined;
    this.state.currentStep = 'landing';
    this.notify();
  }

  isBatchScoring(): boolean {
    return !!this.state.batchScoring;
  }
}

export const appStore = new AppStore();
