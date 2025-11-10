import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import { ScoreResult } from '../types';

@customElement('ice-edit-modal')
export class IceEditModal extends LitElement {
  @property({ type: Object }) score!: ScoreResult;
  @property({ type: Boolean }) open = false;

  @state() private featureName = '';
  @state() private scoredBy = '';
  @state() private justification = '';
  @state() private errors: Record<string, string> = {};

  static styles = css`
    :host {
      display: block;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
    }

    .modal {
      background: white;
      border-radius: 8px;
      max-width: 500px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .modal-header h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 1rem;
      font-family: inherit;
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    input.error,
    textarea.error {
      border-color: #ef4444;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .help-text {
      color: #6b7280;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .readonly-field {
      background: #f9fafb;
      color: #6b7280;
      padding: 0.75rem;
      border-radius: 6px;
      font-size: 0.875rem;
    }

    .readonly-label {
      font-weight: 600;
      color: #6b7280;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.25rem;
    }

    .modal-footer {
      padding: 1.5rem;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }

    button {
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s, border-color 0.2s;
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
      border: 1px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.resetForm();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('score') && this.score) {
      this.resetForm();
    }
  }

  private resetForm() {
    if (this.score) {
      this.featureName = this.score.featureName;
      this.scoredBy = this.score.scoredBy;
      this.justification = this.score.justification || '';
    }
  }

  render() {
    if (!this.open || !this.score) return html``;

    return html`
      <div class="modal-overlay" @click=${this.handleOverlayClick}>
        <div class="modal" @click=${(e: Event) => e.stopPropagation()}>
          <div class="modal-header">
            <h3>Edit Score</h3>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <label for="feature-name">Feature Name</label>
              <input
                id="feature-name"
                type="text"
                .value=${this.featureName}
                @input=${this.handleFeatureNameInput}
                class=${this.errors.featureName ? 'error' : ''}
                maxlength="100"
              />
              ${this.errors.featureName
                ? html`<div class="error-message">${this.errors.featureName}</div>`
                : ''}
            </div>

            <div class="form-group">
              <label for="scored-by">Scored By</label>
              <input
                id="scored-by"
                type="text"
                .value=${this.scoredBy}
                @input=${this.handleScoredByInput}
                maxlength="50"
              />
            </div>

            <div class="form-group">
              <div class="readonly-label">ICE Score Components (Read-only)</div>
              <div class="readonly-field">
                Impact: ${this.score.impact.toFixed(2)} | Confidence:
                ${this.score.confidence.toFixed(2)} | Ease: ${this.score.effort.toFixed(2)} → ICE:
                ${this.score.iceScore.toFixed(2)}
              </div>
              <div class="help-text">
                To change scores, you'll need to score the feature again from scratch
              </div>
            </div>

            <div class="form-group">
              <label for="justification">Justification (Optional)</label>
              <textarea
                id="justification"
                .value=${this.justification}
                @input=${this.handleJustificationInput}
                rows="4"
                maxlength="500"
                placeholder="Add notes or reasoning for this score..."
              ></textarea>
              <div class="help-text">${this.justification.length} / 500 characters</div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn-secondary" @click=${this.handleCancel}>Cancel</button>
            <button class="btn-primary" @click=${this.handleSave}>Save Changes</button>
          </div>
        </div>
      </div>
    `;
  }

  private handleFeatureNameInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.featureName = input.value;
    this.validateFeatureName();
  }

  private handleScoredByInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.scoredBy = input.value || 'PM';
  }

  private handleJustificationInput(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;
    this.justification = textarea.value;
  }

  private validateFeatureName(): boolean {
    if (!this.featureName.trim()) {
      this.errors = { ...this.errors, featureName: 'Feature name is required' };
      return false;
    }
    if (this.featureName.trim().length < 3) {
      this.errors = { ...this.errors, featureName: 'Feature name must be at least 3 characters' };
      return false;
    }
    const { featureName, ...rest } = this.errors;
    this.errors = rest;
    return true;
  }

  private handleOverlayClick() {
    this.handleCancel();
  }

  private handleCancel() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  private handleSave() {
    if (!this.validateFeatureName()) {
      return;
    }

    if (!this.score.id) {
      console.error('Cannot update score without ID');
      return;
    }

    appStore.updateScore(this.score.id, {
      featureName: this.featureName.trim(),
      scoredBy: this.scoredBy.trim() || 'PM',
      justification: this.justification.trim() || undefined,
    });

    this.dispatchEvent(new CustomEvent('save'));
    this.dispatchEvent(new CustomEvent('close'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-edit-modal': IceEditModal;
  }
}
