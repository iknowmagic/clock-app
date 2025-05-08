import type { Meta, StoryObj } from '@storybook/react'
import ToggleButton from './ToggleButton'

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ToggleButton>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
