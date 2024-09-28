import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/Checkbox';

const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'my-checkbox',
  argTypes: {
    value: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { action: 'change' },
  },
};

export default meta;
type Story = StoryObj;

const Template: Story = {
  render: (args) => html`
    <my-checkbox
      .value=${args.value || ''}
      .name=${args.name || ''}
      .label=${args.label || ''}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      @change=${args.onChange}
    ></my-checkbox>
  `,
};

export const Default: Story = {
  ...Template,
  args: {
    label: 'Checkbox Option',
    value: 'option1',
    name: 'checkboxGroup',
  },
};

export const Checked: Story = {
  ...Template,
  args: {
    ...Default.args,
    checked: true,
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  ...Template,
  args: {
    ...Default.args,
    disabled: true,
    checked: true,
  },
};