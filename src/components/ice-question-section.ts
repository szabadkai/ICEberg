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
      gap: 2rem;
    }

    .section-header {
      text-align: center;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 0.5rem 0;
    }

    .step-indicator {
      display: inline-block;
      background: #eff6ff;
      color: #3b82f6;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .description {
      color: #6b7280;
      margin-bottom: 1rem;
    }

    .questions-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .question-card {
      background: #f9fafb;
      border-radius: 0.75rem;
      padding: 1.5rem;
    }

    .question-text {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }

    .help-text {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .options-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .option-item {
      position: relative;
    }

    .option-label {
      display: flex;
      align-items: center;
      padding: 1rem;
      background: white;
      border: 2px solid #d1d5db;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;
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
    }

    .option-value {
      color: #6b7280;
      font-size: 0.875rem;
      font-weight: 600;
      background: #f3f4f6;
      padding: 0.25rem 0.75rem;
      border-radius: 0.375rem;
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
      gap: 1rem;
      margin-top: 1rem;
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

  private renderQuestion(question: { id: string; text: string; helpText?: string; options: { label: string; value: number }[] }) {
    const selectedValue = this.responses.get(question.id);

    return html`
      <div class="question-card">
        <div class="question-text">${question.text}</div>
        ${question.helpText ? html`<div class="help-text">${question.helpText}</div>` : ''}

        <div class="options-list" role="radiogroup" aria-label="${question.text}">
          ${question.options.map(
            (option) => html`
              <div class="option-item">
                <label class="option-label">
                  <input
                    type="radio"
                    name="${question.id}"
                    value="${option.value}"
                    .checked=${selectedValue === option.value}
                    @change=${() => this.handleOptionSelect(question.id, option.value)}
                    aria-label="${option.label} - Score: ${option.value}"
                  />
                  <span class="option-content">${option.label}</span>
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

    let nextStep: AppStep;
    switch (this.section) {
      case 'impact':
        nextStep = 'confidence-intro';
        break;
      case 'confidence':
        nextStep = 'effort-intro';
        break;
      case 'effort':
        // Calculate score and determine next step
        const score = appStore.calculateScore();
        nextStep = appStore.needsJustification() ? 'justification' : 'results';
        break;
    }
    appStore.setStep(nextStep);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-question-section': IceQuestionSectionComponent;
  }
}
