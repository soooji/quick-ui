import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../../styles/output.css?inline";

@customElement("my-table-cell")
export class TableCell extends LitElement {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: contents;
      }
      th,
      td {
        display: table-cell;
      }
    `,
  ];

  @property({ type: Boolean }) header = false;
  @property({ type: String }) align: "left" | "center" | "right" = "left";

  render() {
    const classes = `px-6 py-4 whitespace-nowrap text-${this.align} border-b border-gray-200`;
    const headerClasses = "font-medium text-gray-900 bg-gray-50";
    const cellClasses = "text-gray-500";

    if (this.header) {
      return html`
        <th class="${classes} ${headerClasses}">
          <slot></slot>
        </th>
      `;
    }

    return html`
      <td class="${classes} ${cellClasses}">
        <slot></slot>
      </td>
    `;
  }
}
