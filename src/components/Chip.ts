import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../styles/output.css?inline";

@customElement("my-chip")
export class Chip extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String }) label = "";
  @property({ type: String }) color = "default";
  @property({ type: Boolean }) outlined = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) deletable = false;
  @property({ type: String }) size = "medium";
  @property({ type: String }) icon = "";

  private handleDelete(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent("delete"));
  }

  private handleClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent("click"));
    }
  }

  render() {
    const baseClasses = `inline-flex items-center rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      this.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
    }`;
    
    const sizeClasses = {
      small: "px-2 py-1 text-xs",
      medium: "px-4 py-1.5 text-sm",
      large: "px-5 py-2 text-base",
    }[this.size || "medium"];

    const colorClasses = {
      default: this.outlined
        ? "bg-white text-gray-700 border border-gray-300"
        : "bg-gray-100 text-gray-700",
      primary: this.outlined
        ? "bg-white text-blue-700 border border-blue-700"
        : "bg-blue-100 text-blue-700",
      secondary: this.outlined
        ? "bg-white text-purple-700 border border-purple-700"
        : "bg-purple-100 text-purple-700",
      success: this.outlined
        ? "bg-white text-green-700 border border-green-700"
        : "bg-green-100 text-green-700",
      error: this.outlined
        ? "bg-white text-red-700 border border-red-700"
        : "bg-red-100 text-red-700",
    }[this.color || "default"];

    const classes = `${baseClasses} ${sizeClasses} ${colorClasses}`;

    return html`
      <span
        class=${classes}
        @click=${this.handleClick}
        role="button"
        tabindex="${this.disabled ? -1 : 0}"
        aria-disabled="${this.disabled}"
      >
        ${this.icon ? html`<span class="mr-2">${this.icon}</span>` : ""}
        ${this.label}
        ${this.deletable
          ? html`
              <button
                class="ml-2 focus:outline-none"
                @click=${this.handleDelete}
                aria-label="Remove"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            `
          : ""}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-chip": Chip;
  }
}