import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../styles/output.css?inline";

@customElement("my-menu")
export class Menu extends LitElement {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: block;
        position: absolute;
        z-index: 1000;
      }
    `,
  ];

  @property({ type: Array }) items: { value: string; label: string }[] = [];
  @property({ type: Array }) selectedValues: string[] = [];
  @property({ type: Boolean }) multiple: boolean = false;
  @property({ type: Object }) anchorEl: HTMLElement | null = null;

  firstUpdated() {
    this.updatePosition();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("anchorEl")) {
      this.updatePosition();
    }
  }

  private updatePosition() {
    if (this.anchorEl) {
      const rect = this.anchorEl.getBoundingClientRect();
      this.style.position = "fixed";
      this.style.top = `${rect.bottom + 4}px`;
      this.style.left = `${rect.left}px`;
      this.style.width = `${rect.width}px`;
    }
  }

  private handleSelect(value: string) {
    if (this.multiple) {
      const newSelectedValues = this.selectedValues.includes(value)
        ? this.selectedValues.filter((v) => v !== value)
        : [...this.selectedValues, value];
      this.dispatchEvent(
        new CustomEvent("select", { detail: { selectedValues: newSelectedValues } })
      );
    } else {
      this.dispatchEvent(new CustomEvent("select", { detail: { value } }));
    }
  }

  render() {
    return html`
      <div class="bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
        ${this.items.map(
          (item) => html`
            <div
              class="px-4 py-2 cursor-pointer hover:bg-gray-100 ${this.selectedValues.includes(
                item.value
              )
                ? "bg-blue-100"
                : ""}"
              @click=${() => this.handleSelect(item.value)}
            >
              ${item.label}
            </div>
          `
        )}
      </div>
    `;
  }
}
