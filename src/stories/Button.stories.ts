import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../components/button";
import { Button } from "../components/button";

const meta: Meta<Button> = {
  title: "Components/Button",
  component: "my-button",
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["text", "contained", "outlined"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "default"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<Button>;

const Template: Story = {
  render: (args) => html`
    <my-button
      .variant=${args.variant}
      .color=${args.color}
      .size=${args.size}
      ?disabled=${args.disabled}
      ?fullWidth=${args.fullWidth}
      .startIcon=${args.startIcon}
      .endIcon=${args.endIcon}
    >
      ${args.slot}
    </my-button>
  `,
};

const AddIcon = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24"
  viewBox="0 0 24 24"
  width="24"
  fill="currentColor"
>
  <path d="M0 0h24v24H0z" fill="none" />
  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
</svg>`;

const ArrowForwardIcon = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24"
  viewBox="0 0 24 24"
  width="24"
  fill="currentColor"
>
  <path d="M0 0h24v24H0z" fill="none" />
  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
</svg>`;

export const Default: Story = {
  ...Template,
  args: {
    variant: "contained",
    color: "primary",
    size: "medium",
    slot: "Button",
  },
};

export const Outlined: Story = {
  ...Template,
  args: {
    ...Default.args,
    variant: "outlined",
  },
};

export const Text: Story = {
  ...Template,
  args: {
    ...Default.args,
    variant: "text",
  },
};

export const Small: Story = {
  ...Template,
  args: {
    ...Default.args,
    size: "small",
  },
};

export const Large: Story = {
  ...Template,
  args: {
    ...Default.args,
    size: "large",
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const FullWidth: Story = {
  ...Template,
  args: {
    ...Default.args,
    fullWidth: true,
  },
};

export const WithStartIcon: Story = {
  ...Template,
  args: {
    ...Default.args,
    startIcon: AddIcon,
    slot: "Add Item",
  },
};

export const WithEndIcon: Story = {
  ...Template,
  args: {
    ...Default.args,
    endIcon: ArrowForwardIcon,
    slot: "Next",
  },
};
