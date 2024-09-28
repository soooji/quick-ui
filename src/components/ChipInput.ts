import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import './Chip';

@customElement('my-chip-input')
export class ChipInput extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .chip-input-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      min-height: 38px;
      padding: 2px 8px;
    }
    input {
      border: none;
      outline: none;
      flex: 1 1 50px;
      min-width: 50px;
      background: transparent;
      padding: 4px 0;
    }
    .chips-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      padding-right: 4px;
    }
    my-chip {
      margin-bottom: 4px;
    }
  `;

  @property({ type: Array }) chips: string[] = [];
  @property({ type: Boolean }) multiple = false;
  @property({ type: String }) placeholder = '';
  @property({ type: String }) value = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @state() private _inputValue = '';
  @query('input') private inputElement!: HTMLInputElement;

  render() {
    return html`
      <div class="chip-input-container">
        <div class="chips-wrapper">
          ${this.multiple
            ? this.chips.map(
                (chip) => html`
                  <my-chip
                    .label=${chip}
                    size="small"
                    deletable
                    @delete=${() => this._removeChip(chip)}
                  ></my-chip>
                `
              )
            : ''}
        </div>
        <input
          type="text"
          .value=${this.multiple ? this._inputValue : this.value}
          .placeholder=${this.multiple && this.chips.length ? '' : this.placeholder}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @input=${this._handleInput}
          @keydown=${this._handleKeyDown}
        />
      </div>
    `;
  }

  private _handleInput(e: InputEvent) {
    const inputValue = (e.target as HTMLInputElement).value;
    this._inputValue = inputValue || ''; // Ensure it's never undefined
    this.dispatchEvent(new CustomEvent('input', { detail: { value: this._inputValue } }));
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Backspace' && this._inputValue === '' && this.chips.length > 0) {
      e.preventDefault();
      this._removeLastChip();
    }
  }

  private _removeChip(chip: string) {
    const newChips = this.chips.filter((c) => c !== chip);
    this.dispatchEvent(new CustomEvent('chips-change', { detail: { chips: newChips } }));
  }

  private _removeLastChip() {
    if (this.chips.length > 0) {
      const newChips = this.chips.slice(0, -1);
      this.dispatchEvent(new CustomEvent('chips-change', { detail: { chips: newChips } }));
    }
  }

  public setInputValue(value: string) {
    if (this.multiple) {
      this._inputValue = value || ''; // Ensure it's never undefined
    } else {
      this.value = value || ''; // Ensure it's never undefined
    }
    this.requestUpdate();
  }

  public focusInput() {
    this.inputElement?.focus();
  }
}