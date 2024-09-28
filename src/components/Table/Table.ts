import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../../styles/output.css?inline";

@customElement("my-table")
export class Table extends LitElement {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: block;
        width: 100%;
      }
      .table-container {
        width: 100%;
        overflow-x: auto;
      }
      table {
        border-collapse: separate;
        border-spacing: 0;
        width: 100%;
      }
    `,
  ];

  @property({ type: String }) size: "small" | "medium" = "medium";

  render() {
    const classes = `${
      this.size === "small" ? "text-sm" : "text-base"
    } border border-gray-300 rounded-md shadow-sm overflow-hidden w-full table`;

    return html`
      <div class="${classes} table-container">
        <table>
          <slot></slot>
        </table>
      </div>
    `;
  }
}
