import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import Papa from 'papaparse';
import { appStore } from '../store/store';
import { FeatureToScore } from '../types';

@customElement('ice-bulk-upload')
export class IceBulkUpload extends LitElement {
  @state() private dragActive = false;
  @state() private uploading = false;
  @state() private error = '';
  @state() private scoredBy = 'PM';

  static styles = css`
    :host {
      display: block;
    }

    .upload-container {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .description {
      color: #6b7280;
      font-size: 1rem;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .scorer-input {
      margin-bottom: 2rem;
    }

    .scorer-input label {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
      text-align: left;
    }

    .scorer-input input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
    }

    .scorer-input input:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .upload-zone {
      border: 3px dashed #d1d5db;
      border-radius: 1rem;
      padding: 3rem 2rem;
      background: white;
      transition: all 0.3s;
      cursor: pointer;
      margin-bottom: 2rem;
    }

    .upload-zone:hover,
    .upload-zone.drag-active {
      border-color: #3b82f6;
      background: #eff6ff;
    }

    .upload-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .upload-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .upload-hint {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .file-input {
      display: none;
    }

    .btn {
      padding: 0.75rem 1.5rem;
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

    .btn-secondary {
      background: white;
      color: #6b7280;
      border: 2px solid #d1d5db;
      margin-left: 1rem;
    }

    .btn-secondary:hover {
      background: #f9fafb;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .error {
      background: #fef2f2;
      border: 2px solid #ef4444;
      color: #dc2626;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }

    .format-example {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 1.5rem;
      text-align: left;
      margin-bottom: 2rem;
    }

    .format-example h3 {
      font-size: 1rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.75rem;
    }

    .format-example code {
      display: block;
      background: white;
      padding: 0.75rem;
      border-radius: 0.375rem;
      font-family: monospace;
      font-size: 0.875rem;
      color: #374151;
      margin-bottom: 0.5rem;
      overflow-x: auto;
    }

    .format-example p {
      color: #6b7280;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .button-group {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    @media (max-width: 768px) {
      .upload-container {
        padding: 1rem;
      }

      .upload-zone {
        padding: 2rem 1rem;
      }

      .button-group {
        flex-direction: column;
      }

      .btn-secondary {
        margin-left: 0;
        margin-top: 1rem;
      }
    }
  `;

  render() {
    return html`
      <div class="upload-container">
        <h2>Bulk Upload Features</h2>
        <p class="description">
          Upload a CSV file with multiple features to score them in batch mode.
        </p>

        ${this.error ? html`<div class="error">${this.error}</div>` : ''}

        <div class="scorer-input">
          <label for="scorer">Who's scoring?</label>
          <input
            id="scorer"
            type="text"
            placeholder="Enter your name or team"
            .value=${this.scoredBy}
            @input=${this.handleScorerInput}
            maxlength="50"
          />
        </div>

        <div
          class="upload-zone ${this.dragActive ? 'drag-active' : ''}"
          @click=${this.handleZoneClick}
          @dragover=${this.handleDragOver}
          @dragleave=${this.handleDragLeave}
          @drop=${this.handleDrop}
        >
          <div class="upload-icon">📁</div>
          <div class="upload-title">
            ${this.uploading ? 'Processing...' : 'Drop CSV file here'}
          </div>
          <div class="upload-hint">or click to browse</div>
          <input
            type="file"
            accept=".csv"
            class="file-input"
            @change=${this.handleFileSelect}
            ?disabled=${this.uploading}
          />
        </div>

        <div class="format-example">
          <h3>CSV Format Example:</h3>
          <code>name,description</code>
          <code>"Dark Mode Toggle","Add dark theme option to settings"</code>
          <code>"Export to PDF","Allow users to export reports as PDF"</code>
          <p>
            <strong>Required:</strong> "name" column<br />
            <strong>Optional:</strong> "description" column for additional context
          </p>
        </div>

        <div class="button-group">
          <button class="btn btn-secondary" @click=${this.handleBack}>
            Back to Home
          </button>
        </div>
      </div>
    `;
  }

  private handleScorerInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.scoredBy = input.value || 'PM';
  }

  private handleZoneClick() {
    if (this.uploading) return;
    const input = this.shadowRoot?.querySelector('.file-input') as HTMLInputElement;
    input?.click();
  }

  private handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.dragActive = true;
  }

  private handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.dragActive = false;
  }

  private handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.dragActive = false;

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  private handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  private processFile(file: File) {
    this.error = '';

    if (!file.name.endsWith('.csv')) {
      this.error = 'Please upload a CSV file';
      return;
    }

    if (!this.scoredBy.trim()) {
      this.error = 'Please enter your name before uploading';
      return;
    }

    this.uploading = true;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        this.handleParseComplete(results);
      },
      error: (error) => {
        this.error = `Failed to parse CSV: ${error.message}`;
        this.uploading = false;
      },
    });
  }

  private async handleParseComplete(results: Papa.ParseResult<any>) {
    this.uploading = false;

    if (!results.data || results.data.length === 0) {
      this.error = 'CSV file is empty';
      return;
    }

    // Validate CSV has required columns
    const firstRow = results.data[0];
    if (!firstRow.name && !firstRow.Name) {
      this.error = 'CSV must have a "name" column';
      return;
    }

    const state = appStore.getState();
    const currentSession = state.currentSession;

    // Check if we're in a collaborative session context
    if (currentSession) {
      // Add features to the session
      const featuresToAdd = results.data
        .map((row: any) => ({
          name: (row.name || row.Name || '').trim(),
          description: (row.description || row.Description || '').trim() || undefined,
        }))
        .filter((f) => f.name.length > 0);

      if (featuresToAdd.length === 0) {
        this.error = 'No valid features found in CSV';
        return;
      }

      this.uploading = true;
      const addedFeatures = await appStore.addFeaturesToSession(currentSession.id, featuresToAdd);
      this.uploading = false;

      if (addedFeatures.length > 0) {
        // Navigate to session dashboard to start scoring
        appStore.setStep('session-dashboard');
      }
    } else {
      // Regular batch scoring (non-session mode)
      const features: FeatureToScore[] = results.data
        .map((row: any, index: number) => ({
          id: `batch-${Date.now()}-${index}`,
          name: (row.name || row.Name || '').trim(),
          description: (row.description || row.Description || '').trim() || undefined,
          status: 'pending' as const,
        }))
        .filter((f) => f.name.length > 0); // Filter out empty rows

      if (features.length === 0) {
        this.error = 'No valid features found in CSV';
        return;
      }

      // Start batch scoring
      appStore.startBatchScoring(features, this.scoredBy.trim());
    }
  }

  private handleBack() {
    appStore.setStep('landing');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-bulk-upload': IceBulkUpload;
  }
}
