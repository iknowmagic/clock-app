import type { Meta, StoryObj } from '@storybook/react'
import DetailsPanel from './DetailsPanel'

const meta: Meta<typeof DetailsPanel> = {
  title: 'Components/DetailsPanel',
  component: DetailsPanel,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof DetailsPanel>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
