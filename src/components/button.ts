import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../styles/output.css?inline";

@customElement("my-button")
export class Button extends LitElement {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: inline-block;
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .start-icon {
        margin-right: 0.5rem;
      }
      .end-icon {
        margin-left: 0.5rem;
      }
    `,
  ];

  @property({ type: String }) variant: "text" | "contained" | "outlined" = "contained";
  @property({ type: String }) color: "primary" | "secondary" | "default" = "primary";
  @property({ type: String }) size: "small" | "medium" | "large" = "medium";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) fullWidth = false;
  @property() startIcon: string | TemplateResult = "";
  @property() endIcon: string | TemplateResult = "";

  private getVariantClasses() {
    const baseClasses = "rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
    const sizeClasses = {
      small: "px-2.5 py-1.5 text-xs",
      medium: "px-4 py-2 text-sm",
      large: "px-6 py-3 text-base",
    };
    const variantClasses = {
      text: {
        primary: "text-blue-600 hover:bg-blue-100 focus:ring-blue-500",
        secondary: "text-green-600 hover:bg-green-100 focus:ring-green-500",
        default: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
      },
      contained: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
        default: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
      },
      outlined: {
        primary: "border border-blue-600 text-blue-600 hover:bg-blue-100 focus:ring-blue-500",
        secondary: "border border-green-600 text-green-600 hover:bg-green-100 focus:ring-green-500",
        default: "border border-gray-600 text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
      },
    };

    return `${baseClasses} ${sizeClasses[this.size]} ${variantClasses[this.variant][this.color]}`;
  }

  private renderIcon(icon: string | TemplateResult, className: string) {
    return html`
      <span class="icon ${className}"> ${typeof icon === "string" ? html`${icon}` : icon} </span>
    `;
  }

  render() {
    const classes = `${this.getVariantClasses()} ${this.fullWidth ? "w-full" : ""} ${
      this.disabled ? "opacity-50 cursor-not-allowed" : ""
    }`;

    return html`
      <button class=${classes} ?disabled=${this.disabled}>
        ${this.startIcon ? this.renderIcon(this.startIcon, "start-icon") : ""}
        <span><slot></slot></span>
        ${this.endIcon ? this.renderIcon(this.endIcon, "end-icon") : ""}
      </button>
    `;
  }
}
