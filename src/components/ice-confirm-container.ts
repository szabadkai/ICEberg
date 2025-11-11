import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { appStore } from '../store/store';
import './ice-confirm-dialog';
import type { ConfirmDialog } from '../types';

@customElement('ice-confirm-container')
export class IceConfirmContainer extends LitElement {
  @state() private dialog?: ConfirmDialog;

  static styles = css`
    :host {
      display: block;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    appStore.subscribe((state) => {
      this.dialog = state.confirmDialog;
    });
  }

  render() {
    if (!this.dialog) {
      return html``;
    }

    return html`
      <ice-confirm-dialog
        .dialog=${this.dialog}
        @confirm=${this.handleConfirm}
      ></ice-confirm-dialog>
    `;
  }

  private handleConfirm(e: CustomEvent) {
    const { id, confirmed } = e.detail;
    appStore.handleConfirmResponse(id, confirmed);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-confirm-container': IceConfirmContainer;
  }
}
