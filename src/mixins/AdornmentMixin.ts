import { LitElement, html, TemplateResult } from "lit";
import { property } from "lit/decorators.js";

export type AdornmentType = string | TemplateResult;

export interface AdornmentInterface {
  startAdornment?: AdornmentType;
  endAdornment?: AdornmentType;
  renderAdornments: (hasLabel: boolean) => TemplateResult;
  getAdornmentClasses: () => { input: string; wrapper: string };
}

export const AdornmentMixin = <T extends new (...args: any[]) => LitElement>(superClass: T) => {
  class AdornmentMixinClass extends superClass {
    @property({ type: String }) startAdornment?: AdornmentType;
    @property({ type: String }) endAdornment?: AdornmentType;

    renderAdornments(hasLabel: boolean): TemplateResult {
      const topClass = hasLabel ? "top-[30px]" : "top-1/2";
      return html`
        ${this.startAdornment
          ? html`<div
              class="absolute left-2.5 ${topClass} -translate-y-1/2 pointer-events-none flex items-center"
            >
              ${this.startAdornment}
            </div>`
          : ""}
        ${this.endAdornment
          ? html`<div
              class="absolute right-2 ${topClass} -translate-y-1/2 pointer-events-none flex items-center"
            >
              ${this.endAdornment}
            </div>`
          : ""}
      `;
    }

    getAdornmentClasses(): { input: string; wrapper: string } {
      return {
        input: `${this.startAdornment ? "pl-8" : ""} ${this.endAdornment ? "pr-8" : ""}`.trim(),
        wrapper: "relative",
      };
    }
  }

  return AdornmentMixinClass as unknown as Constructor<AdornmentInterface> & T;
};

type Constructor<T = {}> = new (...args: any[]) => T;
