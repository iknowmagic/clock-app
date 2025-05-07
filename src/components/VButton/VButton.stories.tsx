import type { Meta, StoryObj } from '@storybook/react'
import VButton from './VButton'
import { useAppStore } from '@/store/appStore'
import React from 'react'
import { vi } from 'vitest'

// Mock the store for storybook
vi.mock('@/store/appStore', () => ({
  useAppStore: vi.fn(() => ({
    showFooter: false,
    setShowFooter: () => {},
  })),
}))

// Create a component with store controls for Storybook
const VButtonWithControls: React.FC<{ initialShowFooter: boolean }> = ({
  initialShowFooter,
}) => {
  vi.mocked(useAppStore).mockReturnValue({
    showFooter: initialShowFooter,
    setShowFooter: () => {},
  })

  return <VButton />
}

const meta: Meta<typeof VButtonWithControls> = {
  title: 'Components/VButton',
  component: VButtonWithControls,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    initialShowFooter: {
      control: 'boolean',
      description: 'Initial state of the footer visibility',
    },
  },
}

export default meta

type Story = StoryObj<typeof VButtonWithControls>

export const Default: Story = {
  args: {
    initialShowFooter: false,
  },
}

export const FooterOpen: Story = {
  args: {
    initialShowFooter: true,
  },
}
