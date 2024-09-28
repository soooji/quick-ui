import { LitElement } from "lit";
import { DropdownInterface } from "../interfaces/DropdownInterface";
import { property, state } from "lit/decorators.js";
import { clickOutside, createBackdrop } from "../utils/dom-utils";
import { useScrollLock } from "../utils/scrollLock";

type Constructor<T = {}> = new (...args: any[]) => T;

export const DropdownMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class DropdownMixinClass extends superClass {
    @property({ type: Boolean }) disabled: boolean = false;
    @property({ type: Boolean }) readonly: boolean = false;
    @state() public isOpen: boolean = false;

    private removeClickOutsideListener: (() => void) | null = null;
    private backdrop: HTMLElement | null = null;
    private scrollLock = useScrollLock();

    connectedCallback() {
      super.connectedCallback();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeClickOutsideListener?.();
      this.removeBackdrop();
      this.scrollLock.unlockScroll();
    }

    public _toggleDropdown(): void {
      if (!this.disabled && !this.readonly) {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
          this._openDropdown();
        } else {
          this._closeDropdown();
        }
      }
    }

    public _openDropdown() {
      this.isOpen = true;
      this.removeClickOutsideListener = clickOutside(this, () => this._closeDropdown());
      this.addBackdrop();
      this.scrollLock.lockScroll();
      this.requestUpdate();
    }

    public _closeDropdown() {
      this.isOpen = false;
      this.removeClickOutsideListener?.();
      this.removeBackdrop();
      this.scrollLock.unlockScroll();
      this.requestUpdate();
    }

    private addBackdrop() {
      if (!this.backdrop) {
        this.backdrop = createBackdrop();
        this.backdrop.style.zIndex = "50";
        document.body.appendChild(this.backdrop);
        this.backdrop.addEventListener("click", () => this._closeDropdown());
      }
    }

    private removeBackdrop() {
      if (this.backdrop) {
        this.backdrop.removeEventListener("click", () => this._closeDropdown());
        document.body.removeChild(this.backdrop);
        this.backdrop = null;
      }
    }
  }

  return DropdownMixinClass as unknown as Constructor<DropdownInterface> & T;
};
