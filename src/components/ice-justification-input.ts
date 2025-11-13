import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';

@customElement('ice-justification-input')
export class IceJustificationInput extends LitElement {
  @state() private justification = '';
  @state() private error = '';

  static styles = css`
    :host {
      display: block;
    }

    .justification-container {
      display: grid;
      grid-template-columns: minmax(220px, 320px) 1fr;
      gap: 1.5rem;
      align-items: start;
    }

    h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 0.5rem 0;
    }

    .prompt {
      color: #6b7280;
      font-size: 1rem;
      line-height: 1.4;
    }

    .score-badge {
      display: inline-block;
      background: #eff6ff;
      color: #3b82f6;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      font-weight: 700;
      font-size: 1.5rem;
      margin: 1rem 0;
    }

    .score-badge.high {
      background: #d1fae5;
      color: #059669;
    }

    .score-badge.low {
      background: #fee2e2;
      color: #dc2626;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    label {
      font-weight: 600;
      color: #374151;
    }

    textarea {
      padding: 1rem;
      border: 2px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-family: inherit;
      resize: vertical;
      min-height: 150px;
      transition: border-color 0.2s;
    }

    textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    textarea.error {
      border-color: #ef4444;
    }

    .char-count {
      text-align: right;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .char-count.error {
      color: #ef4444;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
    }

    .button-group {
      display: flex;
      gap: 0.75rem;
      margin-top: 0.75rem;
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
      border: 2px solid #3b82f6;
    }

    .btn-secondary:hover {
      background: #eff6ff;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    @media (max-width: 768px) {
      .justification-container {
        grid-template-columns: 1fr;
      }

      h2,
      .prompt,
      .score-badge {
        text-align: center;
      }

      .button-group {
        flex-direction: column;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    const state = appStore.getState();
    if (state.currentScore?.justification) {
      this.justification = state.currentScore.justification;
    }
  }

  render() {
    const state = appStore.getState();
    const score = state.currentScore?.iceScore || 0;
    const isHighScore = score >= 7;
    const isLowScore = score <= 2;

    const prompt = isHighScore
      ? 'Explain why this high-value item should be prioritized'
      : 'Explain why this item is still being considered';

    const charCount = this.justification.length;
    const isValid = charCount >= 20 && charCount <= 500;

    return html`
      <div class="justification-container">
        <div>
          <h2>Justification Required</h2>
          <div class="score-badge ${isHighScore ? 'high' : isLowScore ? 'low' : ''}">
            ICE Score: ${score.toFixed(2)}
          </div>
          <p class="prompt">${prompt}</p>
        </div>

        <div>
          <div class="form-group">
            <label for="justification">Your Justification</label>
            <textarea
              id="justification"
              .value=${this.justification}
              @input=${this.handleInput}
              placeholder="Provide a detailed explanation..."
              maxlength="500"
              class=${this.error ? 'error' : ''}
              aria-required="true"
              aria-invalid=${this.error ? 'true' : 'false'}
              aria-describedby="char-count justification-error"
            ></textarea>

            <div id="char-count" class="char-count ${charCount < 20 || charCount > 500 ? 'error' : ''}">
              ${charCount} / 500 characters (minimum 20)
            </div>

          ${this.error ? html`<span id="justification-error" class="error-message">${this.error}</span>` : ''}
        </div>

        <div class="button-group">
          <button class="btn-secondary" @click=${this.handleBack}>Back</button>
          <button class="btn-primary" @click=${this.handleNext} ?disabled=${!isValid}>
            Continue
          </button>
        </div>
      </div>
    `;
  }

  private handleInput(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;
    this.justification = textarea.value;
    this.validate();
  }

  private validate(): boolean {
    const charCount = this.justification.trim().length;

    if (charCount < 20) {
      this.error = 'Please provide at least 20 characters of justification';
      return false;
    }

    if (charCount > 500) {
      this.error = 'Justification must not exceed 500 characters';
      return false;
    }

    this.error = '';
    return true;
  }

  private handleBack() {
    appStore.setStep('effort-questions');
  }

  private handleNext() {
    if (this.validate()) {
      appStore.setJustification(this.justification.trim());
      appStore.setStep('results');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-justification-input': IceJustificationInput;
  }
}
