import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import './ice-toast';
import type { Toast } from './ice-toast';

@customElement('ice-toast-container')
export class IceToastContainer extends LitElement {
  @state() private toasts: Toast[] = [];

  static styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 10000;
      pointer-events: none;
    }

    .toast-stack {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 2rem;
      pointer-events: auto;
    }

    @media (max-width: 640px) {
      .toast-stack {
        padding: 1rem;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    appStore.subscribe((state) => {
      this.toasts = state.toasts || [];
    });
  }

  render() {
    if (this.toasts.length === 0) {
      return html``;
    }

    return html`
      <div class="toast-stack">
        ${this.toasts.map(
          (toast) => html`
            <ice-toast
              .toast=${toast}
              @close=${() => this.handleClose(toast.id)}
            ></ice-toast>
          `
        )}
      </div>
    `;
  }

  private handleClose(id: string) {
    appStore.removeToast(id);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-toast-container': IceToastContainer;
  }
}
