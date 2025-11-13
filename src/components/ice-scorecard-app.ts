import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { appStateContext } from '../store/context';
import { appStore } from '../store/store';
import { AppState, AppStep } from '../types';
import { isSupabaseConfigured } from '../lib/supabase';

import './ice-landing-page';
import './ice-feature-input';
import './ice-illustration-break';
import './ice-question-section';
import './ice-justification-input';
import './ice-results-screen';
import './ice-export-manager';
import './ice-toast-container';
import './ice-confirm-container';
import './ice-session-create';
import './ice-session-list';
import './ice-session-dashboard';
import './ice-session-visualize';
import './ice-session-export';
import './ice-feature-breakdown';

@customElement('ice-scorecard-app')
export class IceScorecardApp extends LitElement {
  @provide({ context: appStateContext })
  @state()
  private appState!: AppState;

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 1.5rem;
      background: var(--color-bg);
      color: var(--color-text);
    }

    .container {
      width: 100%;
      max-width: 1100px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .card {
      background: var(--color-surface);
      border-radius: 12px;
      border: 1px solid var(--color-border);
      box-shadow: 0 8px 30px rgba(15, 23, 42, 0.08);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .card-toolbar {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 1rem;
    }

    .theme-toggle {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 0.9rem;
      border-radius: 999px;
      border: 1px solid var(--color-border);
      background: var(--color-surface-muted);
      color: var(--color-text);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }

    .theme-toggle:hover {
      background: #e0f2fe;
    }

    :host-context([data-theme='dark']) .card {
      box-shadow: 0 15px 40px rgba(2, 6, 23, 0.6);
    }

    :host-context([data-theme='dark']) .theme-toggle {
      background: #0f172a;
      border-color: #334155;
      color: #f8fafc;
    }

    .progress-bar {
      width: 100%;
      height: 4px;
      background: var(--color-border);
      border-radius: 999px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: #3b82f6;
      transition: width 0.3s ease;
    }

    @media (max-width: 640px) {
      :host {
        padding: 1rem;
        align-items: flex-start;
      }

      .container {
        gap: 0.75rem;
      }

      .card {
        padding: 1.25rem;
      }
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    this.appState = appStore.getState();
    appStore.subscribe((newState) => {
      this.appState = newState;
    });

    // Check for sessionId in URL parameters (only if Supabase is configured)
    if (isSupabaseConfigured) {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get('sessionId');

      if (sessionId) {
        // Load the session and navigate to dashboard
        const loaded = await appStore.loadSessionWithDetails(sessionId);
        if (loaded) {
          const targetStep = this.getStepFromHash();

          if (targetStep?.step === 'feature-breakdown' && targetStep.featureId) {
            const feature = loaded.features.find(f => f.id === targetStep.featureId);
            if (feature) {
              appStore.setCurrentSessionFeature(feature);
            }
          }

          appStore.setStep(targetStep?.step ?? 'session-dashboard', { replaceHistory: true });
        } else {
          appStore.showToast('Session not found', 'error');
        }
      }
    }
  }

  render() {
    return html`
      <div class="container">
        ${this.renderProgressBar()}
        <div class="card">
          <div class="card-toolbar">
            ${this.renderThemeToggle()}
          </div>
          ${this.renderCurrentStep()}
        </div>
      </div>

      <!-- Toast notifications -->
      <ice-toast-container></ice-toast-container>

      <!-- Confirm dialog -->
      <ice-confirm-container></ice-confirm-container>
    `;
  }

  private renderThemeToggle() {
    const isDark = this.appState.theme === 'dark';
    const label = isDark ? 'Dark Mode' : 'Light Mode';
    const icon = isDark ? '🌙' : '☀️';
    return html`
      <button
        class="theme-toggle"
        @click=${this.handleThemeToggle}
        aria-label="Toggle theme"
        aria-pressed=${isDark}
      >
        <span>${icon}</span>
        <span>${label}</span>
      </button>
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
      case 'session-create':
        return html`<ice-session-create></ice-session-create>`;
      case 'session-list':
        return html`<ice-session-list></ice-session-list>`;
      case 'session-dashboard':
        return html`<ice-session-dashboard></ice-session-dashboard>`;
      case 'session-visualize':
        return html`<ice-session-visualize></ice-session-visualize>`;
      case 'session-export':
        return html`<ice-session-export></ice-session-export>`;
      case 'feature-breakdown':
        return html`<ice-feature-breakdown></ice-feature-breakdown>`;
      default:
        return html`<ice-landing-page></ice-landing-page>`;
    }
  }

  private getStepFromHash(): { step: AppStep; featureId?: string } | null {
    if (typeof window === 'undefined') return null;

    const hash = window.location.hash.replace('#', '');
    if (!hash) return null;

    if (hash.startsWith('feature-breakdown/')) {
      const [, , featureId] = hash.split('/');
      return featureId ? { step: 'feature-breakdown', featureId } : { step: 'feature-breakdown' };
    }

    const shareableSteps: AppStep[] = ['session-dashboard', 'session-visualize', 'session-export'];
    if (shareableSteps.includes(hash as AppStep)) {
      return { step: hash as AppStep };
    }

    return null;
  }

  private handleThemeToggle = () => {
    appStore.toggleTheme();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-scorecard-app': IceScorecardApp;
  }
}
