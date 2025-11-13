import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import { SessionWithDetails } from '../types';

@customElement('ice-session-export')
export class IceSessionExport extends LitElement {
  @state() private session?: SessionWithDetails;
  @state() private loading = true;

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
      margin-bottom: 2rem;
      text-align: center;
    }

    .export-options {
      display: grid;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .export-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 2rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .export-card:hover {
      border-color: #3b82f6;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .export-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .export-description {
      color: #6b7280;
      margin-bottom: 1rem;
    }

    .export-includes {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 1rem;
    }

    .export-includes ul {
      margin: 0.5rem 0 0 0;
      padding-left: 1.5rem;
    }

    .export-includes li {
      margin-bottom: 0.25rem;
    }

    .btn {
      padding: 0.875rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      width: 100%;
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
      margin-top: 2rem;
    }

    .loading {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    @media (max-width: 768px) {
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
      return html`<div class="loading">Loading session...</div>`;
    }

    if (!this.session) {
      return html`<div class="loading">No session selected</div>`;
    }

    return html`
      <h2>Export Session: ${this.session.name}</h2>

      <div class="export-options">
        ${this.renderExportCard(
          'Consensus Summary',
          'Export aggregated team consensus scores with variance metrics',
          ['Feature names and descriptions', 'Average scores (Impact, Confidence, Effort, ICE)', 'Standard deviations', 'Score counts per feature', 'Tier assignments'],
          () => this.exportConsensus()
        )}

        ${this.renderExportCard(
          'Individual Scores',
          'Export all individual team member scores for detailed analysis',
          ['All scorer names', 'Individual scores for each feature', 'Timestamps', 'Justifications', 'Per-user tier assignments'],
          () => this.exportIndividual()
        )}

        ${this.renderExportCard(
          'Complete Report',
          'Export everything: consensus, individual scores, and variance analysis',
          ['All consensus data', 'All individual scores', 'Disagreement metrics', 'Complete feature breakdown', 'Session metadata'],
          () => this.exportComplete()
        )}
      </div>

      <div class="action-buttons">
        <button class="btn btn-secondary" @click=${this.handleBack}>
          Back to Session
        </button>
      </div>
    `;
  }

  private renderExportCard(
    title: string,
    description: string,
    includes: string[],
    onClick: () => void
  ) {
    return html`
      <div class="export-card" @click=${onClick}>
        <div class="export-title">${title}</div>
        <div class="export-description">${description}</div>
        <button class="btn btn-primary">Export as CSV</button>
        <div class="export-includes">
          <strong>Includes:</strong>
          <ul>
            ${includes.map(item => html`<li>${item}</li>`)}
          </ul>
        </div>
      </div>
    `;
  }

  private exportConsensus() {
    if (!this.session) return;

    const headers = [
      'Feature Name',
      'Description',
      'Avg Impact',
      'Avg Confidence',
      'Avg Effort',
      'Avg ICE Score',
      'Score Count',
      'Impact StdDev',
      'Confidence StdDev',
      'Effort StdDev',
      'ICE StdDev',
      'Tier',
      'Priority',
    ];

    const rows = this.session.features.map(feature => {
      const aggregate = this.session!.aggregates.find(a => a.feature_id === feature.id);

      if (!aggregate) {
        return [
          feature.name,
          feature.description || '',
          '', '', '', '', '0', '', '', '', '', '', '',
        ];
      }

      return [
        feature.name,
        feature.description || '',
        this.formatNumber(aggregate.avg_impact),
        this.formatNumber(aggregate.avg_confidence),
        this.formatNumber(aggregate.avg_effort),
        this.formatNumber(aggregate.avg_ice_score),
        aggregate.score_count.toString(),
        this.formatNumber(aggregate.impact_stddev),
        this.formatNumber(aggregate.confidence_stddev),
        this.formatNumber(aggregate.effort_stddev),
        this.formatNumber(aggregate.ice_stddev),
        aggregate.tier_name,
        aggregate.tier_priority,
      ];
    });

    this.downloadCSV(headers, rows, `${this.session.name}_consensus.csv`);
    appStore.showToast('Consensus data exported!', 'success');
  }

  private exportIndividual() {
    if (!this.session) return;

    const headers = [
      'Feature Name',
      'Scorer',
      'Impact',
      'Confidence',
      'Effort',
      'ICE Score',
      'Tier',
      'Priority',
      'Justification',
      'Scored At',
    ];

    const rows: string[][] = [];

    this.session.features.forEach(feature => {
      const scores = this.session!.scores.filter(s => s.feature_id === feature.id);

      scores.forEach(score => {
        rows.push([
          feature.name,
          score.scored_by,
          this.formatNumber(score.impact),
          this.formatNumber(score.confidence),
          this.formatNumber(score.effort),
          this.formatNumber(score.ice_score),
          score.tier_name || '',
          score.tier_priority || '',
          score.justification || '',
          new Date(score.created_at).toISOString(),
        ]);
      });
    });

    this.downloadCSV(headers, rows, `${this.session.name}_individual_scores.csv`);
    appStore.showToast('Individual scores exported!', 'success');
  }

  private exportComplete() {
    if (!this.session) return;

    const headers = [
      'Feature Name',
      'Description',
      'Scorer',
      'Individual Impact',
      'Individual Confidence',
      'Individual Effort',
      'Individual ICE',
      'Individual Tier',
      'Justification',
      'Avg Impact',
      'Avg Confidence',
      'Avg Effort',
      'Avg ICE',
      'Impact StdDev',
      'Confidence StdDev',
      'Effort StdDev',
      'ICE StdDev',
      'Score Count',
      'Consensus Tier',
      'Scored At',
    ];

    const rows: string[][] = [];

    this.session.features.forEach(feature => {
      const aggregate = this.session!.aggregates.find(a => a.feature_id === feature.id);
      const scores = this.session!.scores.filter(s => s.feature_id === feature.id);

      scores.forEach(score => {
        rows.push([
          feature.name,
          feature.description || '',
          score.scored_by,
          this.formatNumber(score.impact),
          this.formatNumber(score.confidence),
          this.formatNumber(score.effort),
          this.formatNumber(score.ice_score),
          score.tier_name || '',
          score.justification || '',
          this.formatNumber(aggregate?.avg_impact),
          this.formatNumber(aggregate?.avg_confidence),
          this.formatNumber(aggregate?.avg_effort),
          this.formatNumber(aggregate?.avg_ice_score),
          this.formatNumber(aggregate?.impact_stddev),
          this.formatNumber(aggregate?.confidence_stddev),
          this.formatNumber(aggregate?.effort_stddev),
          this.formatNumber(aggregate?.ice_stddev),
          aggregate?.score_count.toString() || '0',
          aggregate?.tier_name || '',
          new Date(score.created_at).toISOString(),
        ]);
      });
    });

    this.downloadCSV(headers, rows, `${this.session.name}_complete_report.csv`);
    appStore.showToast('Complete report exported!', 'success');
  }

  private formatNumber(value?: number | null, digits = 2) {
    return typeof value === 'number' ? value.toFixed(digits) : '';
  }

  private downloadCSV(headers: string[], rows: string[][], filename: string) {
    // Escape CSV fields
    const escapeCSV = (field: string) => {
      if (field.includes(',') || field.includes('"') || field.includes('\n')) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    };

    // Build CSV content
    const csvContent = [
      headers.map(escapeCSV).join(','),
      ...rows.map(row => row.map(escapeCSV).join(',')),
    ].join('\n');

    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private handleBack() {
    appStore.setStep('session-dashboard');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-session-export': IceSessionExport;
  }
}
