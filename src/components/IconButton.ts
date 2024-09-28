import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../styles/output.css?inline";

@customElement("my-icon-button")
export class IconButton extends LitElement {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  @property({ type: String }) color: "primary" | "secondary" | "default" = "default";
  @property({ type: String }) size: "small" | "medium" | "large" = "medium";
  @property({ type: Boolean }) disabled = false;
  @property() icon: string | TemplateResult = ""; // Updated type

  private getClasses() {
    const baseClasses =
      "rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center";
    const sizeClasses = {
      small: "p-1 w-8 h-8",
      medium: "p-2 w-10 h-10",
      large: "p-3 w-12 h-12",
    };
    const colorClasses = {
      primary: "text-blue-600 hover:bg-blue-100 focus:ring-blue-500",
      secondary: "text-green-600 hover:bg-green-100 focus:ring-green-500",
      default: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
    };

    return `${baseClasses} ${sizeClasses[this.size]} ${colorClasses[this.color]}`;
  }

  render() {
    const classes = `${this.getClasses()} ${this.disabled ? "opacity-50 cursor-not-allowed" : ""}`;

    return html`
      <button class=${classes} ?disabled=${this.disabled}>
        ${typeof this.icon === "string" ? html`${this.icon}` : this.icon}
      </button>
    `;
  }
}
