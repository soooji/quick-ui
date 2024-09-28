import { Meta, StoryObj } from '@storybook/web-components';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../components/Radio';

const meta: Meta = {
  title: 'Components/Radio',
  component: 'my-radio',
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
    <my-radio
      .value=${args.value || ''}
      .name=${args.name || ''}
      .label=${args.label || ''}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      @change=${args.onChange}
    ></my-radio>
  `,
};

export const Default: Story = {
  ...Template,
  args: {
    label: 'Radio Option',
    value: 'option1',
    name: 'radioGroup',
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

@customElement('radio-group-demo')
class RadioGroupDemo extends LitElement {
  @state() selectedValue = '';

  render() {
    return html`
      <div class="space-y-2">
        ${['Option 1', 'Option 2', 'Option 3'].map((label, index) => {
          const value = `option${index + 1}`;
          return html`
            <my-radio
              label=${label}
              value=${value}
              name="radioGroup"
              ?checked=${this.selectedValue === value}
              @change=${this.handleChange}
            ></my-radio>
          `;
        })}
      </div>
      <p class="mt-4">Selected value: ${this.selectedValue}</p>
    `;
  }

  handleChange(e: CustomEvent) {
    this.selectedValue = e.detail.value;
    this.requestUpdate();
    console.log('Changed:', this.selectedValue);
  }
}

export const RadioGroup: Story = {
  render: () => html`<radio-group-demo></radio-group-demo>`,
};