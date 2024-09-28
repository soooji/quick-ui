import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../components/Paper";
import { Paper } from "../components/Paper";

const meta: Meta<Paper> = {
  title: "Components/Paper",
  component: "my-paper",
  argTypes: {
    elevation: {
      control: { type: "select" },
      options: [0, 1, 2, 3, 4, 5],
    },
    variant: {
      control: { type: "select" },
      options: ["outlined", "elevation"],
    },
    rounded: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl"],
    },
    padding: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<Paper>;

const Template: Story = {
  render: (args) => html`
    <my-paper
      .elevation=${args.elevation}
      .variant=${args.variant}
      .rounded=${args.rounded}
      .padding=${args.padding}
    >
      <p>This is a paper component</p>
      <p>It can contain any content</p>
    </my-paper>
  `,
};

export const Default: Story = {
  ...Template,
  args: {
    elevation: 1,
    variant: "elevation",
    rounded: "md",
    padding: "md",
  },
};

export const Outlined: Story = {
  ...Template,
  args: {
    ...Default.args,
    variant: "outlined",
  },
};

export const HighElevation: Story = {
  ...Template,
  args: {
    ...Default.args,
    elevation: 5,
  },
};

export const RoundedLarge: Story = {
  ...Template,
  args: {
    ...Default.args,
    rounded: "lg",
  },
};

export const NoPadding: Story = {
  ...Template,
  args: {
    ...Default.args,
    padding: "none",
  },
};

export const CustomContent: Story = {
  render: (args) => html`
    <my-paper
      .elevation=${args.elevation}
      .variant=${args.variant}
      .rounded=${args.rounded}
      .padding=${args.padding}
    >
      <h2 class="text-xl font-bold mb-2">Custom Content</h2>
      <p class="mb-4">This paper contains custom content with Tailwind classes.</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click me
      </button>
    </my-paper>
  `,
  args: {
    ...Default.args,
  },
};
