import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import { SessionWithDetails, SessionFeature, SessionAggregate } from '../types';

@customElement('ice-session-dashboard')
export class IceSessionDashboard extends LitElement {
  @state() private session?: SessionWithDetails;
  @state() private loading = true;
  @state() private scorerName = '';

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

    .features-grid {
      display: grid;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .feature-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.2s;
      cursor: pointer;
    }

    .feature-card:hover {
      border-color: #3b82f6;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .feature-card.scored {
      background: #f0fdf4;
      border-color: #86efac;
    }

    .feature-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .feature-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }

    .feature-description {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .consensus-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
    }

    .consensus-item {
      text-align: center;
    }

    .consensus-label {
      font-size: 0.75rem;
      color: #6b7280;
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }

    .consensus-value {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
    }

    .consensus-stddev {
      font-size: 0.75rem;
      color: #9ca3af;
    }

    .score-count {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.75rem;
      background: #e0f2fe;
      color: #0c4a6e;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
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
      .consensus-info {
        grid-template-columns: repeat(2, 1fr);
      }

      .action-buttons {
        flex-direction: column;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadSession();
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
    this.loading = false;

    // Pre-fill scorer name if we have one
    if (!this.scorerName && state.currentSession) {
      this.scorerName = state.currentSession.created_by;
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

      ${this.session.features.length === 0
        ? this.renderNoFeatures()
        : html`
            <h3 style="font-size: 1.25rem; font-weight: 600; color: #374151; margin-bottom: 1rem;">
              Features to Score
            </h3>
            <div class="features-grid">
              ${this.session.features.map(feature => this.renderFeatureCard(feature))}
            </div>
          `}

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
          @input=${(e: Event) => (this.scorerName = (e.target as HTMLInputElement).value)}
        />
      </div>
    `;
  }

  private renderFeatureCard(feature: SessionFeature) {
    if (!this.session) return '';

    // Find aggregate for this feature
    const aggregate = this.session.aggregates.find(a => a.feature_id === feature.id);

    // Check if current user has scored this feature
    const userScore = this.session.scores.find(
      s => s.feature_id === feature.id && s.scored_by === this.scorerName
    );

    const hasScored = !!userScore;
    const hasMultipleScores = aggregate && aggregate.score_count > 1;

    return html`
      <div
        class="feature-card ${hasScored ? 'scored' : ''}"
        @click=${() => this.handleScoreFeature(feature)}
      >
        <div class="feature-header">
          <h4 class="feature-title">${feature.name}</h4>
          ${aggregate ? html`<span class="score-count">👥 ${aggregate.score_count}</span>` : ''}
        </div>

        ${feature.description
          ? html`<p class="feature-description">${feature.description}</p>`
          : ''}

        ${aggregate ? this.renderConsensusInfo(aggregate) : this.renderNoScores()}

        <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
          ${hasScored
            ? html`<div style="color: #059669; font-size: 0.875rem; font-weight: 600;">
                ✓ You've scored this feature
              </div>`
            : html`<div style="color: #3b82f6; font-size: 0.875rem; font-weight: 600;">
                Click to score →
              </div>`}

          ${hasMultipleScores
            ? html`
                <button
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    this.handleViewBreakdown(feature);
                  }}
                  style="
                    padding: 0.5rem 1rem;
                    background: white;
                    color: #3b82f6;
                    border: 2px solid #3b82f6;
                    border-radius: 0.375rem;
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                  "
                >
                  View Breakdown
                </button>
              `
            : ''}
        </div>
      </div>
    `;
  }

  private renderConsensusInfo(aggregate: SessionAggregate) {
    return html`
      <div class="consensus-info">
        <div class="consensus-item">
          <div class="consensus-label">Impact</div>
          <div class="consensus-value">${aggregate.avg_impact.toFixed(1)}</div>
          ${aggregate.impact_stddev
            ? html`<div class="consensus-stddev">±${aggregate.impact_stddev.toFixed(1)}</div>`
            : ''}
        </div>
        <div class="consensus-item">
          <div class="consensus-label">Confidence</div>
          <div class="consensus-value">${aggregate.avg_confidence.toFixed(1)}</div>
          ${aggregate.confidence_stddev
            ? html`<div class="consensus-stddev">±${aggregate.confidence_stddev.toFixed(1)}</div>`
            : ''}
        </div>
        <div class="consensus-item">
          <div class="consensus-label">Effort</div>
          <div class="consensus-value">${aggregate.avg_effort.toFixed(1)}</div>
          ${aggregate.effort_stddev
            ? html`<div class="consensus-stddev">±${aggregate.effort_stddev.toFixed(1)}</div>`
            : ''}
        </div>
        <div class="consensus-item">
          <div class="consensus-label">ICE Score</div>
          <div class="consensus-value">${aggregate.avg_ice_score.toFixed(0)}</div>
          ${aggregate.ice_stddev
            ? html`<div class="consensus-stddev">±${aggregate.ice_stddev.toFixed(0)}</div>`
            : ''}
        </div>
      </div>
    `;
  }

  private renderNoScores() {
    return html`
      <div style="color: #9ca3af; font-size: 0.875rem; font-style: italic; padding: 1rem 0;">
        No scores yet. Be the first to score this feature!
      </div>
    `;
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

    // Store scorer name and start scoring this feature
    appStore.setFeatureInfo(feature.name, this.scorerName.trim());

    // Store feature context for session scoring
    appStore.getState().currentSessionFeature = feature;

    // Navigate to scoring flow
    appStore.setStep('impact-intro');
  }

  private handleAddFeatures() {
    appStore.setStep('batch-upload');
  }

  private handleInvite() {
    if (!this.session) return;

    // Create shareable URL with session ID
    const shareUrl = `${window.location.origin}${window.location.pathname}?sessionId=${this.session.id}`;

    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      appStore.showToast('Session link copied to clipboard! Share it with your team.', 'success', 6000);
    }).catch(() => {
      // Fallback: show the URL in a prompt
      appStore.showConfirm(
        'Share Session',
        `Share this link with your team:\n\n${shareUrl}\n\nSession ID: ${this.session!.id}`,
        { confirmText: 'OK', cancelText: '' }
      );
    });
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
    appStore.getState().currentSessionFeature = feature;

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
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-session-dashboard': IceSessionDashboard;
  }
}
