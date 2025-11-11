import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import { FeatureScoreBreakdown, SessionScore } from '../types';

@customElement('ice-feature-breakdown')
export class IceFeatureBreakdown extends LitElement {
  @state() private breakdown?: FeatureScoreBreakdown;
  @state() private loading = true;
  @state() private sessionId = '';
  @state() private featureId = '';

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

    .feature-header {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 2px solid #e5e7eb;
    }

    .feature-description {
      color: #6b7280;
      margin-top: 0.5rem;
      font-size: 1rem;
    }

    .consensus-section {
      background: #eff6ff;
      border: 2px solid #bfdbfe;
      border-radius: 0.75rem;
      padding: 2rem;
      margin-bottom: 2rem;
    }

    .consensus-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e40af;
      margin-bottom: 1.5rem;
    }

    .consensus-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1.5rem;
    }

    .consensus-item {
      text-align: center;
    }

    .consensus-label {
      font-size: 0.75rem;
      color: #1e40af;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .consensus-value {
      font-size: 2rem;
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 0.25rem;
    }

    .consensus-stddev {
      font-size: 0.875rem;
      color: #3b82f6;
    }

    .consensus-range {
      font-size: 0.75rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }

    .scores-section {
      margin-bottom: 2rem;
    }

    .scores-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 1rem;
    }

    .score-count {
      color: #6b7280;
      font-size: 0.875rem;
      margin-left: 0.5rem;
    }

    .scores-grid {
      display: grid;
      gap: 1rem;
    }

    .score-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.2s;
    }

    .score-card:hover {
      border-color: #3b82f6;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .score-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .scorer-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
    }

    .score-date {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .score-metrics {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .metric-item {
      text-align: center;
      padding: 0.75rem;
      background: #f9fafb;
      border-radius: 0.5rem;
    }

    .metric-label {
      font-size: 0.75rem;
      color: #6b7280;
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }

    .metric-value {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
    }

    .ice-score-highlight {
      background: #3b82f6;
      color: white;
    }

    .score-tier {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .justification {
      background: #f9fafb;
      padding: 1rem;
      border-radius: 0.5rem;
      border-left: 4px solid #3b82f6;
    }

    .justification-label {
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .justification-text {
      color: #6b7280;
      line-height: 1.6;
      font-size: 0.875rem;
    }

    .variance-analysis {
      background: #fef3c7;
      border: 2px solid #fde68a;
      border-radius: 0.75rem;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }

    .variance-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #92400e;
      margin-bottom: 1rem;
    }

    .variance-high {
      background: #fef2f2;
      border-color: #fecaca;
    }

    .variance-high .variance-title {
      color: #991b1b;
    }

    .variance-low {
      background: #f0fdf4;
      border-color: #bbf7d0;
    }

    .variance-low .variance-title {
      color: #166534;
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
      margin-top: 2rem;
    }

    .loading,
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .consensus-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .score-metrics {
        grid-template-columns: repeat(2, 1fr);
      }

      .action-buttons {
        flex-direction: column;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadBreakdown();
  }

  private async loadBreakdown() {
    const state = appStore.getState();

    // Get sessionId and featureId from URL hash or state
    const urlHash = window.location.hash;
    const match = urlHash.match(/feature-breakdown\/([^/]+)\/([^/]+)/);

    if (match) {
      this.sessionId = match[1];
      this.featureId = match[2];
    } else if (state.currentSession && state.currentSessionFeature) {
      this.sessionId = state.currentSession.id;
      this.featureId = state.currentSessionFeature.id;
    }

    if (!this.sessionId || !this.featureId) {
      this.loading = false;
      return;
    }

    this.loading = true;
    const breakdown = await appStore.getFeatureBreakdown(this.sessionId, this.featureId);
    this.breakdown = breakdown || undefined;
    this.loading = false;
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading feature breakdown...</div>`;
    }

    if (!this.breakdown) {
      return this.renderEmptyState();
    }

    return html`
      <div class="feature-header">
        <h2>${this.breakdown.feature.name}</h2>
        ${this.breakdown.feature.description
          ? html`<p class="feature-description">${this.breakdown.feature.description}</p>`
          : ''}
      </div>

      ${this.renderConsensusSection()}
      ${this.renderVarianceAnalysis()}
      ${this.renderIndividualScores()}

      <div class="action-buttons">
        <button class="btn btn-secondary" @click=${this.handleBack}>
          Back to Session
        </button>
      </div>
    `;
  }

  private renderConsensusSection() {
    if (!this.breakdown) return '';

    const agg = this.breakdown.aggregate;

    return html`
      <div class="consensus-section">
        <h3 class="consensus-title">
          Team Consensus (${agg.score_count} ${agg.score_count === 1 ? 'score' : 'scores'})
        </h3>
        <div class="consensus-grid">
          <div class="consensus-item">
            <div class="consensus-label">Impact</div>
            <div class="consensus-value">${agg.avg_impact.toFixed(1)}</div>
            ${agg.impact_stddev
              ? html`
                  <div class="consensus-stddev">±${agg.impact_stddev.toFixed(1)}</div>
                  ${this.renderRange(this.breakdown.individualScores, 'impact')}
                `
              : ''}
          </div>
          <div class="consensus-item">
            <div class="consensus-label">Confidence</div>
            <div class="consensus-value">${agg.avg_confidence.toFixed(1)}</div>
            ${agg.confidence_stddev
              ? html`
                  <div class="consensus-stddev">±${agg.confidence_stddev.toFixed(1)}</div>
                  ${this.renderRange(this.breakdown.individualScores, 'confidence')}
                `
              : ''}
          </div>
          <div class="consensus-item">
            <div class="consensus-label">Effort</div>
            <div class="consensus-value">${agg.avg_effort.toFixed(1)}</div>
            ${agg.effort_stddev
              ? html`
                  <div class="consensus-stddev">±${agg.effort_stddev.toFixed(1)}</div>
                  ${this.renderRange(this.breakdown.individualScores, 'effort')}
                `
              : ''}
          </div>
          <div class="consensus-item">
            <div class="consensus-label">ICE Score</div>
            <div class="consensus-value">${agg.avg_ice_score.toFixed(0)}</div>
            ${agg.ice_stddev
              ? html`
                  <div class="consensus-stddev">±${agg.ice_stddev.toFixed(0)}</div>
                  ${this.renderRange(this.breakdown.individualScores, 'ice_score')}
                `
              : ''}
          </div>
        </div>
      </div>
    `;
  }

  private renderRange(scores: SessionScore[], metric: 'impact' | 'confidence' | 'effort' | 'ice_score') {
    if (scores.length === 0) return '';

    const values = scores.map(s => s[metric]);
    const min = Math.min(...values);
    const max = Math.max(...values);

    return html`
      <div class="consensus-range">
        Range: ${min.toFixed(metric === 'ice_score' ? 0 : 1)} - ${max.toFixed(metric === 'ice_score' ? 0 : 1)}
      </div>
    `;
  }

  private renderVarianceAnalysis() {
    if (!this.breakdown) return '';

    const agg = this.breakdown.aggregate;

    // Only show if we have enough scores
    if (agg.score_count < 2) return '';

    // Calculate average stddev across all metrics (normalized)
    const impactVariance = (agg.impact_stddev || 0) / 10; // normalize to 0-1
    const confidenceVariance = (agg.confidence_stddev || 0) / 10;
    const effortVariance = (agg.effort_stddev || 0) / 10;
    const avgVariance = (impactVariance + confidenceVariance + effortVariance) / 3;

    let varianceClass = '';
    let varianceIcon = '';
    let varianceMessage = '';

    if (avgVariance > 0.25) {
      varianceClass = 'variance-high';
      varianceIcon = '⚠️';
      varianceMessage = 'High Disagreement: Team members have significantly different opinions on this feature. Consider discussing to align understanding.';
    } else if (avgVariance > 0.15) {
      varianceClass = '';
      varianceIcon = '⚡';
      varianceMessage = 'Moderate Disagreement: Some variation in scores. This is normal, but worth reviewing if critical.';
    } else {
      varianceClass = 'variance-low';
      varianceIcon = '✓';
      varianceMessage = 'Strong Consensus: Team members largely agree on the scoring for this feature.';
    }

    return html`
      <div class="variance-analysis ${varianceClass}">
        <h3 class="variance-title">${varianceIcon} ${varianceMessage.split(':')[0]}</h3>
        <p style="margin: 0; color: inherit; opacity: 0.9;">
          ${varianceMessage.split(':')[1]}
        </p>
      </div>
    `;
  }

  private renderIndividualScores() {
    if (!this.breakdown) return '';

    const scores = this.breakdown.individualScores;

    if (scores.length === 0) {
      return html`
        <div class="empty-state">
          <h3>No Scores Yet</h3>
          <p>No one has scored this feature yet</p>
        </div>
      `;
    }

    // Sort by date (newest first)
    const sortedScores = [...scores].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return html`
      <div class="scores-section">
        <h3 class="scores-title">
          Individual Scores
          <span class="score-count">(${scores.length} total)</span>
        </h3>
        <div class="scores-grid">
          ${sortedScores.map(score => this.renderScoreCard(score))}
        </div>
      </div>
    `;
  }

  private renderScoreCard(score: SessionScore) {
    const date = new Date(score.created_at);
    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

    return html`
      <div class="score-card">
        <div class="score-header">
          <div class="scorer-name">👤 ${score.scored_by}</div>
          <div class="score-date">${formattedDate}</div>
        </div>

        <div class="score-metrics">
          <div class="metric-item">
            <div class="metric-label">Impact</div>
            <div class="metric-value">${score.impact.toFixed(1)}</div>
          </div>
          <div class="metric-item">
            <div class="metric-label">Confidence</div>
            <div class="metric-value">${score.confidence.toFixed(1)}</div>
          </div>
          <div class="metric-item">
            <div class="metric-label">Effort</div>
            <div class="metric-value">${score.effort.toFixed(1)}</div>
          </div>
          <div class="metric-item ice-score-highlight">
            <div class="metric-label">ICE Score</div>
            <div class="metric-value">${score.ice_score.toFixed(0)}</div>
          </div>
        </div>

        <div class="score-tier" style="background-color: ${this.getTierColor(score.tier_name)};">
          ${score.tier_name}
        </div>

        ${score.justification
          ? html`
              <div class="justification">
                <div class="justification-label">Justification:</div>
                <div class="justification-text">${score.justification}</div>
              </div>
            `
          : ''}
      </div>
    `;
  }

  private getTierColor(tierName: string): string {
    const colors: Record<string, string> = {
      'Low Priority': '#f3f4f6',
      'Medium Priority': '#fef3c7',
      'Good Candidate': '#dbeafe',
      'Strong Contender': '#e9d5ff',
      'Top Priority': '#fee2e2',
    };
    return colors[tierName] || '#f3f4f6';
  }

  private renderEmptyState() {
    return html`
      <div class="empty-state">
        <h3>Feature Not Found</h3>
        <p>Could not load feature breakdown</p>
        <button class="btn btn-secondary" @click=${this.handleBack}>
          Back to Session
        </button>
      </div>
    `;
  }

  private handleBack() {
    appStore.setStep('session-dashboard');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-feature-breakdown': IceFeatureBreakdown;
  }
}
