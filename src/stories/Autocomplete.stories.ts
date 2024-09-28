import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/Autocomplete';

const meta: Meta = {
  title: 'Components/Autocomplete',
  component: 'my-autocomplete',
  argTypes: {
    options: { control: 'object' },
    value: { control: 'text' },
    values: { control: 'object' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    multiple: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    freeSolo: { control: 'boolean' },
    onChange: { action: 'changed' },
    onInput: { action: 'input' },
  },
};

export default meta;
type Story = StoryObj;

const Template: Story = {
  render: (args) => html`
    <div style="width: 300px;">
      <my-autocomplete
        .options=${args.options}
        .value=${args.value}
        .values=${args.values}
        .placeholder=${args.placeholder}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multiple=${args.multiple}
        .label=${args.label}
        .helperText=${args.helperText}
        ?error=${args.error}
        ?freeSolo=${args.freeSolo}
        @change=${args.onChange}
        @input=${args.onInput}
      ></my-autocomplete>
    </div>
  `,
};

const tenOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
  { value: 'option6', label: 'Option 6' },
  { value: 'option7', label: 'Option 7' },
  { value: 'option8', label: 'Option 8' },
  { value: 'option9', label: 'Option 9' },
  { value: 'option10', label: 'Option 10' },
];

export const Default: Story = {
  ...Template,
  args: {
    options: tenOptions,
    placeholder: 'Select an option',
    label: 'Autocomplete Label',
  },
};

export const WithValue: Story = {
  ...Template,
  args: {
    ...Default.args,
    value: 'option2',
  },
};

export const WithHelperText: Story = {
  ...Template,
  args: {
    ...Default.args,
    helperText: 'This is a helper text for the autocomplete',
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
    value: 'option2',
    readonly: true,
  },
};

export const WithError: Story = {
  ...Template,
  args: {
    ...Default.args,
    helperText: 'This autocomplete has an error',
    error: true,
  },
};

export const MultiSelect: Story = {
  ...Template,
  args: {
    ...Default.args,
    multiple: true,
    values: ['option1', 'option3', 'option5'],
    placeholder: 'Select options',
  },
};

export const FreeSolo: Story = {
  ...Template,
  args: {
    ...Default.args,
    freeSolo: true,
  },
};