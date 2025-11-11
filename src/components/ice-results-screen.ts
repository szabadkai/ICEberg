import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import { ScoreResult } from '../types';
import './ice-illustration';

@customElement('ice-results-screen')
export class IceResultsScreen extends LitElement {
  @state() private score: ScoreResult | undefined;

  static styles = css`
    :host {
      display: block;
    }

    .results-container {
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

    .feature-name {
      font-size: 1.25rem;
      color: #6b7280;
      font-weight: 500;
    }

    .ice-score-display {
      background: #3b82f6;
      color: white;
      padding: 2rem;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
    }

    .ice-score-label {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .ice-score-value {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1;
    }

    .breakdown {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      width: 100%;
      max-width: 500px;
      margin-top: 1rem;
    }

    .breakdown-item {
      background: white;
      padding: 1rem;
      border-radius: 0.5rem;
      border: 2px solid #e5e7eb;
    }

    .breakdown-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 0.25rem;
    }

    .breakdown-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
    }

    .tier-card {
      width: 100%;
      max-width: 500px;
      padding: 2rem;
      border-radius: 1rem;
      border: 3px solid;
      background: white;
    }

    .tier-name {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .tier-priority {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .tier-description {
      color: #6b7280;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .tier-example {
      background: #f9fafb;
      padding: 1rem;
      border-radius: 0.5rem;
      border-left: 4px solid;
      font-size: 0.875rem;
    }

    .tier-example-label {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .justification-display {
      width: 100%;
      max-width: 500px;
      background: #f9fafb;
      padding: 1.5rem;
      border-radius: 0.75rem;
      border: 2px solid #e5e7eb;
      text-align: left;
    }

    .justification-label {
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .justification-text {
      color: #6b7280;
      line-height: 1.6;
    }

    .button-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 400px;
      margin-top: 1rem;
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
      color: #3b82f6;
      border: 2px solid #3b82f6;
    }

    .btn-secondary:hover {
      background: #eff6ff;
      border-color: #2563eb;
    }

    .btn-tertiary {
      background: white;
      color: #6b7280;
      border: 1px solid #d1d5db;
    }

    .btn-tertiary:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    @media (max-width: 640px) {
      .ice-score-value {
        font-size: 3rem;
      }

      .breakdown {
        grid-template-columns: 1fr;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    const state = appStore.getState();
    this.score = state.currentScore;
  }

  render() {
    if (!this.score) {
      return html`<div>No score available</div>`;
    }

    const tierColor = this.score.tier.color;

    return html`
      <div class="results-container">
        <h2>Your ICE Score</h2>
        <p class="feature-name">${this.score.featureName}</p>

        <div class="ice-score-display">
          <div class="ice-score-label">Final ICE Score</div>
          <div class="ice-score-value">${this.score.iceScore.toFixed(2)}</div>
        </div>

        <div class="breakdown">
          <div class="breakdown-item">
            <div class="breakdown-label">Impact</div>
            <div class="breakdown-value">${this.score.impact.toFixed(2)}</div>
          </div>
          <div class="breakdown-item">
            <div class="breakdown-label">Confidence</div>
            <div class="breakdown-value">${this.score.confidence.toFixed(2)}</div>
          </div>
          <div class="breakdown-item">
            <div class="breakdown-label">Effort</div>
            <div class="breakdown-value">${this.score.effort.toFixed(2)}</div>
          </div>
        </div>

        <ice-illustration
          type="${this.score.tier.illustration}"
          width="300"
          height="225"
        ></ice-illustration>

        <div class="tier-card" style="border-color: ${tierColor}">
          <div class="tier-name" style="color: ${tierColor}">${this.score.tier.name}</div>
          <div class="tier-priority" style="background: ${tierColor}; color: white;">
            ${this.score.tier.priority} Priority
          </div>
          <div class="tier-description">${this.score.tier.description}</div>
          <div class="tier-example" style="border-color: ${tierColor}">
            <div class="tier-example-label">Example:</div>
            <div>${this.score.tier.example}</div>
          </div>
        </div>

        ${this.score.justification
          ? html`
              <div class="justification-display">
                <div class="justification-label">Justification</div>
                <div class="justification-text">${this.score.justification}</div>
              </div>
            `
          : ''}

        <div class="button-group">
          <button class="btn-primary" @click=${this.handleSave}>
            ${appStore.isBatchScoring() ? 'Save & Continue to Next' : 'Add to Export List'}
          </button>
          ${!appStore.isBatchScoring()
            ? html`
                <button class="btn-secondary" @click=${this.handleScoreAnother}>
                  Score Another Feature
                </button>
                <button class="btn-tertiary" @click=${this.handleViewExport}>
                  View Export List (${appStore.getState().savedScores.length})
                </button>
              `
            : html`
                <button class="btn-tertiary" @click=${this.handleBackToBatch}>
                  Back to Batch List
                </button>
              `}
        </div>
      </div>
    `;
  }

  private async handleSave() {
    const state = appStore.getState();
    const currentSession = state.currentSession;
    const currentSessionFeature = state.currentSessionFeature;

    // Check if we're in a session scoring context
    if (currentSession && currentSessionFeature && this.score) {
      // Save to session
      const success = await appStore.saveSessionScore(
        currentSession.id,
        currentSessionFeature.id,
        this.score.scoredBy,
        this.score.impact,
        this.score.confidence,
        this.score.effort,
        this.score.iceScore,
        this.score.justification,
        this.score.responses
      );

      if (success) {
        // Reload session to get updated aggregates
        await appStore.loadSessionWithDetails(currentSession.id);
        // Navigate back to session dashboard
        appStore.setStep('session-dashboard');
      }
    } else if (appStore.isBatchScoring()) {
      // In batch mode, complete the feature and move to next
      appStore.saveCurrentScore();
      appStore.completeBatchFeature();
    } else {
      // Regular single score mode
      appStore.saveCurrentScore();
      appStore.showToast('Score saved to export list!', 'success');
    }
  }

  private handleScoreAnother() {
    appStore.resetForNewScore();
  }

  private handleViewExport() {
    appStore.setStep('export');
  }

  private handleBackToBatch() {
    appStore.setStep('batch-list');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-results-screen': IceResultsScreen;
  }
}
