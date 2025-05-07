import type { Meta, StoryObj } from '@storybook/react'
import ScrollTop from './ScrollTop'
import { FaArrowUp } from 'react-icons/fa'
import React, { useEffect } from 'react'

// Create a component with visibility controls for Storybook
const ScrollTopWithControls: React.FC<{ forceVisible: boolean }> = ({
  forceVisible,
}) => {
  // Force window.scrollY for storybook
  useEffect(() => {
    if (forceVisible) {
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: 1500,
      })
      window.dispatchEvent(new Event('scroll'))
    }

    return () => {
      // Reset
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: 0,
      })
      window.dispatchEvent(new Event('scroll'))
    }
  }, [forceVisible])

  return (
    <div style={{ height: '200px', position: 'relative' }}>
      <ScrollTop>
        <FaArrowUp />
      </ScrollTop>
      {!forceVisible && (
        <div style={{ textAlign: 'center', color: '#666', marginTop: '16px' }}>
          Note: In the actual app, this would only be visible after scrolling
          down.
        </div>
      )}
    </div>
  )
}

const meta: Meta<typeof ScrollTopWithControls> = {
  title: 'Components/ScrollTop',
  component: ScrollTopWithControls,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    forceVisible: {
      control: 'boolean',
      description: 'Force visibility for demo purposes',
    },
  },
}

export default meta

type Story = StoryObj<typeof ScrollTopWithControls>

export const Hidden: Story = {
  args: {
    forceVisible: false,
  },
}

export const Visible: Story = {
  args: {
    forceVisible: true,
  },
}

export const WithCustomContent: Story = {
  args: {
    forceVisible: true,
  },
  render: (args) => (
    <ScrollTopWithControls {...args}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FaArrowUp />
        <span>Back to top</span>
      </div>
    </ScrollTopWithControls>
  ),
}
