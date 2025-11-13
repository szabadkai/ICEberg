import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import { ScoringSession } from '../types';

@customElement('ice-session-list')
export class IceSessionList extends LitElement {
  @state() private sessions: ScoringSession[] = [];
  @state() private filterStatus: 'all' | 'active' | 'completed' | 'archived' = 'all';

  static styles = css`
    :host {
      display: block;
      max-width: 1000px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .filter-group {
      display: flex;
      gap: 0.5rem;
    }

    .filter-btn {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: 2px solid #e5e7eb;
      background: white;
      color: #6b7280;
    }

    .filter-btn.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .filter-btn:hover:not(.active) {
      background: #f9fafb;
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

    .sessions-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .session-card {
      background: var(--color-surface-soft);
      border: 1px solid var(--color-border);
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.2s;
      cursor: pointer;
    }

    .session-card:hover {
      border-color: #3b82f6;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .session-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 0.75rem;
      gap: 1rem;
    }

    .session-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }

    .session-status {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      flex-shrink: 0;
    }

    .status-active {
      background: #d1fae5;
      color: #065f46;
    }

    .status-completed {
      background: #dbeafe;
      color: #1e40af;
    }

    .status-archived {
      background: #f3f4f6;
      color: #6b7280;
    }

    .session-description {
      color: #6b7280;
      margin-bottom: 0.75rem;
      line-height: 1.5;
    }

    .session-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: stretch;
      }

      .filter-group {
        justify-content: center;
      }
    }

    :host-context([data-theme='dark']) .filter-btn,
    :host-context([data-theme='dark']) .btn-secondary,
    :host-context([data-theme='dark']) .session-card,
    :host-context([data-theme='dark']) .empty-state {
      background: var(--color-surface-muted);
      border-color: var(--color-border);
      color: var(--color-text);
    }

    :host-context([data-theme='dark']) .filter-btn.active,
    :host-context([data-theme='dark']) .btn-primary {
      background: #2563eb;
      border-color: #2563eb;
      color: #f8fafc;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadSessions();
    appStore.subscribe(() => this.loadSessions());
  }

  private loadSessions() {
    const state = appStore.getState();
    this.sessions = state.sessions;
  }

  render() {
    const filteredSessions = this.filterStatus === 'all'
      ? this.sessions
      : this.sessions.filter(s => s.status === this.filterStatus);

    return html`
      <div class="header">
        <div>
          <h2>Scoring Sessions</h2>
        </div>
        <div class="filter-group">
          <button
            class="filter-btn ${this.filterStatus === 'all' ? 'active' : ''}"
            @click=${() => (this.filterStatus = 'all')}
          >
            All
          </button>
          <button
            class="filter-btn ${this.filterStatus === 'active' ? 'active' : ''}"
            @click=${() => (this.filterStatus = 'active')}
          >
            Active
          </button>
          <button
            class="filter-btn ${this.filterStatus === 'completed' ? 'active' : ''}"
            @click=${() => (this.filterStatus = 'completed')}
          >
            Completed
          </button>
          <button
            class="filter-btn ${this.filterStatus === 'archived' ? 'active' : ''}"
            @click=${() => (this.filterStatus = 'archived')}
          >
            Archived
          </button>
        </div>
      </div>

      ${filteredSessions.length === 0 ? this.renderEmptyState() : this.renderSessions(filteredSessions)}

      <div style="margin-top: 2rem; display: flex; gap: 1rem;">
        <button class="btn btn-primary" @click=${this.handleCreateNew}>
          Create New Session
        </button>
        <button class="btn btn-secondary" @click=${this.handleBack}>
          Back to Home
        </button>
      </div>
    `;
  }

  private renderSessions(sessions: ScoringSession[]) {
    return html`
      <div class="sessions-list">
        ${sessions.map(session => this.renderSessionCard(session))}
      </div>
    `;
  }

  private renderSessionCard(session: ScoringSession) {
    const created = new Date(session.created_at);
    const updated = new Date(session.updated_at);

    return html`
      <div class="session-card" @click=${() => this.handleSessionClick(session)}>
        <div class="session-header">
          <h3 class="session-title">${session.name}</h3>
          <span class="session-status status-${session.status}">
            ${session.status}
          </span>
        </div>
        ${session.description
          ? html`<p class="session-description">${session.description}</p>`
          : ''}
        <div class="session-meta">
          <div class="meta-item">
            <span>👤</span>
            <span>Created by ${session.created_by}</span>
          </div>
          <div class="meta-item">
            <span>📅</span>
            <span>Created ${created.toLocaleDateString()}</span>
          </div>
          <div class="meta-item">
            <span>🔄</span>
            <span>Updated ${updated.toLocaleDateString()}</span>
          </div>
          <div class="meta-item">
            <span>📊</span>
            <span>${session.aggregation_method}</span>
          </div>
        </div>
      </div>
    `;
  }

  private renderEmptyState() {
    const message = this.filterStatus === 'all'
      ? 'No sessions yet'
      : `No ${this.filterStatus} sessions`;

    return html`
      <div class="empty-state">
        <h3>${message}</h3>
        <p>Create a collaborative scoring session to get started</p>
      </div>
    `;
  }

  private handleSessionClick(session: ScoringSession) {
    appStore.setCurrentSession(session);
    appStore.setStep('session-dashboard');
  }

  private handleCreateNew() {
    appStore.setStep('session-create');
  }

  private handleBack() {
    appStore.setStep('landing');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-session-list': IceSessionList;
  }
}
