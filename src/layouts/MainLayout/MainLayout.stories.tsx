import type { Meta, StoryObj } from '@storybook/react'
import MainLayout from './MainLayout'
import { useAppStore } from '@/store/appStore'
import axios from 'axios'
import { useEffect } from 'react'
import React from 'react'
import { vi } from 'vitest'

// Mock axios for storybook
vi.mock('axios')

// Mock the store for storybook
vi.mock('@/store/appStore', () => ({
  useAppStore: vi.fn(() => ({
    showFooter: false,
    setShowFooter: () => {},
  })),
}))

// Create a component with controls for Storybook
const MainLayoutWithControls: React.FC<{
  showFooter: boolean
  timeOfDay: 'morning' | 'afternoon' | 'evening'
}> = ({ showFooter, timeOfDay }) => {
  // Set up store mock
  vi.mocked(useAppStore).mockReturnValue({
    showFooter,
    setShowFooter: () => {},
  })

  // Mock API responses
  useEffect(() => {
    let hour = 9 // Morning default
    if (timeOfDay === 'afternoon') hour = 14
    if (timeOfDay === 'evening') hour = 20

    const mockDate = new Date()
    mockDate.setHours(hour)

    vi.mocked(axios.get).mockImplementation((url) => {
      if (url.includes('api.ipgeolocation.io')) {
        return Promise.resolve({
          data: {
            time_zone: {
              name: 'America/New_York',
              current_time: mockDate.toISOString(),
            },
            city: 'New York',
            country_code2: 'US',
          },
        })
      } else if (url.includes('/api/quote')) {
        return Promise.resolve({
          data: {
            text: 'The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.',
            author: 'Ada Lovelace',
          },
        })
      }

      return Promise.reject(new Error('Not found'))
    })
  }, [timeOfDay])

  return <MainLayout />
}

const meta: Meta<typeof MainLayoutWithControls> = {
  title: 'Layouts/MainLayout',
  component: MainLayoutWithControls,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    showFooter: {
      control: 'boolean',
      description: 'Show or hide the footer section',
    },
    timeOfDay: {
      control: { type: 'select' },
      options: ['morning', 'afternoon', 'evening'],
      description: 'Time of day to display appropriate greeting and background',
    },
  },
}

export default meta

type Story = StoryObj<typeof MainLayoutWithControls>

export const Morning: Story = {
  args: {
    showFooter: false,
    timeOfDay: 'morning',
  },
}

export const Afternoon: Story = {
  args: {
    showFooter: false,
    timeOfDay: 'afternoon',
  },
}

export const Evening: Story = {
  args: {
    showFooter: false,
    timeOfDay: 'evening',
  },
}

export const WithFooterOpen: Story = {
  args: {
    showFooter: true,
    timeOfDay: 'morning',
  },
}

export const EveningWithFooterOpen: Story = {
  args: {
    showFooter: true,
    timeOfDay: 'evening',
  },
}
