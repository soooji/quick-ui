import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../styles/output.css?inline";

type GridSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

@customElement("my-grid")
export class Grid extends LitElement {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: Boolean }) container = false;
  @property({ type: Boolean }) item = false;
  @property({ type: Number }) spacing: GridSpacing = 2;
  @property({ type: Number }) columns: GridColumns = 12;
  @property({ type: String }) justifyContent:
    | "start"
    | "center"
    | "end"
    | "between"
    | "around"
    | "evenly" = "start";
  @property({ type: String }) alignItems: "start" | "center" | "end" | "stretch" | "baseline" =
    "stretch";
  @property({ type: Number }) xs: GridColumns | undefined;
  @property({ type: Number }) sm: GridColumns | undefined;
  @property({ type: Number }) md: GridColumns | undefined;
  @property({ type: Number }) lg: GridColumns | undefined;
  @property({ type: Number }) xl: GridColumns | undefined;

  private getSpacingClass(spacing: GridSpacing): string {
    const spacingMap: Record<GridSpacing, string> = {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
    };
    return spacingMap[spacing];
  }

  private getColumnClass(size: string, columns: GridColumns): string {
    return `${size}:col-span-${columns}`;
  }

  render() {
    const containerClasses = this.container
      ? `grid grid-cols-${this.columns} ${this.getSpacingClass(this.spacing)} justify-${this.justifyContent} items-${this.alignItems}`
      : "";

    const itemClasses = this.item
      ? `col-span-12 ${this.xs ? this.getColumnClass("xs", this.xs) : ""} ${
          this.sm ? this.getColumnClass("sm", this.sm) : ""
        } ${this.md ? this.getColumnClass("md", this.md) : ""} ${
          this.lg ? this.getColumnClass("lg", this.lg) : ""
        } ${this.xl ? this.getColumnClass("xl", this.xl) : ""}`
      : "";

    const classes = `${containerClasses} ${itemClasses}`.trim();

    return html`
      <div class="${classes}">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-grid": Grid;
  }
}
