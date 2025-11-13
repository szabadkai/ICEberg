import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import { SessionAggregate, SessionFeature, SessionScore, SessionWithDetails } from '../types';

interface FeatureInsight {
  feature: SessionFeature;
  aggregate: SessionAggregate;
  scores: SessionScore[];
  stddev: number;
  minIce?: number;
  maxIce?: number;
}

interface InsightCallout {
  pill: string;
  tone: 'positive' | 'warning' | 'danger' | 'neutral';
  title: string;
  body: string;
  meta?: string;
}

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
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .chart-card.full-width {
      grid-column: 1 / -1;
    }

    .chart-card {
      background: var(--color-surface);
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

    .alignment-table {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .alignment-row {
      display: grid;
      grid-template-columns: minmax(180px, 1fr) minmax(140px, 2fr) auto auto;
      gap: 1rem;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .alignment-row:last-child {
      border-bottom: none;
    }

    .alignment-name {
      font-weight: 600;
      color: #111827;
    }

    .alignment-meter {
      width: 100%;
      height: 12px;
      background: #f3f4f6;
      border-radius: 999px;
      position: relative;
      overflow: hidden;
    }

    .alignment-fill {
      height: 100%;
      border-radius: 999px;
      transition: width 0.3s ease;
    }

    .alignment-state {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      letter-spacing: 0.02em;
    }

    .alignment-state.positive {
      background: #dcfce7;
      color: #166534;
    }

    .alignment-state.warning {
      background: #fef3c7;
      color: #92400e;
    }

    .alignment-state.danger {
      background: #fee2e2;
      color: #991b1b;
    }

    .alignment-state.neutral {
      background: #e5e7eb;
      color: #374151;
    }

    .alignment-meta {
      font-size: 0.85rem;
      color: #4b5563;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.15rem;
    }

    .alignment-meta span {
      white-space: nowrap;
    }

    .alignment-range {
      font-size: 0.75rem;
      color: #9ca3af;
    }

    .insights-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .insight-item {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 1rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e5e7eb;
      align-items: flex-start;
    }

    .insight-item:last-child {
      border-bottom: none;
    }

    .insight-pill {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      padding: 0.25rem 0.5rem;
      border-radius: 0.375rem;
      letter-spacing: 0.04em;
    }

    .insight-pill.positive {
      background: #dcfce7;
      color: #16a34a;
    }

    .insight-pill.warning {
      background: #fef3c7;
      color: #d97706;
    }

    .insight-pill.danger {
      background: #fee2e2;
      color: #dc2626;
    }

    .insight-pill.neutral {
      background: #e5e7eb;
      color: #4b5563;
    }

    .insight-title {
      font-weight: 600;
      color: #111827;
      margin-bottom: 0.15rem;
    }

    .insight-body {
      font-size: 0.9rem;
      color: #4b5563;
    }

    .insights-empty {
      padding: 0.5rem 0;
      color: #6b7280;
      font-size: 0.95rem;
    }

    .insight-meta {
      font-size: 0.8rem;
      color: #6b7280;
      text-align: right;
      white-space: nowrap;
    }

    .variance-chart {
      display: grid;
      gap: 1rem;
    }

    :host-context([data-theme='dark']) .chart-card,
    :host-context([data-theme='dark']) .stat-card,
    :host-context([data-theme='dark']) .tier-box,
    :host-context([data-theme='dark']) .insight-item,
    :host-context([data-theme='dark']) .alignment-row,
    :host-context([data-theme='dark']) .variance-item {
      background: var(--color-surface);
      border-color: var(--color-border);
      color: var(--color-text);
    }

    :host-context([data-theme='dark']) .insight-body,
    :host-context([data-theme='dark']) .insight-meta,
    :host-context([data-theme='dark']) .tier-name,
    :host-context([data-theme='dark']) .tier-count,
    :host-context([data-theme='dark']) .stat-label,
    :host-context([data-theme='dark']) .stat-value,
    :host-context([data-theme='dark']) .alignment-meta span,
    :host-context([data-theme='dark']) .variance-label,
    :host-context([data-theme='dark']) .variance-value {
      color: var(--color-text);
    }

    :host-context([data-theme='dark']) .insight-pill.neutral {
      background: #1f2937;
      color: #e2e8f0;
    }

    :host-context([data-theme='dark']) .alignment-meter {
      background: #0f172a;
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
      background: var(--color-surface);
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

      .alignment-row {
        grid-template-columns: 1fr;
      }

      .alignment-meta {
        align-items: flex-start;
      }

      .insight-item {
        grid-template-columns: 1fr;
      }

      .insight-meta {
        text-align: left;
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
        ${this.renderInsightCallouts()}
        ${this.renderAlignmentMatrix()}
        ${this.renderVarianceChart()}
        ${this.renderIceScoreChart()}
        ${this.renderComponentsComparison()}
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

  private renderInsightCallouts() {
    const insights = this.buildInsights();

    if (!this.session || this.session.features.length === 0) {
      return this.renderInsightsEmptyState('Add features to this session to surface team-wide patterns.');
    }

    if (!insights.length) {
      return this.renderInsightsEmptyState('Need more completed scores before we can highlight patterns.');
    }

    return html`
      <div class="chart-card full-width insights-card">
        <h3 class="chart-title">Patterns Worth a PM's Attention</h3>
        <div class="insights-list">
          ${insights.map(
            insight => html`
              <div class="insight-item">
                <span class="insight-pill ${insight.tone}">${insight.pill}</span>
                <div>
                  <div class="insight-title">${insight.title}</div>
                  <div class="insight-body">${insight.body}</div>
                </div>
                <div class="insight-meta">${insight.meta ?? ''}</div>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  private renderInsightsEmptyState(message: string) {
    return html`
      <div class="chart-card full-width insights-card">
        <h3 class="chart-title">Patterns Worth a PM's Attention</h3>
        <p class="insights-empty">${message}</p>
      </div>
    `;
  }

  private renderAlignmentMatrix() {
    const featureInsights = this.getFeatureInsights();
    if (!featureInsights.length) {
      return html`
        <div class="chart-card full-width">
          <h3 class="chart-title">Alignment Radar</h3>
          <p class="insights-empty">Add at least two scores per feature to compare alignment.</p>
        </div>
      `;
    }

    const sorted = featureInsights
      .slice()
      .sort((a, b) => (b.stddev || 0) - (a.stddev || 0));
    const maxStdDev = Math.max(...sorted.map(item => item.stddev || 0), 1);

    return html`
      <div class="chart-card full-width">
        <h3 class="chart-title">Alignment Radar</h3>
        <div class="alignment-table">
          ${sorted.map(item => {
            const consensus = this.getConsensusMeta(item.stddev, item.aggregate, item.aggregate.score_count);
            const width = Math.max(6, (item.stddev / maxStdDev) * 100);
            return html`
              <div class="alignment-row">
                <div class="alignment-name">${item.feature.name}</div>
                <div class="alignment-meter">
                  <div
                    class="alignment-fill"
                    style="width: ${item.aggregate.score_count < 2 ? 8 : width}%; background: ${consensus.color};"
                  ></div>
                </div>
                <span class="alignment-state ${consensus.tone}">${consensus.label}</span>
                <div class="alignment-meta">
                  <span>Avg ICE: ${this.formatAggregateValue(item.aggregate.avg_ice_score, 0)}</span>
                  <span>±${item.stddev.toFixed(0)} · ${item.aggregate.score_count} scores</span>
                  ${item.minIce !== undefined && item.maxIce !== undefined
                    ? html`<span class="alignment-range">${item.minIce.toFixed(0)} – ${item.maxIce.toFixed(0)}</span>`
                    : ''}
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  private renderIceScoreChart() {
    const featureInsights = this.getFeatureInsights().sort(
      (a, b) => (b.aggregate.avg_ice_score || 0) - (a.aggregate.avg_ice_score || 0)
    );

    if (!featureInsights.length) return '';

    const maxScore = Math.max(...featureInsights.map(item => item.aggregate.avg_ice_score || 0), 1);

    return html`
      <div class="chart-card">
        <h3 class="chart-title">Average ICE Scores by Feature</h3>
        <div class="bar-chart">
          ${featureInsights.map(({ feature, aggregate }) => {
            const score = aggregate.avg_ice_score || 0;
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
    const featureInsights = this.getFeatureInsights();
    if (!featureInsights.length) return '';

    return html`
      <div class="chart-card">
        <h3 class="chart-title">Score Components Breakdown</h3>
        <div class="scatter-plot">
          ${featureInsights.map(({ feature, aggregate }) => {
            const tierColor = this.getTierColor(aggregate.tier_name || '');
            return html`
              <div class="scatter-item" style="border-color: ${tierColor}">
                <div class="scatter-name">${feature.name}</div>
                <div class="scatter-metrics">
                  <div class="metric-badge">I: ${this.formatAggregateValue(aggregate.avg_impact)}</div>
                  <div class="metric-badge">C: ${this.formatAggregateValue(aggregate.avg_confidence)}</div>
                  <div class="metric-badge">E: ${this.formatAggregateValue(aggregate.avg_effort)}</div>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  private renderVarianceChart() {
    const featuresWithVariance = this.getFeatureInsights()
      .filter(item => item.aggregate.score_count > 1)
      .sort((a, b) => (b.stddev || 0) - (a.stddev || 0));

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

    const maxStdDev = Math.max(...featuresWithVariance.map(item => item.stddev || 0), 1);

    return html`
      <div class="chart-card">
        <h3 class="chart-title">Team Disagreement Analysis (Standard Deviation)</h3>
        <div class="variance-chart">
          ${featuresWithVariance.map(({ feature, stddev }) => {
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

  private getFeatureInsights(): FeatureInsight[] {
    if (!this.session) return [];

    return this.session.features.reduce<FeatureInsight[]>((acc, feature) => {
      const aggregate = this.session!.aggregates.find(a => a.feature_id === feature.id);
      if (!aggregate) {
        return acc;
      }

      const scores = this.session!.scores.filter(score => score.feature_id === feature.id);
      const iceValues = scores
        .map(score => score.ice_score)
        .filter((value): value is number => typeof value === 'number');

      acc.push({
        feature,
        aggregate,
        scores,
        stddev: aggregate.ice_stddev || 0,
        minIce: iceValues.length ? Math.min(...iceValues) : undefined,
        maxIce: iceValues.length ? Math.max(...iceValues) : undefined,
      });

      return acc;
    }, []);
  }

  private getConsensusMeta(stddev: number, aggregate?: SessionAggregate, scoreCount = 0) {
    if (scoreCount < 2 || stddev === 0) {
      return { label: 'Need more data', tone: 'neutral', color: '#9ca3af' } as const;
    }

    const avg = aggregate?.avg_ice_score || 0;
    const relative = avg > 0 ? (stddev / avg) * 100 : 0;

    if ((avg > 0 && relative <= 18) || stddev <= 60) {
      return { label: 'In Unison', tone: 'positive', color: '#10b981' } as const;
    }

    if ((avg > 0 && relative <= 35) || stddev <= 120) {
      return { label: 'Split View', tone: 'warning', color: '#f59e0b' } as const;
    }

    return { label: 'In Conflict', tone: 'danger', color: '#ef4444' } as const;
  }

  private buildInsights(): InsightCallout[] {
    if (!this.session) return [];

    const featureInsights = this.getFeatureInsights();
    if (!featureInsights.length) return [];

    const insights: InsightCallout[] = [];
    const contested = featureInsights
      .filter(item => item.aggregate.score_count > 1)
      .sort((a, b) => (b.stddev || 0) - (a.stddev || 0));

    const highConflict = contested.find(item => item.stddev > 80);
    if (highConflict) {
      insights.push({
        pill: 'High conflict',
        tone: 'danger',
        title: highConflict.feature.name,
        body: `Scores swing ±${highConflict.stddev.toFixed(0)} (range ${this.formatIceRange(
          highConflict.minIce,
          highConflict.maxIce
        )}) despite an average of ${this.formatAggregateValue(highConflict.aggregate.avg_ice_score, 0)}. Facilitate a sync before committing.`,
        meta: `${highConflict.aggregate.score_count} scorers`,
      });
    }

    const aligned = contested
      .filter(item => item.stddev <= 50)
      .sort((a, b) => (b.aggregate.avg_ice_score || 0) - (a.aggregate.avg_ice_score || 0));
    if (aligned.length) {
      const alignedFeature = aligned[0];
      insights.push({
        pill: 'In unison',
        tone: 'positive',
        title: alignedFeature.feature.name,
        body: `Team agrees (±${alignedFeature.stddev.toFixed(0)}) it's a ${alignedFeature.aggregate.tier_name ||
          'top pick'} at ${this.formatAggregateValue(alignedFeature.aggregate.avg_ice_score, 0)} pts. Consider fast-tracking.`,
        meta: alignedFeature.aggregate.tier_name || '',
      });
    }

    const uniqueScorers = this.getUniqueScorerCount();
    const coverageGap = featureInsights
      .filter(item => uniqueScorers > 0 && item.aggregate.score_count < uniqueScorers)
      .sort((a, b) => (a.aggregate.score_count ?? 0) - (b.aggregate.score_count ?? 0))[0];
    if (coverageGap) {
      const missing = Math.max(0, uniqueScorers - (coverageGap.aggregate.score_count || 0));
      insights.push({
        pill: 'Coverage gap',
        tone: 'warning',
        title: coverageGap.feature.name,
        body: `${missing} teammate${missing === 1 ? '' : 's'} still need to weigh in. Current view leans on ${
          coverageGap.aggregate.score_count
        } input${coverageGap.aggregate.score_count === 1 ? '' : 's'}.`,
        meta: `${coverageGap.aggregate.score_count}/${uniqueScorers} scorers`,
      });
    }

    if (insights.length < 3) {
      const lopsided = featureInsights
        .filter(item => {
          const impact = item.aggregate.avg_impact ?? 0;
          const effort = item.aggregate.avg_effort ?? 0;
          return Math.abs(impact - effort) >= 3;
        })
        .sort((a, b) => {
          const diffB = Math.abs((b.aggregate.avg_impact ?? 0) - (b.aggregate.avg_effort ?? 0));
          const diffA = Math.abs((a.aggregate.avg_impact ?? 0) - (a.aggregate.avg_effort ?? 0));
          return diffB - diffA;
        });

    if (lopsided.length) {
      const feature = lopsided[0];
      const impact = this.formatAggregateValue(feature.aggregate.avg_impact);
      const effort = this.formatAggregateValue(feature.aggregate.avg_effort);
      const leaning = (feature.aggregate.avg_impact ?? 0) > (feature.aggregate.avg_effort ?? 0)
        ? 'quick-win candidate (impact outsizes effort)'
        : 'heavy lift compared to the value scored';
      insights.push({
        pill: 'Pattern',
        tone: 'neutral',
        title: feature.feature.name,
        body: `Impact ${impact} vs effort ${effort} makes this a ${leaning}. Double-check assumptions before handoff.`,
        meta: `I ${impact} / E ${effort}`,
      });
    }
  }

    if (!insights.length && featureInsights.length) {
      const lowestSpread = featureInsights
        .filter(item => item.aggregate.score_count > 0)
        .sort((a, b) => (a.stddev || 0) - (b.stddev || 0))[0];

      if (lowestSpread) {
        insights.push({
          pill: 'Aligned',
          tone: 'positive',
          title: `Team aligned on ${lowestSpread.feature.name}`,
          body: `Everyone lands within ±${Math.round(lowestSpread.stddev || 0)} of the average. Consider moving this forward while consensus is high.`,
          meta: `${lowestSpread.aggregate.score_count} scorers`,
        });
      }
    }

    return insights.slice(0, 4);
  }

  private getUniqueScorerCount() {
    if (!this.session) return 0;
    return new Set(this.session.scores.map(score => score.scored_by)).size;
  }

  private formatIceRange(min?: number, max?: number) {
    if (min === undefined || max === undefined) return 'n/a';
    return `${min.toFixed(0)} – ${max.toFixed(0)}`;
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

  private formatAggregateValue(value?: number | null, digits = 1) {
    return typeof value === 'number' ? value.toFixed(digits) : '—';
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
