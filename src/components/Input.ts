import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../styles/output.css?inline";
import { getCommonInputClasses } from "../utils/commonStyles";
import { AdornmentMixin, AdornmentType, AdornmentInterface } from "../mixins/AdornmentMixin";
import "./FormField";
import "./Label";

@customElement("my-input")
export class Input extends AdornmentMixin(LitElement) implements AdornmentInterface {
  static styles = [unsafeCSS(styles)];

  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";
  @property({ type: String }) type = "text";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: String }) name = "";
  @property({ type: String }) label = "";
  @property({ type: String }) helperText = "";
  @property({ type: Boolean }) error = false;
  @property({ type: String }) variant = "outlined";

  // Explicitly declare mixin properties
  @property({ type: String }) startAdornment?: AdornmentType;
  @property({ type: String }) endAdornment?: AdornmentType;

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent("input", { detail: { value: this.value } }));
  }

  private handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent("change", { detail: { value: this.value } }));
  }

  private handleFocus() {
    this.dispatchEvent(new CustomEvent("focus"));
  }

  private handleBlur() {
    this.dispatchEvent(new CustomEvent("blur"));
  }

  render() {
    const { wrapper: containerClasses, input: adornmentInputClasses } = this.getAdornmentClasses();

    const inputClasses = `${getCommonInputClasses({
      disabled: this.disabled,
      error: this.error,
      variant: this.variant,
      readonly: this.readonly,
      hasLabel: !!this.label,
    })} ${adornmentInputClasses}`;

    const hasLabel = !!this.label;

    return html`
      <my-form-field .helperText=${this.helperText} ?error=${this.error}>
        <div class=${containerClasses}>
          ${this.renderAdornments(hasLabel)}
          <input
            type=${this.type}
            class=${inputClasses}
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?readonly=${this.readonly}
            name=${this.name}
            @input=${this.handleInput}
            @change=${this.handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />
          ${this.label
            ? html`<my-label
                .text=${this.label}
                ?disabled=${this.disabled}
                ?error=${this.error}
              ></my-label>`
            : ""}
        </div>
      </my-form-field>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-input": Input;
  }
}
