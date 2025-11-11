import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface ConfirmDialog {
  id: string;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

@customElement('ice-confirm-dialog')
export class IceConfirmDialog extends LitElement {
  @property({ type: Object }) dialog!: ConfirmDialog;

  static styles = css`
    :host {
      display: block;
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 1rem;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .dialog {
      background: white;
      border-radius: 0.75rem;
      max-width: 400px;
      width: 100%;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
      animation: slideUp 0.2s ease-out;
    }

    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .dialog-header {
      padding: 1.5rem 1.5rem 1rem 1.5rem;
    }

    .dialog-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    .dialog-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 0.5rem 0;
      text-align: center;
    }

    .dialog-body {
      padding: 0 1.5rem 1.5rem 1.5rem;
    }

    .dialog-message {
      color: #6b7280;
      font-size: 0.875rem;
      line-height: 1.5;
      text-align: center;
    }

    .dialog-footer {
      padding: 1rem 1.5rem 1.5rem 1.5rem;
      display: flex;
      gap: 0.75rem;
      justify-content: center;
    }

    button {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      flex: 1;
    }

    .btn-confirm {
      background: #ef4444;
      color: white;
    }

    .btn-confirm:hover {
      background: #dc2626;
    }

    .btn-confirm.warning {
      background: #f59e0b;
    }

    .btn-confirm.warning:hover {
      background: #d97706;
    }

    .btn-confirm.info {
      background: #3b82f6;
    }

    .btn-confirm.info:hover {
      background: #2563eb;
    }

    .btn-cancel {
      background: white;
      color: #6b7280;
      border: 2px solid #d1d5db;
    }

    .btn-cancel:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    @media (max-width: 640px) {
      .dialog-footer {
        flex-direction: column-reverse;
      }

      button {
        width: 100%;
      }
    }
  `;

  render() {
    const iconMap = {
      danger: '⚠️',
      warning: '⚠️',
      info: 'ℹ️',
    };

    const type = this.dialog.type || 'danger';
    const confirmText = this.dialog.confirmText || 'Confirm';
    const cancelText = this.dialog.cancelText || 'Cancel';

    return html`
      <div class="overlay" @click=${this.handleOverlayClick}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <div class="dialog-header">
            <div class="dialog-icon">${iconMap[type]}</div>
            <h3 class="dialog-title">${this.dialog.title}</h3>
          </div>
          <div class="dialog-body">
            <p class="dialog-message">${this.dialog.message}</p>
          </div>
          <div class="dialog-footer">
            <button class="btn-cancel" @click=${this.handleCancel}>
              ${cancelText}
            </button>
            <button class="btn-confirm ${type}" @click=${this.handleConfirm}>
              ${confirmText}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private handleOverlayClick() {
    this.handleCancel();
  }

  private handleConfirm() {
    this.dispatchEvent(
      new CustomEvent('confirm', {
        detail: { id: this.dialog.id, confirmed: true },
      })
    );
  }

  private handleCancel() {
    this.dispatchEvent(
      new CustomEvent('confirm', {
        detail: { id: this.dialog.id, confirmed: false },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-confirm-dialog': IceConfirmDialog;
  }
}
