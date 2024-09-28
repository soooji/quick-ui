import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../components/Typography";
import { Typography } from "../components/Typography";

const meta: Meta<Typography> = {
  title: "Components/Typography",
  component: "my-typography",
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle1",
        "subtitle2",
        "body1",
        "body2",
        "button",
        "caption",
        "overline",
      ],
    },
    component: { control: "text" },
    gutterBottom: { control: "boolean" },
    noWrap: { control: "boolean" },
    align: {
      control: { type: "select" },
      options: ["inherit", "left", "center", "right", "justify"],
    },
    color: {
      control: { type: "select" },
      options: ["inherit", "primary", "secondary", "error", "warning", "info", "success"],
    },
    slot: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<Typography>;

const Template: Story = {
  render: (args) => html`
    <my-typography
      .variant=${args.variant}
      .component=${args.component}
      ?gutterBottom=${args.gutterBottom}
      ?noWrap=${args.noWrap}
      .align=${args.align}
      .color=${args.color}
    >
      ${args.slot}
    </my-typography>
  `,
};

export const Default: Story = {
  ...Template,
  args: {
    variant: "body1",
    slot: "This is a default typography component",
  },
};

export const Heading1: Story = {
  ...Template,
  args: {
    variant: "h1",
    slot: "Heading 1",
  },
};

export const Subtitle: Story = {
  ...Template,
  args: {
    variant: "subtitle1",
    slot: "This is a subtitle",
  },
};

export const GutterBottom: Story = {
  ...Template,
  args: {
    variant: "body1",
    gutterBottom: true,
    slot: "This typography has a gutter bottom",
  },
};

export const NoWrap: Story = {
  ...Template,
  args: {
    variant: "body1",
    noWrap: true,
    slot: "This is a very long text that should not wrap to the next line. It will be truncated with an ellipsis.",
  },
};

export const Centered: Story = {
  ...Template,
  args: {
    variant: "body1",
    align: "center",
    slot: "This text is centered",
  },
};

export const ColoredText: Story = {
  ...Template,
  args: {
    variant: "body1",
    color: "primary",
    slot: "This text has a primary color",
  },
};

export const AllVariants: Story = {
  render: () => html`
    ${[
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "subtitle1",
      "subtitle2",
      "body1",
      "body2",
      "button",
      "caption",
      "overline",
    ].map(
      (variant) => html`
        <my-typography .variant=${variant}> This is ${variant} typography </my-typography>
      `
    )}
  `,
};
