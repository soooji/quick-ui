import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../styles/output.css?inline";
import "./Typography";
import "./Paper";
import "./Divider";

interface AccordionItem {
  title: string;
  content: string;
}

@customElement("my-accordion")
export class Accordion extends LitElement {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: Array }) items: AccordionItem[] = [];
  @property({ type: Boolean }) multiple = false;
  @property({ type: Number }) elevation = 1;
  @property({ type: String }) variant: "outlined" | "elevation" = "elevation";

  @state() private expandedItems: Set<number> = new Set();

  private toggleItem(index: number) {
    if (this.expandedItems.has(index)) {
      this.expandedItems.delete(index);
    } else {
      if (!this.multiple) {
        this.expandedItems.clear();
      }
      this.expandedItems.add(index);
    }
    this.requestUpdate();
  }

  private getRoundedClass(index: number): string {
    if (!this.multiple) return "md";

    const isFirst = index === 0;
    const isLast = index === this.items.length - 1;

    if (isFirst && isLast) return "md";
    if (isFirst) return "t-md";
    if (isLast) return "b-md";
    return "none";
  }

  render() {
    return html`
      <div class="flex flex-col">
        ${this.items.map(
          (item, index) => html`
            <div
              class="transition-all duration-300 ease-in-out ${index !== 0
                ? "mt-0.5"
                : ""} ${this.expandedItems.has(index) && index !== this.items.length - 1
                ? "mb-4"
                : ""}"
            >
              <my-paper
                .elevation=${this.elevation}
                .variant=${this.variant}
                .rounded=${this.getRoundedClass(index)}
                padding="none"
              >
                <div
                  class="cursor-pointer flex justify-between items-center px-4 py-3"
                  @click=${() => this.toggleItem(index)}
                >
                  <my-typography variant="subtitle1">${item.title}</my-typography>
                  <svg
                    class="w-5 h-5 transition-transform duration-300 ease-in-out ${this.expandedItems.has(
                      index
                    )
                      ? "transform rotate-180"
                      : ""}"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div
                  class="overflow-hidden transition-all duration-300 ease-in-out ${this.expandedItems.has(
                    index
                  )
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"}"
                >
                  <my-divider></my-divider>
                  <div class="px-4 py-3">
                    <my-typography variant="body2">${item.content}</my-typography>
                  </div>
                </div>
              </my-paper>
            </div>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-accordion": Accordion;
  }
}
