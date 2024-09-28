import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../styles/output.css?inline";
import { getCommonInputClasses } from "../utils/commonStyles";
import { DropdownInterface } from "../interfaces/DropdownInterface";
import { OverlayMixin } from "../mixins/OverlayMixin";
import { DropdownMixin } from "../mixins/DropdownMixin";
import "./Menu";
import "./FormField";
import "./Label";

@customElement("my-select")
export class Select extends DropdownMixin(OverlayMixin(LitElement)) implements DropdownInterface {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: block;
        position: relative;
      }
      .select-wrapper {
        min-height: 38px;
        height: auto;
        display: flex;
        flex-direction: column;
        padding: 0;
      }
      .label-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        pointer-events: none;
      }
      .select-value {
        padding-top: 16px;
        padding-bottom: 8px;
        padding-left: 12px;
        padding-right: 32px;
      }
    `,
  ];

  @property({ type: Array }) options: { value: string; label: string }[] = [];
  @property({ type: String }) value: string = "";
  @property({ type: Array }) values: string[] = [];
  @property({ type: String }) placeholder: string = "Select an option";
  @property({ type: Boolean }) multiple: boolean = false;
  @property({ type: String }) label: string = "";
  @property({ type: String }) helperText: string = "";
  @property({ type: Boolean }) error: boolean = false;
  @property({ type: Boolean }) keepOpenOnSelect: boolean = false;

  @query(".select-container") selectContainer!: HTMLElement;

  private _handleSelect(e: CustomEvent) {
    const { value, selectedValues } = e.detail;

    if (this.multiple) {
      this.values = selectedValues;
      this.dispatchEvent(new CustomEvent("change", { detail: { values: this.values } }));
    } else {
      this.value = value;
      this.dispatchEvent(new CustomEvent("change", { detail: { value: this.value } }));
    }

    if (!this.keepOpenOnSelect) {
      this._closeDropdown();
    }

    this.requestUpdate();
  }

  render() {
    const containerClasses = `relative`;

    const selectClasses = getCommonInputClasses({
      disabled: this.disabled,
      readonly: this.readonly,
      hasLabel: !!this.label,
      error: this.error,
    });

    let selectedOptions: { value: string; label: string }[];
    if (this.multiple) {
      selectedOptions = this.options.filter((opt) => this.values.includes(opt.value));
    } else {
      const selected = this.options.find((opt) => opt.value === this.value);
      selectedOptions = selected ? [selected] : [];
    }

    let displayValue: string;
    if (selectedOptions.length > 0) {
      displayValue = selectedOptions.map((opt) => opt.label).join(", ");
    } else {
      displayValue = this.placeholder;
    }

    return html`
      <my-form-field .helperText=${this.helperText} ?error=${this.error}>
        <div class="select-container ${containerClasses}">
          <div class="select-wrapper ${selectClasses}" @click=${this._toggleDropdown}>
            ${this.label
              ? html`
                  <div class="label-wrapper">
                    <my-label
                      .text=${this.label}
                      ?disabled=${this.disabled}
                      ?error=${this.error}
                    ></my-label>
                  </div>
                `
              : ""}
            <div class="select-value">${displayValue}</div>
            ${!this.readonly
              ? html`
                  <span
                    class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                  >
                    <svg
                      class="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                `
              : ""}
          </div>
        </div>
      </my-form-field>
      ${this.isOpen && !this.readonly
        ? html`
            <my-menu
              .items=${this.options}
              .selectedValues=${this.multiple ? this.values : [this.value]}
              ?multiple=${this.multiple}
              .anchorEl=${this.selectContainer}
              @select=${this._handleSelect}
            ></my-menu>
          `
        : ""}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-select": Select;
  }
}
