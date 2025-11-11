import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { appStateContext } from '../store/context';
import { appStore } from '../store/store';
import { AppState } from '../types';

import './ice-landing-page';
import './ice-feature-input';
import './ice-illustration-break';
import './ice-question-section';
import './ice-justification-input';
import './ice-results-screen';
import './ice-export-manager';
import './ice-toast-container';
import './ice-confirm-container';

@customElement('ice-scorecard-app')
export class IceScorecardApp extends LitElement {
  @provide({ context: appStateContext })
  @state()
  private appState!: AppState;

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #f8fafc;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .card {
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      padding: 3rem;
      min-height: 500px;
      display: flex;
      flex-direction: column;
    }

    .progress-bar {
      width: 100%;
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .progress-fill {
      height: 100%;
      background: #3b82f6;
      transition: width 0.3s ease;
    }

    @media (max-width: 640px) {
      .container {
        padding: 1rem 0.5rem;
      }

      .card {
        padding: 1.5rem;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.appState = appStore.getState();
    appStore.subscribe((newState) => {
      this.appState = newState;
    });
  }

  render() {
    return html`
      <div class="container">
        ${this.renderProgressBar()}
        <div class="card">
          ${this.renderCurrentStep()}
        </div>
      </div>

      <!-- Toast notifications -->
      <ice-toast-container></ice-toast-container>

      <!-- Confirm dialog -->
      <ice-confirm-container></ice-confirm-container>
    `;
  }

  private renderProgressBar() {
    const progressSteps = [
      'feature-input',
      'impact-intro',
      'impact-questions',
      'confidence-intro',
      'confidence-questions',
      'effort-intro',
      'effort-questions',
      'justification',
      'results',
    ];

    const currentIndex = progressSteps.indexOf(this.appState.currentStep);
    if (currentIndex === -1) return '';

    const progress = ((currentIndex + 1) / progressSteps.length) * 100;

    return html`
      <div class="progress-bar" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
    `;
  }

  private renderCurrentStep() {
    switch (this.appState.currentStep) {
      case 'landing':
        return html`<ice-landing-page></ice-landing-page>`;
      case 'feature-input':
        return html`<ice-feature-input></ice-feature-input>`;
      case 'batch-upload':
        return html`<ice-bulk-upload></ice-bulk-upload>`;
      case 'batch-list':
        return html`<ice-batch-list></ice-batch-list>`;
      case 'impact-intro':
        return html`<ice-illustration-break section="impact"></ice-illustration-break>`;
      case 'impact-questions':
        return html`<ice-question-section section="impact"></ice-question-section>`;
      case 'confidence-intro':
        return html`<ice-illustration-break section="confidence"></ice-illustration-break>`;
      case 'confidence-questions':
        return html`<ice-question-section section="confidence"></ice-question-section>`;
      case 'effort-intro':
        return html`<ice-illustration-break section="effort"></ice-illustration-break>`;
      case 'effort-questions':
        return html`<ice-question-section section="effort"></ice-question-section>`;
      case 'justification':
        return html`<ice-justification-input></ice-justification-input>`;
      case 'results':
        return html`<ice-results-screen></ice-results-screen>`;
      case 'export':
        return html`<ice-export-manager></ice-export-manager>`;
      default:
        return html`<ice-landing-page></ice-landing-page>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-scorecard-app': IceScorecardApp;
  }
}
