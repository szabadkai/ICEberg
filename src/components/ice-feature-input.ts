import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';

@customElement('ice-feature-input')
export class IceFeatureInput extends LitElement {
  @state() private featureName = '';
  @state() private scoredBy = 'PM';
  @state() private errors: { featureName?: string } = {};

  static styles = css`
    :host {
      display: block;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 0.25rem 0;
      text-align: center;
    }

    .subtitle {
      text-align: center;
      color: #6b7280;
      margin-bottom: 1rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    label {
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
    }

    .required {
      color: #ef4444;
    }

    input {
      padding: 0.75rem 1rem;
      border: 2px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    input.error {
      border-color: #ef4444;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: -0.25rem;
    }

    .help-text {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .button-group {
      display: flex;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }

    button {
      flex: 1;
      padding: 0.875rem 1.5rem;
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
      border: 1px solid #bfdbfe;
    }

    .btn-secondary:hover {
      background: #eff6ff;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .button-group {
        flex-direction: column;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    const state = appStore.getState();
    this.featureName = state.featureName;
    this.scoredBy = state.scoredBy;
  }

  render() {
    return html`
      <div class="input-container">
        <div>
          <h2>Let's Get Started</h2>
          <p class="subtitle">Tell us about the feature you want to score</p>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label for="feature-name">
              Feature Name <span class="required">*</span>
            </label>
            <input
              id="feature-name"
              type="text"
              .value=${this.featureName}
              @input=${this.handleFeatureNameInput}
              placeholder="e.g., One-click checkout for returning customers"
              maxlength="100"
              class=${this.errors.featureName ? 'error' : ''}
              aria-required="true"
              aria-invalid=${this.errors.featureName ? 'true' : 'false'}
              aria-describedby=${this.errors.featureName ? 'feature-name-error' : 'feature-name-help'}
            />
            ${this.errors.featureName
              ? html`<span id="feature-name-error" class="error-message">${this.errors.featureName}</span>`
              : html`<span id="feature-name-help" class="help-text">Maximum 100 characters</span>`}
          </div>

          <div class="form-group">
            <label for="scored-by">Scored By (Optional)</label>
            <input
              id="scored-by"
              type="text"
              .value=${this.scoredBy}
              @input=${this.handleScoredByInput}
              placeholder="PM"
              maxlength="50"
            />
            <span class="help-text">Who is scoring this feature?</span>
          </div>
        </div>

        <div class="button-group">
          <button class="btn-secondary" @click=${this.handleBack}>
            Back
          </button>
          <button
            class="btn-primary"
            @click=${this.handleNext}
            ?disabled=${!this.isValid()}
          >
            Continue
          </button>
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

  private validateFeatureName(): boolean {
    if (!this.featureName.trim()) {
      this.errors = { featureName: 'Feature name is required' };
      return false;
    }
    if (this.featureName.trim().length < 3) {
      this.errors = { featureName: 'Feature name must be at least 3 characters' };
      return false;
    }
    this.errors = {};
    return true;
  }

  private isValid(): boolean {
    return this.featureName.trim().length >= 3 && this.featureName.trim().length <= 100;
  }

  private handleBack() {
    appStore.setStep('landing');
  }

  private handleNext() {
    if (this.validateFeatureName() && this.isValid()) {
      appStore.setFeatureInfo(this.featureName.trim(), this.scoredBy.trim());
      appStore.startScoringFlow('impact');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-feature-input': IceFeatureInput;
  }
}
