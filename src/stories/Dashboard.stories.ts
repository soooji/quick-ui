import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../components/Accordion";
import "../components/Typography";
import "../components/Paper";
import "../components/Input";
import "../components/Select";
import "../components/Autocomplete";
import "../components/Divider";
import "../components/Grid";
import "../components/Table/Table";
import "../components/Table/TableHead";
import "../components/Table/TableBody";
import "../components/Table/TableRow";
import "../components/Table/TableCell";
import "../components/Table/TablePagination";

const meta: Meta = {
  title: "Examples/Dashboard",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

const recentOrders = [
  { id: 1, customer: "John Doe", product: "Widget A", amount: "$100", status: "Completed" },
  { id: 2, customer: "Jane Smith", product: "Gadget B", amount: "$75", status: "Processing" },
  { id: 3, customer: "Bob Johnson", product: "Tool C", amount: "$50", status: "Shipped" },
  { id: 4, customer: "Alice Brown", product: "Device D", amount: "$200", status: "Pending" },
  { id: 5, customer: "Charlie Davis", product: "Item E", amount: "$150", status: "Completed" },
];

const DashboardTemplate: Story = {
  render: () => html`
    <div class="bg-gray-100 min-h-screen p-6">
      <my-typography variant="h4" class="mb-6">Dashboard</my-typography>

      <my-grid container spacing="6">
        <!-- User Profile Section -->
        <my-grid item xs="12" md="6">
          <my-paper padding="lg">
            <my-typography variant="h5" class="mb-4">User Profile</my-typography>
            <my-grid container spacing="4">
              <my-grid item xs="12">
                <my-input label="Full Name" value="John Doe"></my-input>
              </my-grid>
              <my-grid item xs="12">
                <my-input label="Email" value="john.doe@example.com"></my-input>
              </my-grid>
              <my-grid item xs="12">
                <my-select
                  label="Role"
                  .options=${[
                    { value: "admin", label: "Admin" },
                    { value: "manager", label: "Manager" },
                    { value: "user", label: "User" },
                    { value: "guest", label: "Guest" },
                  ]}
                  value="user"
                ></my-select>
              </my-grid>
              <my-grid item xs="12">
                <my-autocomplete
                  label="Department"
                  .options=${[
                    { value: "sales", label: "Sales" },
                    { value: "marketing", label: "Marketing" },
                    { value: "engineering", label: "Engineering" },
                    { value: "hr", label: "Human Resources" },
                    { value: "finance", label: "Finance" },
                    { value: "support", label: "Customer Support" },
                  ]}
                ></my-autocomplete>
              </my-grid>
              <my-grid item xs="12">
                <my-input label="Last Login" value="2023-05-01" disabled></my-input>
              </my-grid>
            </my-grid>
          </my-paper>
        </my-grid>

        <!-- Quick Actions Section -->
        <my-grid item xs="12" md="6">
          <my-paper padding="lg">
            <my-typography variant="h5" class="mb-4">Quick Actions</my-typography>
            <my-accordion
              .items=${[
                {
                  title: "Create New Project",
                  content: html`
                    <my-input label="Project Name" placeholder="Enter project name"></my-input>
                    <my-select
                      label="Project Type"
                      class="mt-4"
                      .options=${[
                        { value: "web", label: "Web Development" },
                        { value: "mobile", label: "Mobile App" },
                        { value: "desktop", label: "Desktop Application" },
                        { value: "api", label: "API Development" },
                      ]}
                    ></my-select>
                  `,
                },
                {
                  title: "Invite Team Member",
                  content: html`
                    <my-input label="Email Address" placeholder="Enter email address"></my-input>
                    <my-select
                      label="Role"
                      class="mt-4"
                      .options=${[
                        { value: "developer", label: "Developer" },
                        { value: "designer", label: "Designer" },
                        { value: "manager", label: "Project Manager" },
                        { value: "tester", label: "QA Tester" },
                      ]}
                    ></my-select>
                  `,
                },
                {
                  title: "Generate Report",
                  content: html`
                    <my-grid container spacing="4">
                      <my-grid item xs="12">
                        <my-select
                          label="Report Type"
                          .options=${[
                            { value: "daily", label: "Daily" },
                            { value: "weekly", label: "Weekly" },
                            { value: "monthly", label: "Monthly" },
                            { value: "quarterly", label: "Quarterly" },
                            { value: "annual", label: "Annual" },
                          ]}
                        ></my-select>
                      </my-grid>
                      <my-grid item xs="12">
                        <my-autocomplete
                          label="Project"
                          .options=${[
                            { value: "alpha", label: "Project Alpha" },
                            { value: "beta", label: "Project Beta" },
                            { value: "gamma", label: "Project Gamma" },
                            { value: "delta", label: "Project Delta" },
                          ]}
                        ></my-autocomplete>
                      </my-grid>
                      <my-grid item xs="12">
                        <my-input label="Date Range" type="date"></my-input>
                      </my-grid>
                    </my-grid>
                  `,
                },
              ]}
            ></my-accordion>
          </my-paper>
        </my-grid>

        <!-- Recent Orders Section -->
        <my-grid item xs="12">
          <my-paper padding="lg">
            <my-typography variant="h5" class="mb-4">Recent Orders</my-typography>
            <my-table>
              <my-table-head>
                <my-table-row>
                  <my-table-cell header>Order ID</my-table-cell>
                  <my-table-cell header>Customer</my-table-cell>
                  <my-table-cell header>Product</my-table-cell>
                  <my-table-cell header>Amount</my-table-cell>
                  <my-table-cell header>Status</my-table-cell>
                </my-table-row>
              </my-table-head>
              <my-table-body>
                ${recentOrders.map(
                  (order) => html`
                    <my-table-row hover>
                      <my-table-cell>${order.id}</my-table-cell>
                      <my-table-cell>${order.customer}</my-table-cell>
                      <my-table-cell>${order.product}</my-table-cell>
                      <my-table-cell>${order.amount}</my-table-cell>
                      <my-table-cell>${order.status}</my-table-cell>
                    </my-table-row>
                  `
                )}
              </my-table-body>
            </my-table>
            <my-table-pagination
              .count=${recentOrders.length}
              .page=${0}
              .rowsPerPage=${5}
              .rowsPerPageOptions=${[5, 10, 25]}
            ></my-table-pagination>
          </my-paper>
        </my-grid>

        <!-- Recent Activity Section -->
        <my-grid item xs="12">
          <my-paper padding="lg">
            <my-typography variant="h5" class="mb-4">Recent Activity</my-typography>
            <my-divider class="mb-4"></my-divider>
            <my-grid container spacing="2">
              ${[
                "Project A updated",
                "New team member added",
                "Report generated",
                "Settings changed",
              ].map(
                (activity) => html`
                  <my-grid item xs="12">
                    <my-typography variant="body2">${activity}</my-typography>
                    <my-divider class="mt-2"></my-divider>
                  </my-grid>
                `
              )}
            </my-grid>
          </my-paper>
        </my-grid>
      </my-grid>
    </div>
  `,
};

export const Dashboard: Story = { ...DashboardTemplate };
