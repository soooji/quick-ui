import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../styles/output.css?inline";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "overline";

@customElement("my-typography")
export class Typography extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String }) variant: TypographyVariant = "body1";
  @property({ type: String }) component: string = "p";
  @property({ type: Boolean }) gutterBottom = false;
  @property({ type: Boolean }) noWrap = false;
  @property({ type: String }) align: "inherit" | "left" | "center" | "right" | "justify" =
    "inherit";
  @property({ type: String }) color: string = "inherit";

  render() {
    const classes = this.getClasses();
    return this.renderTag(this.component, classes, html`<slot></slot>`);
  }

  private renderTag(tag: string, classes: string, content: TemplateResult): TemplateResult {
    switch (tag) {
      case "h1":
        return html`<h1 class=${classes}>${content}</h1>`;
      case "h2":
        return html`<h2 class=${classes}>${content}</h2>`;
      case "h3":
        return html`<h3 class=${classes}>${content}</h3>`;
      case "h4":
        return html`<h4 class=${classes}>${content}</h4>`;
      case "h5":
        return html`<h5 class=${classes}>${content}</h5>`;
      case "h6":
        return html`<h6 class=${classes}>${content}</h6>`;
      case "span":
        return html`<span class=${classes}>${content}</span>`;
      default:
        return html`<p class=${classes}>${content}</p>`;
    }
  }

  private getClasses(): string {
    const variantClasses = {
      h1: "text-5xl font-light leading-tight",
      h2: "text-4xl font-light leading-tight",
      h3: "text-3xl font-normal leading-snug",
      h4: "text-2xl font-normal leading-snug",
      h5: "text-xl font-medium leading-snug",
      h6: "text-base font-medium leading-relaxed",
      subtitle1: "text-base font-normal leading-relaxed",
      subtitle2: "text-sm font-medium leading-relaxed",
      body1: "text-base font-normal leading-relaxed",
      body2: "text-sm font-normal leading-relaxed",
      button: "text-sm font-medium leading-normal uppercase",
      caption: "text-xs font-normal leading-normal",
      overline: "text-xs font-medium leading-normal uppercase tracking-wider",
    };

    const alignClasses = {
      inherit: "",
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    };

    const colorClasses = {
      inherit: "text-inherit",
      primary: "text-blue-600",
      secondary: "text-purple-600",
      error: "text-red-600",
      warning: "text-yellow-600",
      info: "text-cyan-600",
      success: "text-green-600",
    };

    return `
      ${variantClasses[this.variant]}
      ${alignClasses[this.align]}
      ${colorClasses[this.color as keyof typeof colorClasses] || `text-${this.color}`}
      ${this.gutterBottom ? "mb-4" : ""}
      ${this.noWrap ? "whitespace-nowrap overflow-hidden text-ellipsis" : ""}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-typography": Typography;
  }
}
