import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../components/Input";
import { Input } from "../components/Input";

const meta: Meta<Input> = {
  title: "Components/Input",
  component: "my-input",
  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
    type: { control: "select", options: ["text", "email", "number"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    readonly: { control: "boolean" },
    name: { control: "text" },
    label: { control: "text" },
    helperText: { control: "text" },
    error: { control: "boolean" },
    variant: { control: "select", options: ["outlined", "filled"] },
    startAdornment: { control: "text" },
    endAdornment: { control: "text" },
    oninput: { action: "input" },
    onchange: { action: "change" },
    onfocus: { action: "focus" },
    onblur: { action: "blur" },
  },
};

export default meta;
type Story = StoryObj<Input>;

const Template: Story = {
  render: (args) => html`
    <div style="width: 300px;">
      <my-input
        .value=${args.value || ""}
        .placeholder=${args.placeholder || ""}
        .type=${args.type || "text"}
        ?disabled=${args.disabled}
        ?required=${args.required}
        ?readonly=${args.readonly}
        .name=${args.name || ""}
        .label=${args.label || ""}
        .helperText=${args.helperText || ""}
        ?error=${args.error}
        .variant=${args.variant || "outlined"}
        .startAdornment=${args.startAdornment
          ? html`<span>${args.startAdornment}</span>`
          : undefined}
        .endAdornment=${args.endAdornment ? html`<span>${args.endAdornment}</span>` : undefined}
        @input=${args.oninput}
        @change=${args.onchange}
        @focus=${args.onfocus}
        @blur=${args.onblur}
      ></my-input>
    </div>
  `,
};

export const Default: Story = {
  ...Template,
  args: {
    placeholder: "Enter text",
    label: "Input Label",
  },
};

export const WithValue: Story = {
  ...Template,
  args: {
    ...Default.args,
    value: "Initial Value",
  },
};

export const WithHelperText: Story = {
  ...Template,
  args: {
    ...Default.args,
    label: "Input with Helper Text",
    helperText: "This is a helper text",
  },
};

export const Error: Story = {
  ...Template,
  args: {
    ...Default.args,
    error: true,
    helperText: "This field is required",
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  ...Template,
  args: {
    ...Default.args,
    value: "Read-only value",
    readonly: true,
  },
};

export const FilledVariant: Story = {
  ...Template,
  args: {
    ...Default.args,
    variant: "filled",
  },
};

export const WithStartAdornment: Story = {
  ...Template,
  args: {
    ...Default.args,
    label: "With Start Adornment",
    startAdornment: "$",
  },
};

export const WithEndAdornment: Story = {
  ...Template,
  args: {
    ...Default.args,
    label: "With End Adornment",
    endAdornment: "kg",
  },
};

export const WithBothAdornments: Story = {
  ...Template,
  args: {
    ...Default.args,
    label: "With Both Adornments",
    startAdornment: "$",
    endAdornment: ".00",
  },
};

export const NumberInput: Story = {
  ...Template,
  args: {
    label: "Number Input",
    type: "number",
    placeholder: "Enter a number",
    startAdornment: "$",
    endAdornment: ".00",
  },
};

export const NumberInputWithoutLabel: Story = {
  ...Template,
  args: {
    type: "number",
    placeholder: "Enter a number",
    startAdornment: "$",
    endAdornment: ".00",
  },
};

export const WithIconAdornment: Story = {
  ...Template,
  args: {
    label: "Search",
    placeholder: "Search...",
    startAdornment: html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    `,
  },
};

export const WithIconAdornmentNoLabel: Story = {
  ...Template,
  args: {
    placeholder: "Search...",
    startAdornment: html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    `,
  },
};

// Add similar stories for Autocomplete and Select
