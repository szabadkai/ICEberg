import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { appStore } from '../store/store';
import './ice-illustration';

@customElement('ice-landing-page')
export class IceLandingPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .landing-container {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .subtitle {
      font-size: 1.125rem;
      color: #6b7280;
      max-width: 500px;
      line-height: 1.6;
    }

    .methodology {
      background: #f3f4f6;
      border-radius: 0.5rem;
      padding: 1.5rem;
      margin: 1rem 0;
      text-align: left;
      max-width: 600px;
    }

    .methodology h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #374151;
      margin: 0 0 1rem 0;
    }

    .methodology-grid {
      display: grid;
      gap: 0.75rem;
    }

    .methodology-item {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .methodology-label {
      font-weight: 600;
      color: #3b82f6;
      min-width: 100px;
    }

    .methodology-desc {
      color: #6b7280;
      flex: 1;
    }

    .cta-button {
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 0.875rem 2.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .cta-button:hover {
      background: #2563eb;
    }

    .cta-button:active {
      background: #1d4ed8;
    }

    .cta-button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    @media (max-width: 640px) {
      h1 {
        font-size: 1.875rem;
      }

      .subtitle {
        font-size: 1rem;
      }
    }
  `;

  render() {
    return html`
      <div class="landing-container">
        <ice-illustration type="landing" width="400" height="300"></ice-illustration>

        <h1>Welcome to ICE Scorecard</h1>

        <p class="subtitle">
          Make better prioritization decisions with a structured approach to scoring your product features.
        </p>

        <div class="methodology">
          <h3>What is ICE Scoring?</h3>
          <div class="methodology-grid">
            <div class="methodology-item">
              <span class="methodology-label">Impact:</span>
              <span class="methodology-desc">How much will this feature move the needle?</span>
            </div>
            <div class="methodology-item">
              <span class="methodology-label">Confidence:</span>
              <span class="methodology-desc">How sure are we that this will work?</span>
            </div>
            <div class="methodology-item">
              <span class="methodology-label">Effort:</span>
              <span class="methodology-desc">How much work will this require?</span>
            </div>
          </div>
        </div>

        <button
          class="cta-button"
          @click=${this.handleStart}
          aria-label="Start scoring a new feature"
        >
          Start Scoring
        </button>

        <button
          class="cta-button"
          @click=${this.handleBulkUpload}
          aria-label="Upload multiple features to score"
          style="background: #10b981; margin-top: 1rem;"
        >
          Bulk Upload Features
        </button>
      </div>
    `;
  }

  private handleStart() {
    appStore.setStep('feature-input');
  }

  private handleBulkUpload() {
    appStore.setStep('batch-upload');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-landing-page': IceLandingPage;
  }
}
