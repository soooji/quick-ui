import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeCSS } from "lit";
import styles from "../../styles/output.css?inline";

@customElement("my-table-pagination")
export class TablePagination extends LitElement {
  static styles = [
    unsafeCSS(styles),
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: Number }) count = 0;
  @property({ type: Number }) page = 0;
  @property({ type: Number }) rowsPerPage = 10;
  @property({ type: Array }) rowsPerPageOptions = [5, 10, 25];

  private handlePageChange(newPage: number) {
    const event = new CustomEvent("page-change", {
      detail: { page: newPage },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private handleRowsPerPageChange(event: Event) {
    const newRowsPerPage = parseInt((event.target as HTMLSelectElement).value, 10);
    const newEvent = new CustomEvent("rows-per-page-change", {
      detail: { rowsPerPage: newRowsPerPage },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(newEvent);
  }

  render() {
    const totalPages = Math.ceil(this.count / this.rowsPerPage);

    return html`
      <div
        class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      >
        <div class="flex flex-1 justify-between sm:hidden">
          <button
            @click=${() => this.handlePageChange(this.page - 1)}
            ?disabled=${this.page === 0}
            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            @click=${() => this.handlePageChange(this.page + 1)}
            ?disabled=${this.page === totalPages - 1}
            class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">${this.page * this.rowsPerPage + 1}</span>
              to
              <span class="font-medium"
                >${Math.min((this.page + 1) * this.rowsPerPage, this.count)}</span
              >
              of
              <span class="font-medium">${this.count}</span>
              results
            </p>
          </div>
          <div>
            <label>
              Rows per page:
              <select
                @change=${this.handleRowsPerPageChange}
                class="ml-1 rounded-md border-gray-300 py-2 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                ${this.rowsPerPageOptions.map(
                  (option) => html`
                    <option value=${option} ?selected=${option === this.rowsPerPage}>
                      ${option}
                    </option>
                  `
                )}
              </select>
            </label>
          </div>
          <div>
            <nav
              class="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                @click=${() => this.handlePageChange(this.page - 1)}
                ?disabled=${this.page === 0}
                class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                Previous
              </button>
              ${Array.from({ length: totalPages }, (_, i) => i).map(
                (pageNum) => html`
                  <button
                    @click=${() => this.handlePageChange(pageNum)}
                    class="relative inline-flex items-center px-4 py-2 text-sm font-semibold ${pageNum ===
                    this.page
                      ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}"
                  >
                    ${pageNum + 1}
                  </button>
                `
              )}
              <button
                @click=${() => this.handlePageChange(this.page + 1)}
                ?disabled=${this.page === totalPages - 1}
                class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    `;
  }
}
