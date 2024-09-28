import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';
import styles from "../styles/output.css?inline";

@customElement('my-menu-item')
export class MenuItem extends LitElement {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: block;
      }
    `
  ];

  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) multiple = false;

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('select', { 
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const itemClasses = `
      menu-item px-3 py-2 hover:bg-blue-100 cursor-pointer flex items-center justify-between text-[13px]
      ${this.selected ? "bg-blue-50" : ""}
    `;

    return html`
      <div class=${itemClasses} @click=${this._handleClick}>
        <span>${this.label}</span>
        ${this.selected
          ? html`
              <svg
                class="h-4 w-4 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clip-rule="evenodd"
                />
              </svg>
            `
          : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-menu-item': MenuItem;
  }
}