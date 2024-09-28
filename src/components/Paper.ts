import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../styles/output.css?inline";

@customElement("my-paper")
export class Paper extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: Number }) elevation: 0 | 1 | 2 | 3 | 4 | 5 = 1;
  @property({ type: String }) variant: "outlined" | "elevation" = "elevation";
  @property({ type: String }) rounded: "none" | "sm" | "md" | "lg" | "xl" | "t-md" | "b-md" = "md";
  @property({ type: String }) padding: "none" | "sm" | "md" | "lg" | "xl" = "md";

  render() {
    const elevationClasses = {
      0: "",
      1: "shadow-sm",
      2: "shadow",
      3: "shadow-md",
      4: "shadow-lg",
      5: "shadow-xl",
    };

    const roundedClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "t-md": "rounded-t",
      "b-md": "rounded-b",
    };

    const paddingClasses = {
      none: "p-0",
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    };

    const classes = `
      ${this.variant === "outlined" ? "border border-gray-300" : elevationClasses[this.elevation]}
      ${roundedClasses[this.rounded]}
      ${paddingClasses[this.padding]}
      bg-white
    `;

    return html`
      <div class=${classes}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-paper": Paper;
  }
}
