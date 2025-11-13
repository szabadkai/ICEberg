import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import { SessionWithDetails, SessionFeature, SessionAggregate, SectionKey, SessionScore } from '../types';

type FeatureStatus = 'pending' | 'completed';

interface SessionFeatureRow {
  feature: SessionFeature;
  aggregate?: SessionAggregate;
  userScore?: SessionScore;
  status: FeatureStatus;
  isCurrent: boolean;
}

@customElement('ice-session-dashboard')
export class IceSessionDashboard extends LitElement {
  @state() private session?: SessionWithDetails;
  @state() private loading = true;
  @state() private scorerName = '';
  @state() private sectionPreferences = appStore.getState().sectionPreferences;
  @state() private currentSessionFeatureId?: string;
  private unsubscribe?: () => void;
  private preferenceKey?: string;

  static styles = css`
    :host {
      display: block;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .session-header {
      margin-bottom: 2rem;
    }

    .session-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-top: 1rem;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-active {
      background: #d1fae5;
      color: #065f46;
    }

    .scorer-input {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #eff6ff;
      border: 2px solid #bfdbfe;
      border-radius: 0.75rem;
    }

    .scorer-input label {
      display: block;
      font-weight: 600;
      color: #1e40af;
      margin-bottom: 0.5rem;
    }

    .scorer-input input {
      width: 100%;
      max-width: 400px;
      padding: 0.75rem;
      border: 2px solid #93c5fd;
      border-radius: 0.5rem;
      font-size: 1rem;
    }

    .scorer-input input:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .section-preferences {
      margin-top: 1rem;
      text-align: left;
    }

    .section-preferences h4 {
      margin: 0 0 0.25rem 0;
      font-size: 0.95rem;
      font-weight: 600;
      color: #1e40af;
    }

    .section-preferences p {
      margin: 0 0 0.75rem 0;
      color: #3b82f6;
      font-size: 0.85rem;
    }

    .section-toggle-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .section-toggle {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 0.75rem;
      border: 1px solid #93c5fd;
      border-radius: 0.5rem;
      background: white;
      font-size: 0.9rem;
      font-weight: 600;
      color: #1e3a8a;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
    }

    .section-toggle input {
      accent-color: #3b82f6;
    }

    .section-toggle[aria-checked='false'] {
      opacity: 0.6;
    }

    .progress-section {
      margin-bottom: 2rem;
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
      margin-bottom: 1.25rem;
    }

    .progress-header h3 {
      margin: 0;
      font-size: 1.35rem;
      color: #111827;
    }

    .progress-info {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      font-size: 0.95rem;
      color: #6b7280;
    }

    .progress-bar-container {
      background: #e5e7eb;
      height: 10px;
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: 1.5rem;
    }

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #2563eb);
      transition: width 0.3s ease;
    }

    .feature-list {
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      overflow: hidden;
    }

    .feature-item {
      display: flex;
      gap: 1rem;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #f3f4f6;
      align-items: center;
      transition: background 0.2s, border-left 0.2s;
    }

    .feature-item:last-child {
      border-bottom: none;
    }

    .feature-item.current {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
    }

    .feature-item.completed {
      background: #f0fdf4;
    }

    .feature-status {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .feature-content {
      flex: 1;
      min-width: 0;
    }

    .feature-name {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.25rem;
      word-break: break-word;
    }

    .feature-description {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .feature-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      font-size: 0.85rem;
      color: #6b7280;
    }

    .feature-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      background: #e0f2fe;
      color: #0c4a6e;
      font-weight: 600;
      font-size: 0.8rem;
    }

    .feature-actions {
      display: flex;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-secondary {
      background: white;
      color: #6b7280;
      border: 2px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #f9fafb;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 2rem;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    .loading {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .progress-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .feature-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .feature-actions {
        width: 100%;
        justify-content: flex-start;
      }

      .feature-actions .btn {
        flex: 1;
      }

      .action-buttons {
        flex-direction: column;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = appStore.subscribe((state) => {
      this.sectionPreferences = state.sectionPreferences;
      this.currentSessionFeatureId = state.currentSessionFeature?.id;
    });
    this.loadSession();
  }

  disconnectedCallback() {
    this.unsubscribe?.();
    super.disconnectedCallback();
  }

  private async loadSession() {
    const state = appStore.getState();
    if (!state.currentSession) {
      this.loading = false;
      return;
    }

    this.loading = true;
    const sessionDetails = await appStore.loadSessionWithDetails(state.currentSession.id);
    this.session = sessionDetails || undefined;
    this.preferenceKey = undefined;
    this.loading = false;

    // Pre-fill scorer name if we have one
    if (!this.scorerName && state.currentSession) {
      this.scorerName = state.currentSession.created_by;
      this.syncPreferencesFromStorage(true);
    }
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading session...</div>`;
    }

    if (!this.session) {
      return this.renderEmptyState();
    }

    return html`
      <div class="session-header">
        <h2>${this.session.name}</h2>
        <div class="session-meta">
          <div class="meta-item">
            <span class="status-badge status-active">${this.session.status}</span>
          </div>
          <div class="meta-item">
            <span>👤</span>
            <span>Created by ${this.session.created_by}</span>
          </div>
          <div class="meta-item">
            <span>📊</span>
            <span>${this.session.aggregation_method}</span>
          </div>
          <div class="meta-item">
            <span>📝</span>
            <span>${this.session.features.length} features</span>
          </div>
        </div>
        ${this.session.description
          ? html`<p style="color: #6b7280; margin-top: 1rem;">${this.session.description}</p>`
          : ''}
      </div>

      ${this.renderScorerInput()}

      ${this.renderFeatureQueue()}

      <div class="action-buttons">
        <button class="btn btn-secondary" @click=${this.handleAddFeatures}>
          Add More Features
        </button>
        <button class="btn btn-primary" @click=${this.handleInvite} style="background: #f59e0b;">
          Invite Others
        </button>
        <button class="btn btn-primary" @click=${this.handleVisualize} style="background: #ec4899;">
          Visualize Results
        </button>
        <button class="btn btn-primary" @click=${this.handleExport} style="background: #8b5cf6;">
          Export Results
        </button>
        ${this.session.status === 'active'
          ? html`
              <button class="btn btn-primary" @click=${this.handleCompleteSession} style="background: #10b981;">
                Complete Session
              </button>
            `
          : ''}
        ${this.session.status === 'completed'
          ? html`
              <button class="btn btn-secondary" @click=${this.handleArchiveSession}>
                Archive Session
              </button>
            `
          : ''}
        <button class="btn btn-secondary" @click=${this.handleBack}>
          Back to Sessions
        </button>
      </div>
    `;
  }

  private renderScorerInput() {
    return html`
      <div class="scorer-input">
        <label for="scorer-name">Your Name (for tracking your scores)</label>
        <input
          id="scorer-name"
          type="text"
          placeholder="Enter your name"
          .value=${this.scorerName}
          @input=${this.handleScorerInput}
        />

        <div class="section-preferences">
          <h4>Sections you'll score</h4>
          <p>Select which parts of the questionnaire you want to answer.</p>
          <div class="section-toggle-grid">
            ${this.renderSectionToggle('impact', 'Impact')}
            ${this.renderSectionToggle('confidence', 'Confidence')}
            ${this.renderSectionToggle('effort', 'Effort')}
          </div>
        </div>
      </div>
    `;
  }

  private renderSectionToggle(section: SectionKey, label: string) {
    const enabled = this.sectionPreferences[section];
    return html`
      <label class="section-toggle" aria-checked=${enabled ? 'true' : 'false'}>
        <input
          type="checkbox"
          .checked=${enabled}
          @change=${(event: Event) => this.handlePreferenceChange(section, event)}
        />
        ${label}
      </label>
    `;
  }

  private renderFeatureQueue() {
    if (!this.session || this.session.features.length === 0) {
      return this.renderNoFeatures();
    }

    const rows = this.getFeatureRows();
    if (rows.length === 0) {
      return this.renderNoFeatures();
    }

    const stats = this.getFeatureProgress(rows);

    return html`
      <div class="progress-section">
        <div class="progress-header">
          <h3>Team Scoring Queue</h3>
          <div class="progress-info">
            <span>${stats.completedByYou} scored by you</span>
            <span>${stats.pending} awaiting your score</span>
            <span>${stats.teamSubmissions} team submissions</span>
          </div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${stats.progress}%"></div>
        </div>

        <div class="feature-list">
          ${rows.map(row => this.renderFeatureRow(row))}
        </div>
      </div>
    `;
  }

  private renderFeatureRow(row: SessionFeatureRow) {
    const { feature, aggregate, status, isCurrent } = row;
    const scoreCount = aggregate?.score_count ?? 0;
    const isCompleted = status === 'completed';
    const actionLabel = isCompleted ? 'Update score' : 'Score feature';
    const avgIceLabel = aggregate?.avg_ice_score != null ? `${aggregate.avg_ice_score.toFixed(0)} avg ICE` : 'No team score yet';
    const spreadLabel = aggregate?.ice_stddev ? `±${Math.round(aggregate.ice_stddev)} spread` : undefined;

    const classes = ['feature-item'];
    if (isCurrent) classes.push('current');
    if (isCompleted) classes.push('completed');

    const statusIcon = isCompleted ? '✅' : isCurrent ? '👉' : '⏳';

    return html`
      <div class="${classes.join(' ')}">
        <div class="feature-status">${statusIcon}</div>
        <div class="feature-content">
          <div class="feature-name">${feature.name}</div>
          ${feature.description ? html`<div class="feature-description">${feature.description}</div>` : ''}
          <div class="feature-meta">
            <span class="feature-pill">👥 ${scoreCount} scores</span>
            <span>${avgIceLabel}</span>
            ${aggregate?.tier_name ? html`<span>Tier: ${aggregate.tier_name}</span>` : ''}
            ${spreadLabel ? html`<span>${spreadLabel}</span>` : ''}
          </div>
        </div>
        <div class="feature-actions">
          <button class="btn btn-primary" @click=${() => this.handleScoreFeature(feature)}>
            ${actionLabel}
          </button>
          ${scoreCount > 1
            ? html`
                <button class="btn btn-secondary" @click=${() => this.handleViewBreakdown(feature)}>
                  View breakdown
                </button>
              `
            : ''}
        </div>
      </div>
    `;
  }

  private getFeatureRows(): SessionFeatureRow[] {
    if (!this.session) return [];
    const scorer = this.scorerName.trim().toLowerCase();

    const rows: SessionFeatureRow[] = this.session.features.map(feature => {
      const aggregate = this.session!.aggregates.find(a => a.feature_id === feature.id);
      const userScore = scorer
        ? this.session!.scores.find(s => s.feature_id === feature.id && s.scored_by.trim().toLowerCase() === scorer)
        : undefined;
      const status: FeatureStatus = userScore ? 'completed' : 'pending';
      return {
        feature,
        aggregate,
        userScore,
        status,
        isCurrent: false,
      };
    });

    let highlightId = this.currentSessionFeatureId;
    if (!highlightId) {
      const firstPending = rows.find(row => row.status === 'pending');
      highlightId = firstPending?.feature.id;
    }

    return rows.map(row => ({
      ...row,
      isCurrent: highlightId ? row.feature.id === highlightId : false,
    }));
  }

  private getFeatureProgress(rows: SessionFeatureRow[]) {
    const total = rows.length;
    const completedByYou = rows.filter(row => row.status === 'completed').length;
    const pending = total - completedByYou;
    const teamSubmissions = this.session?.scores.length ?? 0;
    const progress = total > 0 ? Math.round((completedByYou / total) * 100) : 0;

    return {
      total,
      completedByYou,
      pending,
      progress,
      teamSubmissions,
    };
  }

  private handlePreferenceChange(section: SectionKey, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    appStore.setSectionPreference(section, checked);
    const state = appStore.getState();
    if (state.sectionPreferences[section] === checked) {
      this.persistPreferences();
    } else {
      // revert checkbox to actual value if store rejected change
      (event.target as HTMLInputElement).checked = state.sectionPreferences[section];
    }
  }

  private renderNoFeatures() {
    return html`
      <div class="empty-state">
        <h3>No Features Yet</h3>
        <p>Add features to this session to start collaborative scoring</p>
        <button class="btn btn-primary" @click=${this.handleAddFeatures} style="margin-top: 1rem;">
          Add Features via CSV
        </button>
      </div>
    `;
  }

  private renderEmptyState() {
    return html`
      <div class="empty-state">
        <h3>No Session Selected</h3>
        <p>Please select a session to view</p>
        <button class="btn btn-primary" @click=${this.handleBack}>
          View Sessions
        </button>
      </div>
    `;
  }

  private handleScoreFeature(feature: SessionFeature) {
    if (!this.scorerName.trim()) {
      appStore.showToast('Please enter your name first', 'warning');
      return;
    }

    if (!this.session) return;

    const preferences = appStore.getState().sectionPreferences;
    if (!Object.values(preferences).some(Boolean)) {
      appStore.showToast('Enable at least one section to score.', 'warning');
      return;
    }

    appStore.prepareFeatureForScoring(feature.name, this.scorerName.trim());
    appStore.setCurrentSessionFeature(feature);
    this.persistPreferences();
    appStore.startScoringFlow('impact');
  }

  private handleAddFeatures() {
    appStore.setStep('batch-upload');
  }

  private async handleInvite() {
    if (!this.session) return;

    const url = new URL(window.location.href);
    url.searchParams.set('sessionId', this.session.id);
    if (!url.hash || url.hash === '#landing') {
      url.hash = '#session-dashboard';
    }
    const shareUrl = url.toString();

    const copySupported = navigator?.clipboard && window.isSecureContext;

    if (copySupported) {
      try {
        await navigator.clipboard!.writeText(shareUrl);
        appStore.showToast('Session link copied to clipboard! Share it with your team.', 'success', 6000);
        return;
      } catch (error) {
        console.warn('Clipboard copy failed, falling back to dialog:', error);
      }
    }

    appStore.showConfirm(
      'Share Session',
      `Share this link with your team:\n\n${shareUrl}\n\nSession ID: ${this.session.id}`,
      { confirmText: 'Close', cancelText: '' }
    );
  }

  private handleVisualize() {
    appStore.setStep('session-visualize');
  }

  private handleExport() {
    appStore.setStep('session-export');
  }

  private handleViewBreakdown(feature: SessionFeature) {
    if (!this.session) return;

    // Store feature for breakdown view
    appStore.setCurrentSessionFeature(feature);

    // Navigate to breakdown
    appStore.setStep('feature-breakdown');
  }

  private async handleCompleteSession() {
    if (!this.session) return;

    const confirmed = await appStore.showConfirm(
      'Complete Session',
      'Mark this session as completed? You can still view and export results, but scoring will be finalized.',
      { type: 'info', confirmText: 'Complete', cancelText: 'Cancel' }
    );

    if (confirmed) {
      await appStore.updateSessionStatus(this.session.id, 'completed');
      await this.loadSession(); // Reload to show updated status
    }
  }

  private async handleArchiveSession() {
    if (!this.session) return;

    const confirmed = await appStore.showConfirm(
      'Archive Session',
      'Archive this session? It will be moved to archived sessions.',
      { type: 'warning', confirmText: 'Archive', cancelText: 'Cancel' }
    );

    if (confirmed) {
      await appStore.updateSessionStatus(this.session.id, 'archived');
      await this.loadSession(); // Reload to show updated status
    }
  }

  private handleBack() {
    appStore.setCurrentSession(undefined);
    appStore.setStep('session-list');
  }

  private handleScorerInput = (event: Event) => {
    this.scorerName = (event.target as HTMLInputElement).value;
    this.syncPreferencesFromStorage();
  };

  private syncPreferencesFromStorage(forceReset = false) {
    if (!this.session) return;
    const scorer = this.scorerName.trim();
    if (!scorer) {
      if (forceReset || this.preferenceKey) {
        appStore.resetSectionPreferences();
      }
      this.preferenceKey = undefined;
      return;
    }

    const key = `${this.session.id}:${scorer.toLowerCase()}`;
    if (this.preferenceKey === key && !forceReset) {
      return;
    }

    this.preferenceKey = key;
    appStore.loadSectionPreferencesFor(this.session.id, scorer);
  }

  private persistPreferences() {
    if (!this.session) return;
    const scorer = this.scorerName.trim();
    if (!scorer) return;
    appStore.saveSectionPreferencesFor(this.session.id, scorer);
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'ice-session-dashboard': IceSessionDashboard;
  }
}
