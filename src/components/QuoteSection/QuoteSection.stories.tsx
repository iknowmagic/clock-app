import type { Meta, StoryObj } from '@storybook/react'
import QuoteSection from './QuoteSection'

const meta: Meta<typeof QuoteSection> = {
  title: 'Components/QuoteSection',
  component: QuoteSection,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof QuoteSection>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
