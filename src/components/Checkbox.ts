import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../styles/output.css?inline";

@customElement("my-checkbox")
export class Checkbox extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String }) value = "";
  @property({ type: String }) name = "";
  @property({ type: String }) label = "";
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;

  private handleChange() {
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent("change", { detail: { checked: this.checked, value: this.value } })
    );
  }

  render() {
    return html`
      <label class="flex items-center cursor-pointer">
        <input
          type="checkbox"
          class="hidden"
          .value=${this.value}
          .name=${this.name}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.handleChange}
        />
        <span class="w-4 h-4 border border-gray-300 rounded mr-2 flex items-center justify-center ${this.checked ? 'bg-blue-500 border-blue-500' : 'bg-white'}">
          ${this.checked ? html`<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>` : ''}
        </span>
        <span class="text-sm ${this.disabled ? 'text-gray-400' : 'text-gray-700'}">${this.label}</span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-checkbox": Checkbox;
  }
}