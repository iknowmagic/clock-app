import type { Meta, StoryObj } from '@storybook/react'
import ClockDisplay from './ClockDisplay'

const meta: Meta<typeof ClockDisplay> = {
  title: 'Components/ClockDisplay',
  component: ClockDisplay,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ClockDisplay>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
