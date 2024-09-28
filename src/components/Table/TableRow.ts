import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../../styles/output.css?inline";

@customElement("my-table-row")
export class TableRow extends LitElement {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: table-row;
        width: 100%;
      }
    `,
  ];

  @property({ type: Boolean }) hover = false;

  render() {
    const classes = this.hover ? "hover:bg-gray-50" : "";

    return html`
      <tr class="${classes}">
        <slot></slot>
      </tr>
    `;
  }
}
