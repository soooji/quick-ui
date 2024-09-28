import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/Chip';

const meta: Meta = {
  title: 'Components/Chip',
  component: 'my-chip',
  argTypes: {
    label: { control: 'text' },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'error'],
    },
    outlined: { control: 'boolean' },
    disabled: { control: 'boolean' },
    deletable: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    icon: { control: 'text' },
    onClick: { action: 'clicked' },
    onDelete: { action: 'deleted' },
  },
};

export default meta;
type Story = StoryObj;

const Template: Story = {
  render: (args) => html`
    <my-chip
      .label=${args.label}
      .color=${args.color}
      ?outlined=${args.outlined}
      ?disabled=${args.disabled}
      ?deletable=${args.deletable}
      .size=${args.size}
      .icon=${args.icon}
      @click=${args.onClick}
      @delete=${args.onDelete}
    ></my-chip>
  `,
};

export const Default: Story = {
  ...Template,
  args: {
    label: 'Chip',
  },
};

export const Primary: Story = {
  ...Template,
  args: {
    ...Default.args,
    color: 'primary',
  },
};

export const Outlined: Story = {
  ...Template,
  args: {
    ...Default.args,
    outlined: true,
  },
};

export const WithIcon: Story = {
  ...Template,
  args: {
    ...Default.args,
    icon: '👍',
  },
};

export const Deletable: Story = {
  ...Template,
  args: {
    ...Default.args,
    deletable: true,
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Small: Story = {
  ...Template,
  args: {
    ...Default.args,
    size: 'small',
  },
};

export const Large: Story = {
  ...Template,
  args: {
    ...Default.args,
    size: 'large',
  },
};

export const AllVariants: Story = {
  render: () => html`
    <div class="space-y-4">
      <div class="space-x-2">
        <my-chip label="Default"></my-chip>
        <my-chip label="Primary" color="primary"></my-chip>
        <my-chip label="Secondary" color="secondary"></my-chip>
        <my-chip label="Success" color="success"></my-chip>
        <my-chip label="Error" color="error"></my-chip>
      </div>
      <div class="space-x-2">
        <my-chip label="Outlined" outlined></my-chip>
        <my-chip label="With Icon" icon="🚀"></my-chip>
        <my-chip label="Deletable" deletable></my-chip>
        <my-chip label="Disabled" disabled></my-chip>
      </div>
      <div class="space-x-2">
        <my-chip label="Small" size="small"></my-chip>
        <my-chip label="Medium" size="medium"></my-chip>
        <my-chip label="Large" size="large"></my-chip>
      </div>
    </div>
  `,
};

export const DeletableVariants: Story = {
  render: () => html`
    <div class="space-y-4">
      <div class="space-x-2">
        <my-chip label="Default" deletable></my-chip>
        <my-chip label="Primary" color="primary" deletable></my-chip>
        <my-chip label="Secondary" color="secondary" deletable></my-chip>
        <my-chip label="Success" color="success" deletable></my-chip>
        <my-chip label="Error" color="error" deletable></my-chip>
      </div>
      <div class="space-x-2">
        <my-chip label="Outlined" outlined deletable></my-chip>
        <my-chip label="With Icon" icon="🚀" deletable></my-chip>
        <my-chip label="Disabled" disabled deletable></my-chip>
      </div>
      <div class="space-x-2">
        <my-chip label="Small" size="small" deletable></my-chip>
        <my-chip label="Medium" size="medium" deletable></my-chip>
        <my-chip label="Large" size="large" deletable></my-chip>
      </div>
    </div>
  `,
};