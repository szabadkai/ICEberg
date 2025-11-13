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
      display: grid;
      grid-template-columns: minmax(220px, 320px) 1fr;
      align-items: center;
      gap: 1.5rem;
    }

    .copy {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .description {
      font-size: 1rem;
      color: #6b7280;
      line-height: 1.5;
      margin: 0;
    }

    .step-indicator {
      background: #eff6ff;
      color: #3b82f6;
      padding: 0.35rem 0.9rem;
      border-radius: 999px;
      font-weight: 600;
      font-size: 0.8rem;
      display: inline-flex;
      width: fit-content;
    }

    .button-group {
      display: flex;
      gap: 0.75rem;
      margin-top: 0.5rem;
      width: 100%;
      max-width: 420px;
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
      border: 1px solid #3b82f6;
    }

    .btn-secondary:hover {
      background: #eff6ff;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    @media (max-width: 768px) {
      .break-container {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .copy {
        align-items: center;
      }

      .step-indicator {
        margin: 0 auto;
      }

      .button-group {
        max-width: none;
        flex-direction: column;
      }

      .button-group button {
        width: 100%;
      }
    }
  `;

  render() {
    const content = this.getContent();

    return html`
      <div class="break-container">
        <ice-illustration type=${this.section} width="320" height="240"></ice-illustration>

        <div class="copy">
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
    if (this.section === 'impact') {
      appStore.setStep(this.getStartingStep());
      return;
    }

    const previousSection = appStore.getPreviousActiveSection(this.section);
    if (!previousSection) {
      appStore.setStep(this.getStartingStep());
      return;
    }

    appStore.setStep(`${previousSection}-questions` as AppStep);
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

  private getStartingStep(): AppStep {
    if (appStore.isSessionScoring()) {
      return 'session-dashboard';
    }
    if (appStore.isBatchScoring()) {
      return 'batch-list';
    }
    return 'feature-input';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-illustration-break': IceIllustrationBreak;
  }
}
