import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../../styles/output.css?inline";

@customElement("my-table-head")
export class TableHead extends LitElement {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: table-header-group;
      }
      thead {
        width: 100%;
      }
    `,
  ];

  render() {
    return html`
      <thead class="bg-gray-50 border-b border-gray-300">
        <slot></slot>
      </thead>
    `;
  }
}
