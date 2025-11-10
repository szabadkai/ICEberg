import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import { FeatureToScore } from '../types';

@customElement('ice-batch-list')
export class IceBatchList extends LitElement {
  @state() private features: FeatureToScore[] = [];
  @state() private currentIndex = 0;
  @state() private scoredBy = 'PM';

  static styles = css`
    :host {
      display: block;
    }

    .batch-container {
      max-width: 800px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
      text-align: center;
    }

    .progress-info {
      text-align: center;
      color: #6b7280;
      font-size: 1rem;
      margin-bottom: 2rem;
    }

    .progress-bar-container {
      background: #e5e7eb;
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .progress-bar-fill {
      background: #3b82f6;
      height: 100%;
      transition: width 0.3s;
    }

    .feature-list {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .feature-item {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #f3f4f6;
      display: flex;
      align-items: center;
      gap: 1rem;
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
      word-wrap: break-word;
    }

    .feature-description {
      color: #6b7280;
      font-size: 0.875rem;
      line-height: 1.4;
    }

    .feature-actions {
      display: flex;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      white-space: nowrap;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
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

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .action-buttons .btn {
      padding: 0.875rem 1.5rem;
      font-size: 1rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .batch-container {
        padding: 1rem;
      }

      .feature-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .feature-actions {
        width: 100%;
      }

      .feature-actions .btn {
        flex: 1;
      }

      .action-buttons {
        flex-direction: column;
      }

      .action-buttons .btn {
        width: 100%;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadBatchData();
    appStore.subscribe(() => this.loadBatchData());
  }

  private loadBatchData() {
    const state = appStore.getState();
    if (state.batchScoring) {
      this.features = state.batchScoring.features;
      this.currentIndex = state.batchScoring.currentFeatureIndex;
      this.scoredBy = state.batchScoring.scoredBy;
    }
  }

  render() {
    if (this.features.length === 0) {
      return this.renderEmptyState();
    }

    const completed = this.features.filter((f) => f.status === 'completed').length;
    const total = this.features.length;
    const progress = (completed / total) * 100;

    return html`
      <div class="batch-container">
        <h2>Batch Scoring</h2>
        <div class="progress-info">
          ${completed} of ${total} features scored by ${this.scoredBy}
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${progress}%"></div>
        </div>

        <div class="feature-list">${this.features.map((f, i) => this.renderFeatureItem(f, i))}</div>

        <div class="action-buttons">
          ${completed === total
            ? html`
                <button class="btn btn-primary" @click=${this.handleViewResults}>
                  View All Results
                </button>
              `
            : html`
                <button class="btn btn-primary" @click=${this.handleScoreCurrent}>
                  Score Current Feature
                </button>
              `}
          <button class="btn btn-secondary" @click=${this.handleCancel}>Cancel Batch</button>
        </div>
      </div>
    `;
  }

  private renderFeatureItem(feature: FeatureToScore, index: number) {
    const isCurrent = index === this.currentIndex;
    const isCompleted = feature.status === 'completed';

    let statusIcon = '⏳';
    if (isCompleted) statusIcon = '✅';
    else if (isCurrent) statusIcon = '👉';

    return html`
      <div class="feature-item ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}">
        <div class="feature-status">${statusIcon}</div>
        <div class="feature-content">
          <div class="feature-name">${feature.name}</div>
          ${feature.description
            ? html`<div class="feature-description">${feature.description}</div>`
            : ''}
        </div>
        ${isCurrent && !isCompleted
          ? html`
              <div class="feature-actions">
                <button class="btn btn-primary" @click=${this.handleScoreCurrent}>Score</button>
              </div>
            `
          : ''}
      </div>
    `;
  }

  private renderEmptyState() {
    return html`
      <div class="empty-state">
        <h3>No features to score</h3>
        <p>Upload a CSV file to start batch scoring.</p>
        <button class="btn btn-primary" @click=${this.handleBack}>Upload Features</button>
      </div>
    `;
  }

  private handleScoreCurrent() {
    appStore.startScoringCurrentBatchFeature();
  }

  private handleViewResults() {
    appStore.setStep('export');
  }

  private handleCancel() {
    if (confirm('Cancel batch scoring? Any unsaved progress will be lost.')) {
      appStore.cancelBatchScoring();
    }
  }

  private handleBack() {
    appStore.setStep('batch-upload');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-batch-list': IceBatchList;
  }
}
