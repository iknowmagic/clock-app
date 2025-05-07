import type { Meta, StoryObj } from '@storybook/react'
import ClockApp from './ClockApp'

const meta: Meta<typeof ClockApp> = {
  title: 'Components/ClockApp',
  component: ClockApp,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ClockApp>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
