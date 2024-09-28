import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';
import styles from "../styles/output.css?inline";

@customElement('my-form-field')
export class FormField extends LitElement {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: block;
      }
      .helper-text {
        display: flex;
        align-items: center;
      }
      .helper-text svg {
        flex-shrink: 0;
      }
    `
  ];

  @property({ type: String }) label = '';
  @property({ type: String }) helperText = '';
  @property({ type: Boolean }) error = false;

  render() {
    const helperTextClasses = `
      mt-1 text-xs flex items-center
      ${this.error ? 'text-red-500' : 'text-gray-500'}
    `;

    return html`
      <div>
        <slot></slot>
        ${this.helperText ? html`
          <div class="${helperTextClasses}">
            ${this.error ? html`
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            ` : ''}
            <span class="ml-1">${this.helperText}</span>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-form-field': FormField;
  }
}