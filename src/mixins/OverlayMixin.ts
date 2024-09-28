import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { DropdownInterface } from "../interfaces/DropdownInterface";

export const OverlayMixin = <T extends new (...args: any[]) => LitElement>(superClass: T) => {
  class OverlayClass extends superClass implements Partial<DropdownInterface> {
    @property({ type: Boolean, reflect: true }) open = false;

    private _clickOutsideHandler: (event: MouseEvent) => void;

    constructor(...args: any[]) {
      super(...args);
      this._clickOutsideHandler = this._handleClickOutside.bind(this);
    }

    connectedCallback() {
      super.connectedCallback();
      document.addEventListener("click", this._clickOutsideHandler);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      document.removeEventListener("click", this._clickOutsideHandler);
    }

    private _handleClickOutside(event: MouseEvent) {
      if (this.open && !this.contains(event.target as Node)) {
        this.close();
      }
    }

    toggle() {
      this.open = !this.open;
    }

    close() {
      this.open = false;
    }
  }

  return OverlayClass as T & Partial<DropdownInterface>;
};
