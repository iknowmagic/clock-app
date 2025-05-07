import type { Meta, StoryObj } from '@storybook/react'
import ThemeToggle from './ThemeToggle'
import { useThemeStore } from './themeStore'
import { useEffect } from 'react'

// Reset theme for each story
const ThemeToggleWithReset = (args: any) => {
  const { setTheme } = useThemeStore()

  useEffect(() => {
    // Set initial theme based on the story
    setTheme(args.initialTheme || 'reactcraft-light')

    return () => {
      // Clean up
      setTheme('reactcraft-light')
    }
  }, [args.initialTheme, setTheme])

  return <ThemeToggle {...args} />
}

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = {
  render: (args) => <ThemeToggleWithReset {...args} />,
}

export const InitialDarkTheme: Story = {
  render: (args) => (
    <ThemeToggleWithReset {...args} initialTheme="reactcraft-dark" />
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const CustomTheme: Story = {
  render: (args) => <ThemeToggleWithReset {...args} initialTheme="retro" />,
}
