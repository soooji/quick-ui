import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../components/Divider";
import { Divider } from "../components/Divider";

const meta: Meta<Divider> = {
  title: "Components/Divider",
  component: "my-divider",
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    color: {
      control: { type: "select" },
      options: ["light", "medium", "dark"],
    },
    label: { control: "text" },
    dashed: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<Divider>;

const Template: Story = {
  render: (args) => html`
    <div style="${args.variant === "vertical" ? "height: 100px;" : ""}">
      <my-divider
        .variant=${args.variant}
        .color=${args.color}
        .label=${args.label}
        ?dashed=${args.dashed}
      ></my-divider>
    </div>
  `,
};

export const Default: Story = {
  ...Template,
  args: {
    variant: "horizontal",
    color: "medium",
    label: "",
    dashed: false,
  },
};

export const WithLabel: Story = {
  ...Template,
  args: {
    ...Default.args,
    label: "Divider Label",
  },
};

export const Dashed: Story = {
  ...Template,
  args: {
    ...Default.args,
    dashed: true,
  },
};

export const LightColor: Story = {
  ...Template,
  args: {
    ...Default.args,
    color: "light",
  },
};

export const DarkColor: Story = {
  ...Template,
  args: {
    ...Default.args,
    color: "dark",
  },
};

export const Vertical: Story = {
  ...Template,
  args: {
    ...Default.args,
    variant: "vertical",
  },
};

export const VerticalWithLabel: Story = {
  ...Template,
  args: {
    ...Default.args,
    variant: "vertical",
    label: "Vertical Divider",
  },
};
