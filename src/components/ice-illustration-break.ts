import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { appStore } from '../store/store';
import { AppStep } from '../types';
import './ice-illustration';

@customElement('ice-illustration-break')
export class IceIllustrationBreak extends LitElement {
  @property() section: 'impact' | 'confidence' | 'effort' = 'impact';

  static styles = css`
    :host {
      display: block;
    }

    .break-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      text-align: center;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .description {
      font-size: 1.125rem;
      color: #6b7280;
      max-width: 500px;
      line-height: 1.6;
    }

    .step-indicator {
      background: #eff6ff;
      color: #3b82f6;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      width: 100%;
      max-width: 400px;
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

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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

  render() {
    const content = this.getContent();

    return html`
      <div class="break-container">
        <ice-illustration type=${this.section} width="400" height="300"></ice-illustration>

        <div class="step-indicator">${content.step}</div>

        <h2>${content.title}</h2>

        <p class="description">${content.description}</p>

        <div class="button-group">
          <button class="btn-secondary" @click=${this.handleBack}>
            Back
          </button>
          <button class="btn-primary" @click=${this.handleContinue}>
            Continue
          </button>
        </div>
      </div>
    `;
  }

  private getContent() {
    switch (this.section) {
      case 'impact':
        return {
          step: 'Step 1 of 3',
          title: "Let's assess the Impact",
          description:
            'Impact measures how significantly this feature will move the needle for your users and business. Consider user reach, metric improvement, and strategic alignment.',
        };
      case 'confidence':
        return {
          step: 'Step 2 of 3',
          title: "Now let's evaluate Confidence",
          description:
            'Confidence reflects how certain we are that this feature will succeed. This includes research validation, past experience, technical proof, and resource availability.',
        };
      case 'effort':
        return {
          step: 'Step 3 of 3',
          title: "Finally, let's estimate the Effort",
          description:
            'Effort represents the resources and time required to build this feature. Consider development time, team coordination, technical complexity, and dependencies.',
        };
    }
  }

  private handleBack() {
    let prevStep: AppStep;
    switch (this.section) {
      case 'impact':
        prevStep = 'feature-input';
        break;
      case 'confidence':
        prevStep = 'impact-questions';
        break;
      case 'effort':
        prevStep = 'confidence-questions';
        break;
    }
    appStore.setStep(prevStep);
  }

  private handleContinue() {
    let nextStep: AppStep;
    switch (this.section) {
      case 'impact':
        nextStep = 'impact-questions';
        break;
      case 'confidence':
        nextStep = 'confidence-questions';
        break;
      case 'effort':
        nextStep = 'effort-questions';
        break;
    }
    appStore.setStep(nextStep);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-illustration-break': IceIllustrationBreak;
  }
}
