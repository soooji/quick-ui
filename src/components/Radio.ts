import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../styles/output.css?inline";

@customElement("my-radio")
export class Radio extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String }) value = "";
  @property({ type: String }) name = "";
  @property({ type: String }) label = "";
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;

  private handleChange() {
    this.checked = true;
    this.dispatchEvent(
      new CustomEvent("change", { detail: { checked: this.checked, value: this.value } })
    );
  }

  render() {
    return html`
      <label class="flex items-center cursor-pointer">
        <input
          type="radio"
          class="hidden"
          .value=${this.value}
          .name=${this.name}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.handleChange}
        />
        <span class="w-4 h-4 border border-gray-300 rounded-full mr-2 flex items-center justify-center ${this.checked ? 'bg-blue-500 border-blue-500' : 'bg-white'}">
          ${this.checked ? html`<span class="w-2 h-2 bg-white rounded-full"></span>` : ''}
        </span>
        <span class="text-sm ${this.disabled ? 'text-gray-400' : 'text-gray-700'}">${this.label}</span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-radio": Radio;
  }
}