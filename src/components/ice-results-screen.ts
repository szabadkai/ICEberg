import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import { ScoreResult, SectionKey, SessionWithDetails, SessionFeature } from '../types';
import './ice-illustration';

@customElement('ice-results-screen')
export class IceResultsScreen extends LitElement {
  @state() private score: ScoreResult | undefined;

  static styles = css`
    :host {
      display: block;
    }

    .results-container {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.5rem;
      align-items: start;
    }

    .results-primary,
    .results-secondary {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .feature-name {
      font-size: 1rem;
      color: #6b7280;
      font-weight: 500;
    }

    .ice-score-display {
      background: #3b82f6;
      color: white;
      padding: 1.5rem;
      border-radius: 12px;
      width: 100%;
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

    .ice-score-value.muted {
      color: #94a3b8;
    }

    .ice-score-hint {
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: #e0e7ff;
    }

    .breakdown {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
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

    .skipped-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: #9333ea;
    }

    .tier-card {
      width: 100%;
      padding: 1.5rem;
      border-radius: 1rem;
      border: 2px solid;
      background: white;
    }

    .tier-placeholder {
      width: 100%;
      padding: 1.5rem;
      border-radius: 1rem;
      border: 1px dashed #c4b5fd;
      background: #faf5ff;
      color: #6b21a8;
      text-align: center;
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
      background: #f9fafb;
      padding: 1.25rem;
      border-radius: 0.75rem;
      border: 1px solid #e5e7eb;
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
      gap: 0.75rem;
      width: 100%;
      margin-top: 0.5rem;
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
      border: 1px solid #3b82f6;
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

    :host-context([data-theme='dark']) .results-primary,
    :host-context([data-theme='dark']) .results-secondary,
    :host-context([data-theme='dark']) .tier-card,
    :host-context([data-theme='dark']) .tier-example,
    :host-context([data-theme='dark']) .tier-placeholder,
    :host-context([data-theme='dark']) .justification-display {
      background: var(--color-surface);
      border-color: var(--color-border);
      color: var(--color-text);
    }

    :host-context([data-theme='dark']) .tier-placeholder {
      border-style: solid;
      color: var(--color-text);
    }

    :host-context([data-theme='dark']) .tier-description,
    :host-context([data-theme='dark']) .justification-label,
    :host-context([data-theme='dark']) .feature-name {
      color: var(--color-text);
    }

    :host-context([data-theme='dark']) .btn-tertiary {
      background: transparent;
      border-color: var(--color-border);
      color: var(--color-text);
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    @media (max-width: 900px) {
      .results-container {
        grid-template-columns: 1fr;
      }

      .button-group {
        flex-direction: column;
      }
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

    const tierColor = this.score.tier?.color || '#e5e7eb';
    const isBatch = appStore.isBatchScoring();
    const isSession = this.isSessionScoring();
    const primaryLabel = isSession
      ? 'Save to Session'
      : isBatch
        ? 'Save & Continue to Next'
        : 'Add to Export List';

    return html`
      <div class="results-container">
        <div class="results-primary">
          <div>
            <h2>Your ICE Score</h2>
            <p class="feature-name">${this.score.featureName}</p>
          </div>

          <div class="ice-score-display">
            <div class="ice-score-label">Final ICE Score</div>
            ${this.score.iceScore !== null
              ? html`<div class="ice-score-value">${this.score.iceScore.toFixed(2)}</div>`
              : html`
                  <div class="ice-score-value muted">—</div>
                  <p class="ice-score-hint">
                    Complete ${this.formatSkippedSections()} sections to see an ICE score.
                  </p>
                `}
          </div>

          <div class="breakdown">
            <div class="breakdown-item">
              <div class="breakdown-label">Impact</div>
              <div class="breakdown-value">${this.renderSectionMetric('impact', this.score.impact)}</div>
            </div>
            <div class="breakdown-item">
              <div class="breakdown-label">Confidence</div>
              <div class="breakdown-value">${this.renderSectionMetric('confidence', this.score.confidence)}</div>
            </div>
            <div class="breakdown-item">
              <div class="breakdown-label">Effort</div>
              <div class="breakdown-value">${this.renderSectionMetric('effort', this.score.effort)}</div>
            </div>
          </div>

          <div class="button-group">
            <button class="btn-primary" @click=${this.handleSave}>
              ${primaryLabel}
            </button>
            ${isBatch
              ? html`
                  <button class="btn-tertiary" @click=${this.handleBackToBatch}>
                    Back to Batch List
                  </button>
                `
              : isSession
                ? html`
                    <button class="btn-secondary" @click=${this.handleSaveAndScoreNext}>
                      Save & Score Next Feature
                    </button>
                    <button class="btn-tertiary" @click=${this.handleBackToSession}>
                      Back to Session Queue
                    </button>
                  `
                : html`
                    <button class="btn-secondary" @click=${this.handleScoreAnother}>
                      Score Another Feature
                    </button>
                    <button class="btn-tertiary" @click=${this.handleViewExport}>
                      View Export List (${appStore.getState().savedScores.length})
                    </button>
                  `}
          </div>
        </div>

        <div class="results-secondary">
          ${this.score.tier
            ? html`
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
              `
            : html`
                <div class="tier-placeholder">
                  <h3>Tier pending</h3>
                  <p>
                    Provide scores for ${this.formatSkippedSections()} to unlock the tier recommendation.
                  </p>
                </div>
              `}

          ${this.score.justification
            ? html`
                <div class="justification-display">
                  <div class="justification-label">Justification</div>
                  <div class="justification-text">${this.score.justification}</div>
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }

  private async handleSave() {
    if (this.isSessionScoring()) {
      const updatedSession = await this.persistSessionScore();
      if (updatedSession) {
        appStore.setStep('session-dashboard');
      }
      return;
    }

    if (appStore.isBatchScoring()) {
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

  private handleBackToSession() {
    appStore.setStep('session-dashboard');
  }

  private isSessionScoring() {
    const state = appStore.getState();
    return !!(state.currentSession && state.currentSessionFeature && this.score);
  }

  private async persistSessionScore(): Promise<SessionWithDetails | null> {
    const state = appStore.getState();
    const currentSession = state.currentSession;
    const currentSessionFeature = state.currentSessionFeature;

    if (!currentSession || !currentSessionFeature || !this.score) {
      return null;
    }

    const success = await appStore.saveSessionScore(
      currentSession.id,
      currentSessionFeature.id,
      this.score.scoredBy,
      this.score.impact,
      this.score.confidence,
      this.score.effort,
      this.score.iceScore,
      this.score.justification,
      this.score.responses,
      this.score.skippedSections ?? []
    );

    if (!success) {
      return null;
    }

    return (await appStore.loadSessionWithDetails(currentSession.id)) || null;
  }

  private findNextSessionFeature(
    session: SessionWithDetails,
    scorer: string,
    currentFeatureId?: string
  ): SessionFeature | undefined {
    const normalized = scorer.trim().toLowerCase();
    const scoredFeatureIds = new Set(
      session.scores
        .filter(score => score.scored_by.trim().toLowerCase() === normalized)
        .map(score => score.feature_id)
    );

    const pending = session.features.filter(feature => !scoredFeatureIds.has(feature.id));
    if (pending.length === 0) {
      return undefined;
    }

    if (currentFeatureId) {
      const currentIndex = session.features.findIndex(feature => feature.id === currentFeatureId);
      if (currentIndex >= 0) {
        const afterCurrent = pending.find(feature => session.features.indexOf(feature) > currentIndex);
        if (afterCurrent) {
          return afterCurrent;
        }
      }
    }

    return pending[0];
  }

  private async handleSaveAndScoreNext() {
    const updatedSession = await this.persistSessionScore();
    if (!updatedSession || !this.score) {
      return;
    }

    const state = appStore.getState();
    const currentFeatureId = state.currentSessionFeature?.id;
    const nextFeature = this.findNextSessionFeature(updatedSession, this.score.scoredBy, currentFeatureId);

    if (nextFeature) {
      appStore.setCurrentSessionFeature(nextFeature);
      appStore.prepareFeatureForScoring(nextFeature.name, this.score.scoredBy);
      appStore.startScoringFlow('impact');
    } else {
      appStore.showToast('All features in this session have your score. Returning to dashboard.', 'info', 5000);
      appStore.setStep('session-dashboard');
    }
  }

  private renderSectionMetric(section: SectionKey, value: number) {
    if (this.score?.skippedSections?.includes(section)) {
      return html`<span class="skipped-label">Skipped</span>`;
    }
    return value.toFixed(2);
  }

  private formatSkippedSections(): string {
    if (!this.score?.skippedSections || this.score.skippedSections.length === 0) {
      return 'the remaining';
    }
    return this.score.skippedSections
      .map((section) => section.charAt(0).toUpperCase() + section.slice(1))
      .join(', ');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-results-screen': IceResultsScreen;
  }
}
