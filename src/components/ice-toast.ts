import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

@customElement('ice-toast')
export class IceToast extends LitElement {
  @property({ type: Object }) toast!: Toast;

  static styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
      min-width: 300px;
      max-width: 500px;
      border-left: 4px solid;
    }

    .toast.success {
      border-left-color: #10b981;
    }

    .toast.error {
      border-left-color: #ef4444;
    }

    .toast.info {
      border-left-color: #3b82f6;
    }

    .toast.warning {
      border-left-color: #f59e0b;
    }

    .toast-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .toast-message {
      flex: 1;
      color: #1f2937;
      font-size: 0.875rem;
      line-height: 1.4;
    }

    .toast-close {
      background: none;
      border: none;
      color: #6b7280;
      font-size: 1.25rem;
      cursor: pointer;
      padding: 0.25rem;
      line-height: 1;
      flex-shrink: 0;
    }

    .toast-close:hover {
      color: #1f2937;
    }

    @media (max-width: 640px) {
      :host {
        bottom: 1rem;
        right: 1rem;
        left: 1rem;
      }

      .toast {
        min-width: auto;
      }
    }
  `;

  render() {
    const iconMap = {
      success: '✅',
      error: '❌',
      info: 'ℹ️',
      warning: '⚠️',
    };

    return html`
      <div class="toast ${this.toast.type}">
        <div class="toast-icon">${iconMap[this.toast.type]}</div>
        <div class="toast-message">${this.toast.message}</div>
        <button
          class="toast-close"
          @click=${this.handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    `;
  }

  private handleClose() {
    this.dispatchEvent(new CustomEvent('close', { detail: this.toast.id }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-toast': IceToast;
  }
}
