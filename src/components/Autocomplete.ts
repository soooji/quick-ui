import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../styles/output.css?inline";
import { getCommonInputClasses } from "../utils/commonStyles";
import { DropdownInterface } from "../interfaces/DropdownInterface";
import { OverlayMixin } from "../mixins/OverlayMixin";
import { DropdownMixin } from "../mixins/DropdownMixin";
import "./Menu";
import "./FormField";
import "./Label";
import "./ChipInput";
import { ChipInput } from "./ChipInput";

@customElement("my-autocomplete")
export class Autocomplete
  extends DropdownMixin(OverlayMixin(LitElement))
  implements DropdownInterface
{
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: block;
        position: relative;
      }
      .menu-container {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 51;
      }
      .autocomplete-wrapper {
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
      my-chip-input {
        padding-top: 16px;
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
  @property({ type: Boolean }) freeSolo: boolean = false;
  @state() private inputValue: string = "";
  @state() private filteredOptions: { value: string; label: string }[] = [];
  @property({ type: Boolean }) keepOpenOnSelect: boolean = false;

  @query("my-chip-input") chipInput!: ChipInput;
  @query(".autocomplete-container") autocompleteContainer!: HTMLElement;

  firstUpdated() {
    this.filteredOptions = this.options;
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has("options")) {
      this.filteredOptions = this.options;
    }
    if (changedProperties.has("value") || changedProperties.has("values")) {
      this.updateChipInput();
    }
  }

  private _handleSelect(e: CustomEvent) {
    const { value, selectedValues } = e.detail;

    if (this.multiple) {
      this.values = selectedValues || [];
      this.dispatchEvent(new CustomEvent("change", { detail: { values: this.values } }));
    } else {
      this.value = value;
      this.dispatchEvent(new CustomEvent("change", { detail: { value: this.value } }));
    }

    // Clear the input value after selection
    this.inputValue = "";
    this.updateChipInput();

    // Focus the input after selection
    this.chipInput.focusInput();

    // Close the dropdown if keepOpenOnSelect is false
    if (!this.keepOpenOnSelect) {
      this._closeDropdown();
    }

    this.requestUpdate();
  }

  private _handleInput(e: CustomEvent) {
    if (this.readonly) return;
    const inputValue = e.detail.value;
    this.inputValue = inputValue;
    this.filteredOptions = this.options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (!this.isOpen) {
      this._openDropdown();
    }
    this.dispatchEvent(new CustomEvent("input", { detail: { value: inputValue } }));
  }

  private _handleChipsChange(e: CustomEvent) {
    if (this.multiple) {
      const newChips = e.detail.chips;
      this.values = this.options
        .filter((opt) => newChips.includes(opt.label))
        .map((opt) => opt.value);
      this.dispatchEvent(new CustomEvent("change", { detail: { values: this.values } }));
      this.updateChipInput();
    }
  }

  private updateChipInput() {
    if (this.chipInput) {
      if (this.multiple) {
        const selectedLabels = this.options
          .filter((opt) => this.values.includes(opt.value))
          .map((opt) => opt.label);
        this.chipInput.chips = selectedLabels;
        this.chipInput.setInputValue(this.inputValue);
      } else {
        const selectedLabel = this.options.find((opt) => opt.value === this.value)?.label || "";
        this.chipInput.setInputValue(selectedLabel);
      }
    }
  }

  render() {
    const containerClasses = `relative`;

    const inputClasses = getCommonInputClasses({
      disabled: this.disabled,
      readonly: this.readonly,
      hasLabel: !!this.label,
      error: this.error,
    });

    return html`
      <my-form-field .helperText=${this.helperText} ?error=${this.error}>
        <div class="autocomplete-container ${containerClasses}">
          <div class="autocomplete-wrapper ${inputClasses}">
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
            <my-chip-input
              ?multiple=${this.multiple}
              .placeholder=${this.placeholder}
              .value=${this.value}
              .chips=${this.multiple
                ? this.values.map((v) => this.options.find((opt) => opt.value === v)?.label || "")
                : []}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              @input=${this._handleInput}
              @chips-change=${this._handleChipsChange}
            ></my-chip-input>
          </div>
        </div>
      </my-form-field>
      ${this.isOpen && !this.readonly
        ? html`
            <my-menu
              .items=${this.filteredOptions}
              .selectedValues=${this.multiple ? this.values : [this.value]}
              ?multiple=${this.multiple}
              .anchorEl=${this.autocompleteContainer}
              @select=${this._handleSelect}
            ></my-menu>
          `
        : ""}
    `;
  }
}
