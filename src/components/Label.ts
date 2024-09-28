import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';
import styles from "../styles/output.css?inline";

@customElement('my-label')
export class Label extends LitElement {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: block;
      }
    `
  ];

  @property({ type: String }) text = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) error = false;

  render() {
    const labelClasses = `
      absolute left-3 top-[7px] text-[11px] font-medium
      pointer-events-none truncate max-w-[calc(100%-24px)]
      ${this.error ? "text-red-500" : "text-gray-500"}
      ${this.disabled ? "text-gray-400" : ""}
    `;

    return html`
      <label class=${labelClasses}>${this.text}</label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-label': Label;
  }
}