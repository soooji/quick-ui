import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../components/Table/Table";
import "../components/Table/TableHead";
import "../components/Table/TableBody";
import "../components/Table/TableRow";
import "../components/Table/TableCell";
import "../components/Table/TablePagination";

const meta: Meta = {
  title: "Components/Table",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

const sampleData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Manager" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "User" },
];

const TableTemplate: Story = {
  render: () => html`
    <my-table>
      <my-table-head>
        <my-table-row>
          <my-table-cell header>ID</my-table-cell>
          <my-table-cell header>Name</my-table-cell>
          <my-table-cell header>Email</my-table-cell>
          <my-table-cell header>Role</my-table-cell>
        </my-table-row>
      </my-table-head>
      <my-table-body>
        ${sampleData.map(
          (row) => html`
            <my-table-row hover>
              <my-table-cell>${row.id}</my-table-cell>
              <my-table-cell>${row.name}</my-table-cell>
              <my-table-cell>${row.email}</my-table-cell>
              <my-table-cell>${row.role}</my-table-cell>
            </my-table-row>
          `
        )}
      </my-table-body>
    </my-table>
    <my-table-pagination
      .count=${sampleData.length}
      .page=${0}
      .rowsPerPage=${5}
      .rowsPerPageOptions=${[5, 10, 25]}
    ></my-table-pagination>
  `,
};

export const Default: Story = { ...TableTemplate };

export const SmallTable: Story = {
  ...TableTemplate,
  render: () => html`
    <my-table size="small">
      <my-table-head>
        <my-table-row>
          <my-table-cell header>ID</my-table-cell>
          <my-table-cell header>Name</my-table-cell>
          <my-table-cell header>Email</my-table-cell>
          <my-table-cell header>Role</my-table-cell>
        </my-table-row>
      </my-table-head>
      <my-table-body>
        ${sampleData.map(
          (row) => html`
            <my-table-row hover>
              <my-table-cell>${row.id}</my-table-cell>
              <my-table-cell>${row.name}</my-table-cell>
              <my-table-cell>${row.email}</my-table-cell>
              <my-table-cell>${row.role}</my-table-cell>
            </my-table-row>
          `
        )}
      </my-table-body>
    </my-table>
    <my-table-pagination
      .count=${sampleData.length}
      .page=${0}
      .rowsPerPage=${5}
      .rowsPerPageOptions=${[5, 10, 25]}
    ></my-table-pagination>
  `,
};
