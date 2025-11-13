import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import { QuestionSection, AppStep } from '../types';
import { impactQuestions, confidenceQuestions, effortQuestions } from '../data/questions';

@customElement('ice-question-section')
export class IceQuestionSectionComponent extends LitElement {
  @property() section: 'impact' | 'confidence' | 'effort' = 'impact';
  @state() private responses: Map<string, number> = new Map();

  static styles = css`
    :host {
      display: block;
    }

    .section-container {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .section-header {
      text-align: center;
      display: grid;
      gap: 0.4rem;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .step-indicator {
      display: inline-block;
      background: #eff6ff;
      color: #3b82f6;
      padding: 0.3rem 0.9rem;
      border-radius: 999px;
      font-weight: 600;
      font-size: 0.8rem;
    }

    .description {
      color: #6b7280;
      margin: 0 auto;
      max-width: 680px;
    }

    .questions-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
    }

    .question-card {
      background: #f9fafb;
      border-radius: 0.75rem;
      padding: 1rem;
      border: 1px solid #e5e7eb;
    }

    .question-text {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.3rem;
      font-size: 1rem;
    }

    .help-text {
      color: #6b7280;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }

    .options-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .option-item {
      position: relative;
    }

    .option-label {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      background: white;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;
      gap: 0.6rem;
    }

    .option-label:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    input[type='radio'] {
      margin-right: 0.75rem;
      width: 1.25rem;
      height: 1.25rem;
      cursor: pointer;
    }

    input[type='radio']:checked + .option-content {
      font-weight: 600;
    }

    .option-label:has(input:checked) {
      background: #eff6ff;
      border-color: #3b82f6;
    }

    .option-content {
      flex: 1;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .info-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      background: #e5e7eb;
      border-radius: 50%;
      font-size: 0.75rem;
      color: #6b7280;
      cursor: help;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .info-icon:hover {
      background: #3b82f6;
      color: white;
      transform: scale(1.1);
    }

    .option-value {
      color: #475569;
      font-size: 0.85rem;
      font-weight: 600;
      background: #eef2ff;
      padding: 0.15rem 0.65rem;
      border-radius: 999px;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      text-align: center;
      padding: 1rem;
      background: #fef2f2;
      border-radius: 0.5rem;
      border: 1px solid #fecaca;
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
      .questions-list {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .button-group {
        flex-direction: column;
      }

      .button-group button {
        width: 100%;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadResponses();
  }

  private loadResponses() {
    const sectionData = this.getSectionData();
    sectionData.questions.forEach((q) => {
      const value = appStore.getResponse(this.section, q.id);
      if (value !== undefined) {
        this.responses.set(q.id, value);
      }
    });
  }

  private getSectionData(): QuestionSection {
    switch (this.section) {
      case 'impact':
        return impactQuestions;
      case 'confidence':
        return confidenceQuestions;
      case 'effort':
        return effortQuestions;
    }
  }

  private getStepIndicator(): string {
    switch (this.section) {
      case 'impact':
        return 'Impact (1/3)';
      case 'confidence':
        return 'Confidence (2/3)';
      case 'effort':
        return 'Effort (3/3)';
    }
  }

  render() {
    const sectionData = this.getSectionData();
    const allAnswered = sectionData.questions.every((q) => this.responses.has(q.id));

    return html`
      <div class="section-container">
        <div class="section-header">
          <div class="step-indicator">${this.getStepIndicator()}</div>
          <h2>${sectionData.title} Questions</h2>
          <p class="description">${sectionData.description}</p>
        </div>

        <div class="questions-list">
          ${sectionData.questions.map((question) => this.renderQuestion(question))}
        </div>

        ${!allAnswered
          ? html`<div class="error-message">Please answer all questions to continue</div>`
          : ''}

        <div class="button-group">
          <button class="btn-secondary" @click=${this.handleBack}>Back</button>
          <button class="btn-primary" @click=${this.handleNext} ?disabled=${!allAnswered}>
            Continue
          </button>
        </div>
      </div>
    `;
  }

  private renderQuestion(question: { id: string; text: string; helpText?: string; options: { label: string; value: number; helpText?: string }[] }) {
    const selectedValue = this.responses.get(question.id);

    return html`
      <div class="question-card">
        <div class="question-text">${question.text}</div>
        ${question.helpText ? html`<div class="help-text">${question.helpText}</div>` : ''}

        <div class="options-list" role="radiogroup" aria-label="${question.text}">
          ${question.options.map(
            (option) => html`
              <div class="option-item" title="${option.helpText || ''}">
                <label class="option-label">
                  <input
                    type="radio"
                    name="${question.id}"
                    value="${option.value}"
                    .checked=${selectedValue === option.value}
                    @change=${() => this.handleOptionSelect(question.id, option.value)}
                    aria-label="${option.label} - Score: ${option.value}"
                  />
                  <span class="option-content">
                    ${option.label}
                    ${option.helpText ? html`<span class="info-icon" title="${option.helpText}">ⓘ</span>` : ''}
                  </span>
                  <span class="option-value">${option.value}</span>
                </label>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  private handleOptionSelect(questionId: string, value: number) {
    this.responses.set(questionId, value);
    appStore.setResponse(this.section, questionId, value);
    this.requestUpdate();
  }

  private handleBack() {
    let prevStep: AppStep;
    switch (this.section) {
      case 'impact':
        prevStep = 'impact-intro';
        break;
      case 'confidence':
        prevStep = 'confidence-intro';
        break;
      case 'effort':
        prevStep = 'effort-intro';
        break;
    }
    appStore.setStep(prevStep);
  }

  private handleNext() {
    const sectionData = this.getSectionData();
    const allAnswered = sectionData.questions.every((q) => this.responses.has(q.id));

    if (!allAnswered) {
      return;
    }

    const nextSection = appStore.getNextActiveSection(this.section);
    if (!nextSection) {
      appStore.calculateScore();
      const nextStep: AppStep = appStore.needsJustification() ? 'justification' : 'results';
      appStore.setStep(nextStep);
      return;
    }

    appStore.setStep(`${nextSection}-intro` as AppStep);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-question-section': IceQuestionSectionComponent;
  }
}
