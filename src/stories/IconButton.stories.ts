import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../components/IconButton";
import { IconButton } from "../components/IconButton";

const meta: Meta<IconButton> = {
  title: "Components/IconButton",
  component: "my-icon-button",
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "default"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    color: "default",
    size: "medium",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<IconButton>;

const Template: Story = {
  render: (args) => html`
    <my-icon-button
      .color=${args.color}
      .size=${args.size}
      ?disabled=${args.disabled}
      .icon=${args.icon}
    ></my-icon-button>
  `,
};

const SearchIcon = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24"
  viewBox="0 0 24 24"
  width="24"
  fill="currentColor"
>
  <path d="M0 0h24v24H0z" fill="none" />
  <path
    d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
  />
</svg>`;

const EditIcon = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24"
  viewBox="0 0 24 24"
  width="24"
  fill="currentColor"
>
  <path d="M0 0h24v24H0z" fill="none" />
  <path
    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
  />
</svg>`;

const DeleteIcon = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24"
  viewBox="0 0 24 24"
  width="24"
  fill="currentColor"
>
  <path d="M0 0h24v24H0z" fill="none" />
  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
</svg>`;

export const Default: Story = {
  ...Template,
  args: {
    icon: SearchIcon,
  },
};

export const Primary: Story = {
  ...Template,
  args: {
    color: "primary",
    icon: EditIcon,
  },
};

export const Secondary: Story = {
  ...Template,
  args: {
    color: "secondary",
    icon: DeleteIcon,
  },
};

export const Small: Story = {
  ...Template,
  args: {
    size: "small",
    icon: SearchIcon,
  },
};

export const Large: Story = {
  ...Template,
  args: {
    size: "large",
    icon: EditIcon,
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    disabled: true,
    icon: DeleteIcon,
  },
};
