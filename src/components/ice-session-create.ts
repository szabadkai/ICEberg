import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';

@customElement('ice-session-create')
export class IceSessionCreate extends LitElement {
  @state() private sessionName = '';
  @state() private sessionDescription = '';
  @state() private createdBy = '';
  @state() private aggregationMethod: 'mean' | 'median' | 'weighted' | 'trimmed' = 'mean';
  @state() private isCreating = false;

  static styles = css`
    :host {
      display: block;
      max-width: 600px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #6b7280;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .label-optional {
      font-weight: 400;
      color: #9ca3af;
      font-size: 0.875rem;
    }

    input,
    textarea,
    select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    input:focus,
    textarea:focus,
    select:focus {
      outline: none;
      border-color: #3b82f6;
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }

    .help-text {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 0.5rem;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn {
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
    }

    .btn-primary:hover:not(:disabled) {
      background: #2563eb;
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: white;
      color: #6b7280;
      border: 2px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #f9fafb;
    }

    .aggregation-info {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-top: 0.5rem;
    }

    .aggregation-info h4 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #1e40af;
      margin: 0 0 0.5rem 0;
    }

    .aggregation-info p {
      font-size: 0.875rem;
      color: #1e40af;
      margin: 0;
    }

    @media (max-width: 768px) {
      .button-group {
        flex-direction: column;
      }
    }
  `;

  render() {
    const canCreate = this.sessionName.trim() && this.createdBy.trim();

    return html`
      <h2>Create Collaborative Session</h2>
      <p class="subtitle">
        Set up a scoring session where multiple team members can score the same features
      </p>

      <form @submit=${this.handleSubmit}>
        <div class="form-group">
          <label for="session-name">
            Session Name
          </label>
          <input
            id="session-name"
            type="text"
            placeholder="e.g., Q1 2025 Product Roadmap"
            .value=${this.sessionName}
            @input=${(e: Event) => (this.sessionName = (e.target as HTMLInputElement).value)}
            required
          />
        </div>

        <div class="form-group">
          <label for="created-by">
            Your Name
          </label>
          <input
            id="created-by"
            type="text"
            placeholder="e.g., Jane Smith"
            .value=${this.createdBy}
            @input=${(e: Event) => (this.createdBy = (e.target as HTMLInputElement).value)}
            required
          />
          <p class="help-text">This will be used to identify your scores in the session</p>
        </div>

        <div class="form-group">
          <label for="session-description">
            Description <span class="label-optional">(optional)</span>
          </label>
          <textarea
            id="session-description"
            placeholder="Briefly describe what this scoring session is for..."
            .value=${this.sessionDescription}
            @input=${(e: Event) => (this.sessionDescription = (e.target as HTMLTextAreaElement).value)}
          ></textarea>
        </div>

        <div class="form-group">
          <label for="aggregation-method">
            Aggregation Method
          </label>
          <select
            id="aggregation-method"
            .value=${this.aggregationMethod}
            @change=${(e: Event) => (this.aggregationMethod = (e.target as HTMLSelectElement).value as any)}
          >
            <option value="mean">Mean (Average)</option>
            <option value="median">Median</option>
            <option value="weighted">Weighted Average</option>
            <option value="trimmed">Trimmed Mean</option>
          </select>
          ${this.renderAggregationInfo()}
        </div>

        <div class="button-group">
          <button
            type="button"
            class="btn btn-secondary"
            @click=${this.handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            ?disabled=${!canCreate || this.isCreating}
          >
            ${this.isCreating ? 'Creating...' : 'Create Session'}
          </button>
        </div>
      </form>
    `;
  }

  private renderAggregationInfo() {
    const info: Record<string, { title: string; description: string }> = {
      mean: {
        title: 'Mean (Average)',
        description: 'Simple average of all scores. Best for most use cases.',
      },
      median: {
        title: 'Median',
        description: 'Middle value when sorted. Resistant to outliers.',
      },
      weighted: {
        title: 'Weighted Average',
        description: 'Weights scores based on confidence levels.',
      },
      trimmed: {
        title: 'Trimmed Mean',
        description: 'Excludes highest and lowest scores before averaging.',
      },
    };

    const current = info[this.aggregationMethod];

    return html`
      <div class="aggregation-info">
        <h4>${current.title}</h4>
        <p>${current.description}</p>
      </div>
    `;
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();

    if (!this.sessionName.trim() || !this.createdBy.trim()) return;

    this.isCreating = true;

    const session = await appStore.createSession(
      this.sessionName.trim(),
      this.createdBy.trim(),
      this.sessionDescription.trim() || undefined,
      this.aggregationMethod
    );

    this.isCreating = false;

    if (session) {
      // Go to batch upload to add features to the session
      appStore.setStep('batch-upload');
    }
  }

  private handleCancel() {
    appStore.setStep('landing');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-session-create': IceSessionCreate;
  }
}
