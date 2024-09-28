import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../../styles/output.css?inline";

@customElement("my-table-body")
export class TableBody extends LitElement {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: table-row-group;
      }
      tbody {
        width: 100%;
      }
    `,
  ];

  render() {
    return html`
      <tbody class="bg-white divide-y divide-gray-200">
        <slot></slot>
      </tbody>
    `;
  }
}
