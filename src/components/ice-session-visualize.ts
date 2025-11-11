import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import { SessionWithDetails, SessionFeature, SessionAggregate } from '../types';

@customElement('ice-session-visualize')
export class IceSessionVisualize extends LitElement {
  @state() private session?: SessionWithDetails;
  @state() private loading = true;

  static styles = css`
    :host {
      display: block;
      max-width: 1400px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 2rem;
      text-align: center;
    }

    .charts-grid {
      display: grid;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .chart-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 2rem;
    }

    .chart-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .bar-chart {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .bar-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .bar-label {
      min-width: 200px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .bar-container {
      flex: 1;
      height: 32px;
      background: #f3f4f6;
      border-radius: 0.375rem;
      overflow: hidden;
      position: relative;
    }

    .bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #2563eb);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 0.5rem;
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      transition: width 0.3s ease;
    }

    .bar-value {
      min-width: 60px;
      text-align: right;
      font-size: 0.875rem;
      font-weight: 600;
      color: #1f2937;
    }

    .scatter-plot {
      display: grid;
      gap: 0.75rem;
    }

    .scatter-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      background: #f9fafb;
      border-radius: 0.5rem;
      border-left: 4px solid;
    }

    .scatter-name {
      flex: 1;
      font-weight: 500;
      color: #1f2937;
    }

    .scatter-metrics {
      display: flex;
      gap: 1rem;
      font-size: 0.875rem;
    }

    .metric-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      background: #e0f2fe;
      color: #0c4a6e;
      font-weight: 600;
    }

    .variance-chart {
      display: grid;
      gap: 1rem;
    }

    .variance-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .variance-label {
      min-width: 200px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .variance-bar-container {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .variance-indicator {
      width: 100%;
      height: 8px;
      background: linear-gradient(90deg, #10b981, #f59e0b, #ef4444);
      border-radius: 4px;
      position: relative;
    }

    .variance-marker {
      position: absolute;
      width: 3px;
      height: 20px;
      background: #1f2937;
      top: -6px;
      transform: translateX(-50%);
    }

    .variance-value {
      min-width: 80px;
      text-align: right;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .tier-distribution {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
    }

    .tier-box {
      text-align: center;
      padding: 1.5rem 1rem;
      border-radius: 0.5rem;
      border: 2px solid;
    }

    .tier-count {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .tier-name {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
      text-align: center;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #6b7280;
      text-transform: uppercase;
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
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
    }

    .loading {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .bar-label {
        min-width: 120px;
        font-size: 0.75rem;
      }

      .scatter-metrics {
        flex-direction: column;
        gap: 0.5rem;
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
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading visualizations...</div>`;
    }

    if (!this.session || this.session.features.length === 0) {
      return html`
        <div class="loading">
          <h3>No Data to Visualize</h3>
          <p>Add features and scores to see visualizations</p>
          <button class="btn btn-secondary" @click=${this.handleBack}>Back to Session</button>
        </div>
      `;
    }

    return html`
      <h2>Session Results: ${this.session.name}</h2>

      ${this.renderStatsOverview()}

      <div class="charts-grid">
        ${this.renderIceScoreChart()}
        ${this.renderComponentsComparison()}
        ${this.renderVarianceChart()}
        ${this.renderTierDistribution()}
      </div>

      <div class="action-buttons">
        <button class="btn btn-secondary" @click=${this.handleBack}>
          Back to Session
        </button>
      </div>
    `;
  }

  private renderStatsOverview() {
    if (!this.session) return '';

    const totalFeatures = this.session.features.length;
    const totalScores = this.session.scores.length;
    const uniqueScorers = new Set(this.session.scores.map(s => s.scored_by)).size;
    const avgScorePerFeature = totalFeatures > 0 ? (totalScores / totalFeatures).toFixed(1) : '0';

    return html`
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${totalFeatures}</div>
          <div class="stat-label">Features</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${uniqueScorers}</div>
          <div class="stat-label">Team Members</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${totalScores}</div>
          <div class="stat-label">Total Scores</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${avgScorePerFeature}</div>
          <div class="stat-label">Avg Scores/Feature</div>
        </div>
      </div>
    `;
  }

  private renderIceScoreChart() {
    if (!this.session) return '';

    const featuresWithScores = this.session.features
      .map(feature => {
        const aggregate = this.session!.aggregates.find(a => a.feature_id === feature.id);
        return { feature, aggregate };
      })
      .filter(item => item.aggregate)
      .sort((a, b) => (b.aggregate?.avg_ice_score || 0) - (a.aggregate?.avg_ice_score || 0));

    const maxScore = Math.max(...featuresWithScores.map(item => item.aggregate?.avg_ice_score || 0), 1);

    return html`
      <div class="chart-card">
        <h3 class="chart-title">Average ICE Scores by Feature</h3>
        <div class="bar-chart">
          ${featuresWithScores.map(({ feature, aggregate }) => {
            const score = aggregate?.avg_ice_score || 0;
            const percentage = (score / maxScore) * 100;
            return html`
              <div class="bar-item">
                <div class="bar-label">${feature.name}</div>
                <div class="bar-container">
                  <div class="bar-fill" style="width: ${percentage}%">
                    ${score >= 100 ? score.toFixed(0) : ''}
                  </div>
                </div>
                <div class="bar-value">${score.toFixed(0)}</div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  private renderComponentsComparison() {
    if (!this.session) return '';

    const featuresWithScores = this.session.features
      .map(feature => {
        const aggregate = this.session!.aggregates.find(a => a.feature_id === feature.id);
        return { feature, aggregate };
      })
      .filter(item => item.aggregate);

    return html`
      <div class="chart-card">
        <h3 class="chart-title">Score Components Breakdown</h3>
        <div class="scatter-plot">
          ${featuresWithScores.map(({ feature, aggregate }) => {
            const tierColor = this.getTierColor(aggregate?.tier_name || '');
            return html`
              <div class="scatter-item" style="border-color: ${tierColor}">
                <div class="scatter-name">${feature.name}</div>
                <div class="scatter-metrics">
                  <div class="metric-badge">I: ${aggregate?.avg_impact.toFixed(1)}</div>
                  <div class="metric-badge">C: ${aggregate?.avg_confidence.toFixed(1)}</div>
                  <div class="metric-badge">E: ${aggregate?.avg_effort.toFixed(1)}</div>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  private renderVarianceChart() {
    if (!this.session) return '';

    const featuresWithVariance = this.session.features
      .map(feature => {
        const aggregate = this.session!.aggregates.find(a => a.feature_id === feature.id);
        return { feature, aggregate };
      })
      .filter(item => item.aggregate && item.aggregate.score_count > 1)
      .sort((a, b) => (b.aggregate?.ice_stddev || 0) - (a.aggregate?.ice_stddev || 0));

    if (featuresWithVariance.length === 0) {
      return html`
        <div class="chart-card">
          <h3 class="chart-title">Team Disagreement Analysis</h3>
          <p style="color: #6b7280; text-align: center; padding: 2rem;">
            Need at least 2 scores per feature to show disagreement metrics
          </p>
        </div>
      `;
    }

    const maxStdDev = Math.max(...featuresWithVariance.map(item => item.aggregate?.ice_stddev || 0), 1);

    return html`
      <div class="chart-card">
        <h3 class="chart-title">Team Disagreement Analysis (Standard Deviation)</h3>
        <div class="variance-chart">
          ${featuresWithVariance.map(({ feature, aggregate }) => {
            const stddev = aggregate?.ice_stddev || 0;
            const percentage = (stddev / maxStdDev) * 100;

            let label = 'Low';
            let color = '#10b981';
            if (stddev > 150) {
              label = 'High';
              color = '#ef4444';
            } else if (stddev > 75) {
              label = 'Medium';
              color = '#f59e0b';
            }

            return html`
              <div class="variance-item">
                <div class="variance-label">${feature.name}</div>
                <div class="variance-bar-container">
                  <div class="variance-indicator">
                    <div class="variance-marker" style="left: ${percentage}%"></div>
                  </div>
                  <div class="variance-value" style="color: ${color}">
                    ±${stddev.toFixed(0)} (${label})
                  </div>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  private renderTierDistribution() {
    if (!this.session) return '';

    const tierCounts: Record<string, number> = {
      'Low Priority': 0,
      'Medium Priority': 0,
      'Good Candidate': 0,
      'Strong Contender': 0,
      'Top Priority': 0,
    };

    this.session.aggregates.forEach(aggregate => {
      if (tierCounts.hasOwnProperty(aggregate.tier_name)) {
        tierCounts[aggregate.tier_name]++;
      }
    });

    const tierColors: Record<string, string> = {
      'Low Priority': '#9ca3af',
      'Medium Priority': '#f59e0b',
      'Good Candidate': '#3b82f6',
      'Strong Contender': '#8b5cf6',
      'Top Priority': '#ef4444',
    };

    return html`
      <div class="chart-card">
        <h3 class="chart-title">Priority Tier Distribution</h3>
        <div class="tier-distribution">
          ${Object.entries(tierCounts).map(([tier, count]) => html`
            <div class="tier-box" style="border-color: ${tierColors[tier]}; color: ${tierColors[tier]}">
              <div class="tier-count">${count}</div>
              <div class="tier-name">${tier}</div>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  private getTierColor(tierName: string): string {
    const colors: Record<string, string> = {
      'Low Priority': '#9ca3af',
      'Medium Priority': '#f59e0b',
      'Good Candidate': '#3b82f6',
      'Strong Contender': '#8b5cf6',
      'Top Priority': '#ef4444',
    };
    return colors[tierName] || '#9ca3af';
  }

  private handleBack() {
    appStore.setStep('session-dashboard');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-session-visualize': IceSessionVisualize;
  }
}
