import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { appStore } from "../store/store";
import { isSupabaseConfigured } from "../lib/supabase";
import "./ice-illustration";

@customElement("ice-landing-page")
export class IceLandingPage extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .landing-container {
            display: grid;
            grid-template-columns: minmax(240px, 360px) 1fr;
            align-items: center;
            gap: 1.5rem;
        }

        h1 {
            font-size: 2rem;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 0.75rem 0;
        }

        .subtitle {
            font-size: 1rem;
            color: #6b7280;
            max-width: 500px;
            line-height: 1.4;
            margin: 0 0 1rem 0;
        }

        .methodology {
            background: #f3f4f6;
            border-radius: 0.5rem;
            padding: 1rem;
            margin: 0;
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

        .cta-row {
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
        }

        .cta-button {
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 0.75rem 1.5rem;
            font-size: 0.95rem;
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

        @media (max-width: 900px) {
            .landing-container {
                grid-template-columns: 1fr;
                text-align: center;
            }

            .methodology {
                text-align: left;
            }

            .cta-row {
                justify-content: center;
            }
        }

        @media (max-width: 640px) {
            h1 {
                font-size: 1.875rem;
            }

            .subtitle {
                font-size: 1rem;
            }

            .cta-row {
                flex-direction: column;
            }

            .cta-button {
                width: 100%;
            }
        }
    `;

    render() {
        return html`
            <div class="landing-container">
                <ice-illustration
                    type="landing"
                    width="320"
                    height="260"
                ></ice-illustration>

                <div>
                    <h1>Welcome to ICEberg</h1>

                    <p class="subtitle">
                        Make better prioritization decisions with a structured
                        approach to scoring your product features.
                    </p>

                    <div class="methodology">
                        <h3>What is ICE Scoring?</h3>
                        <div class="methodology-grid">
                            <div class="methodology-item">
                                <span class="methodology-label">Impact:</span>
                                <span class="methodology-desc"
                                    >How much will this feature move the
                                    needle?</span
                                >
                            </div>
                            <div class="methodology-item">
                                <span class="methodology-label"
                                    >Confidence:</span
                                >
                                <span class="methodology-desc"
                                    >How sure are we that this will work?</span
                                >
                            </div>
                            <div class="methodology-item">
                                <span class="methodology-label">Effort:</span>
                                <span class="methodology-desc"
                                    >How much work will this require?</span
                                >
                            </div>
                        </div>
                    </div>

                    <div class="cta-row">
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
                            style="background: #10b981;"
                        >
                            Bulk Upload
                        </button>
                    </div>
                </div>

                ${isSupabaseConfigured
                    ? html`
                          <div
                              style="grid-column: 1 / -1; margin-top: 1rem; border-top: 2px solid #e5e7eb; padding-top: 1rem; width: 100%;"
                          >
                              <h3
                                  style="font-size: 1.25rem; font-weight: 600; color: #374151; margin-bottom: 1rem;"
                              >
                                  Collaborative Scoring
                              </h3>
                              <p
                                  style="color: #6b7280; margin-bottom: 1rem; max-width: 500px; margin-left: auto; margin-right: auto;"
                              >
                                  Create sessions for multiple team members to
                                  score the same features and analyze consensus
                              </p>
                              <div
                                  style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;"
                              >
                                  <button
                                      class="cta-button"
                                      @click=${this.handleCreateSession}
                                      style="background: #8b5cf6;"
                                  >
                                      Create New Session
                                  </button>
                                  <button
                                      class="cta-button"
                                      @click=${this.handleViewSessions}
                                      style="background: white; color: #8b5cf6; border: 2px solid #8b5cf6;"
                                  >
                                      View Existing Sessions
                                  </button>
                              </div>
                          </div>
                      `
                    : ""}
            </div>
        `;
    }

    private handleStart() {
        appStore.setStep("feature-input");
    }

    private handleBulkUpload() {
        appStore.setStep("batch-upload");
    }

    private handleCreateSession() {
        appStore.setStep("session-create");
    }

    private handleViewSessions() {
        appStore.setStep("session-list");
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ice-landing-page": IceLandingPage;
    }
}
