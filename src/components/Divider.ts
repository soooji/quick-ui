import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../styles/output.css?inline";

@customElement("my-divider")
export class Divider extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String }) variant: "horizontal" | "vertical" = "horizontal";
  @property({ type: String }) color: "light" | "medium" | "dark" = "medium";
  @property({ type: String }) label = "";
  @property({ type: Boolean }) dashed = false;

  render() {
    const isVertical = this.variant === "vertical";
    const colorClasses = {
      light: "border-gray-200",
      medium: "border-gray-300",
      dark: "border-gray-400",
    };

    const dividerClasses = `
      ${isVertical ? "h-full border-l" : "w-full border-t"}
      ${this.dashed ? "border-dashed" : "border-solid"}
      ${colorClasses[this.color]}
    `;

    if (this.label) {
      return html`
        <div class="flex items-center ${isVertical ? "flex-col h-full" : ""}">
          <div class="${dividerClasses} flex-grow"></div>
          <span
            class="px-3 text-sm text-gray-500 ${isVertical ? "py-3 writing-mode-vertical-lr" : ""}"
          >
            ${this.label}
          </span>
          <div class="${dividerClasses} flex-grow"></div>
        </div>
      `;
    }

    return html`<div class="${dividerClasses}"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-divider": Divider;
  }
}
