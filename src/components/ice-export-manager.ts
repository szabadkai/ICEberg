import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import { ScoreResult } from '../types';
import { exportToCSV } from '../utils/csv-export';
import './ice-edit-modal';

@customElement('ice-export-manager')
export class IceExportManager extends LitElement {
  @state() private scores: ScoreResult[] = [];
  @state() private sortBy: 'ice' | 'date' | 'name' = 'ice';
  @state() private editingScore: ScoreResult | null = null;
  @state() private showEditModal = false;

  static styles = css`
    :host {
      display: block;
    }

    .export-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
      text-align: center;
    }

    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .sort-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .sort-label {
      font-weight: 600;
      color: #6b7280;
      font-size: 0.875rem;
    }

    select {
      padding: 0.5rem 1rem;
      border: 2px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      cursor: pointer;
      background: white;
    }

    select:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .table-container {
      overflow-x: auto;
      border-radius: 0.75rem;
      border: 2px solid #e5e7eb;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
    }

    th {
      background: #f9fafb;
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
      border-bottom: 2px solid #e5e7eb;
    }

    td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #f3f4f6;
      color: #6b7280;
      font-size: 0.875rem;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: #f9fafb;
    }

    .feature-name {
      font-weight: 600;
      color: #1f2937;
    }

    .score-cell {
      font-weight: 700;
      font-size: 1rem;
    }

    .tier-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: white;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #6b7280;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    button {
      padding: 0.875rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-primary {
      background: #10b981;
      color: white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: white;
      color: #3b82f6;
      border: 2px solid #3b82f6;
    }

    .btn-secondary:hover {
      background: #eff6ff;
    }

    .btn-danger {
      background: white;
      color: #ef4444;
      border: 2px solid #ef4444;
    }

    .btn-danger:hover {
      background: #fef2f2;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
    }

    .btn-icon {
      background: none;
      border: none;
      padding: 0.25rem 0.5rem;
      cursor: pointer;
      font-size: 1.125rem;
      transition: transform 0.2s;
    }

    .btn-icon:hover {
      transform: scale(1.1);
    }

    .btn-icon:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
      border-radius: 4px;
    }

    @media (max-width: 768px) {
      .controls {
        flex-direction: column;
        align-items: stretch;
      }

      .table-container {
        font-size: 0.75rem;
      }

      th,
      td {
        padding: 0.5rem;
      }

      .button-group {
        flex-direction: column;
      }

      button {
        width: 100%;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadScores();
    appStore.subscribe(() => this.loadScores());
  }

  private loadScores() {
    this.scores = this.getSortedScores();
  }

  private getSortedScores(): ScoreResult[] {
    const scores = [...appStore.getState().savedScores];

    switch (this.sortBy) {
      case 'ice':
        return scores.sort((a, b) => b.iceScore - a.iceScore);
      case 'date':
        return scores.sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateB.getTime() - dateA.getTime();
        });
      case 'name':
        return scores.sort((a, b) => a.featureName.localeCompare(b.featureName));
      default:
        return scores;
    }
  }

  render() {
    return html`
      <div class="export-container">
        <h2>Export Your Scores</h2>

        ${this.scores.length > 0 ? this.renderTable() : this.renderEmptyState()}

        <div class="button-group">
          ${this.scores.length > 0
            ? html`
                <button class="btn-primary" @click=${this.handleExport}>
                  Download CSV (${this.scores.length} items)
                </button>
                <button class="btn-danger" @click=${this.handleClearAll}>Clear All Scores</button>
              `
            : ''}
          <button class="btn-secondary" @click=${this.handleScoreNew}>Score New Feature</button>
        </div>
      </div>

      ${this.showEditModal && this.editingScore
        ? html`
            <ice-edit-modal
              .score=${this.editingScore}
              .open=${this.showEditModal}
              @close=${this.handleModalClose}
            ></ice-edit-modal>
          `
        : ''}
    `;
  }

  private renderTable() {
    return html`
      <div class="controls">
        <div class="sort-group">
          <span class="sort-label">Sort by:</span>
          <select @change=${this.handleSortChange} .value=${this.sortBy}>
            <option value="ice">ICE Score (High to Low)</option>
            <option value="date">Date (Newest First)</option>
            <option value="name">Feature Name (A-Z)</option>
          </select>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>I</th>
              <th>C</th>
              <th>E</th>
              <th>ICE</th>
              <th>Tier</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${this.scores.map((score) => this.renderScoreRow(score))}
          </tbody>
        </table>
      </div>
    `;
  }

  private renderScoreRow(score: ScoreResult) {
    return html`
      <tr>
        <td class="feature-name">${score.featureName}</td>
        <td>${score.impact.toFixed(1)}</td>
        <td>${score.confidence.toFixed(1)}</td>
        <td>${score.effort.toFixed(1)}</td>
        <td class="score-cell" style="color: ${score.tier.color}">${score.iceScore.toFixed(2)}</td>
        <td>
          <span class="tier-badge" style="background: ${score.tier.color}">
            ${score.tier.priority}
          </span>
        </td>
        <td>${score.date}</td>
        <td class="actions">
          <button
            class="btn-icon"
            @click=${() => this.handleEdit(score)}
            title="Edit score"
          >
            ✏️
          </button>
          <button
            class="btn-icon btn-danger"
            @click=${() => this.handleDelete(score)}
            title="Delete score"
          >
            🗑️
          </button>
        </td>
      </tr>
    `;
  }

  private renderEmptyState() {
    return html`
      <div class="empty-state">
        <div class="empty-icon">📊</div>
        <h3>No Scores Yet</h3>
        <p>Score some features to see them here and export to CSV.</p>
      </div>
    `;
  }

  private handleSortChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.sortBy = select.value as 'ice' | 'date' | 'name';
    this.loadScores();
  }

  private handleExport() {
    if (this.scores.length === 0) {
      appStore.showToast('No scores to export', 'warning');
      return;
    }

    try {
      exportToCSV(this.scores);
      appStore.showToast('Scores exported successfully!', 'success');
    } catch (error) {
      console.error('Export failed:', error);
      appStore.showToast('Failed to export CSV. Please try again.', 'error');
    }
  }

  private async handleClearAll() {
    const confirmed = await appStore.showConfirm(
      'Clear All Scores',
      'Are you sure you want to clear all saved scores? This cannot be undone.',
      { type: 'danger', confirmText: 'Clear All', cancelText: 'Cancel' }
    );

    if (confirmed) {
      appStore.clearAllScores();
      appStore.showToast('All scores cleared', 'success');
    }
  }

  private handleScoreNew() {
    appStore.resetForNewScore();
  }

  private handleEdit(score: ScoreResult) {
    this.editingScore = score;
    this.showEditModal = true;
  }

  private async handleDelete(score: ScoreResult) {
    if (!score.id) return;

    const confirmed = await appStore.showConfirm(
      'Delete Score',
      `Delete "${score.featureName}"? This cannot be undone.`,
      { type: 'danger', confirmText: 'Delete', cancelText: 'Cancel' }
    );

    if (confirmed) {
      appStore.deleteScore(score.id);
      appStore.showToast('Score deleted', 'success');
    }
  }

  private handleModalClose() {
    this.showEditModal = false;
    this.editingScore = null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-export-manager': IceExportManager;
  }
}
