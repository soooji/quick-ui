import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../components/Accordion";
import { Accordion } from "../components/Accordion";

const meta: Meta<Accordion> = {
  title: "Components/Accordion",
  component: "my-accordion",
  argTypes: {
    items: { control: "object" },
    multiple: { control: "boolean" },
    elevation: { control: { type: "range", min: 0, max: 5, step: 1 } },
    variant: {
      control: { type: "select" },
      options: ["outlined", "elevation"],
    },
  },
};

export default meta;
type Story = StoryObj<Accordion>;

const Template: Story = {
  render: (args) => html`
    <my-accordion
      .items=${args.items}
      ?multiple=${args.multiple}
      .elevation=${args.elevation}
      .variant=${args.variant}
    ></my-accordion>
  `,
};

export const Default: Story = {
  ...Template,
  args: {
    items: [
      {
        title: "Accordion Item 1",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
      },
      {
        title: "Accordion Item 2",
        content:
          "Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.",
      },
      {
        title: "Accordion Item 3",
        content:
          "Suspendisse potenti. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
      },
    ],
    multiple: false,
    elevation: 1,
    variant: "outlined", // Changed from "elevation" to "outlined"
  },
};

export const MultipleExpansion: Story = {
  ...Template,
  args: {
    ...Default.args,
    multiple: true,
  },
};

export const Elevation: Story = {
  ...Template,
  args: {
    ...Default.args,
    variant: "elevation",
  },
};

export const HigherElevation: Story = {
  ...Template,
  args: {
    ...Default.args,
    elevation: 3,
    variant: "elevation",
  },
};
