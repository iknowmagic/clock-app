import { render, screen, fireEvent } from '@testing-library/react'
import VButton from './VButton'
import { useAppStore } from '@/store/appStore'

// Mock the store
vi.mock('@/store/appStore', () => ({
  useAppStore: vi.fn(),
}))

describe('VButton', () => {
  const mockSetShowFooter = vi.fn()

  beforeEach(() => {
    // Reset the mock between tests
    vi.clearAllMocks()

    // Setup default mock implementation
    vi.mocked(useAppStore).mockReturnValue({
      showFooter: false,
      setShowFooter: mockSetShowFooter,
    })
  })

  it('should render the component with "more" text when footer is hidden', () => {
    render(<VButton />)

    expect(screen.getByTestId('v-button')).toBeInTheDocument()
    expect(screen.getByText('more')).toBeInTheDocument()
    expect(screen.queryByText('less')).not.toBeInTheDocument()
  })

  it('should render the component with "less" text when footer is shown', () => {
    vi.mocked(useAppStore).mockReturnValue({
      showFooter: true,
      setShowFooter: mockSetShowFooter,
    })

    render(<VButton />)

    expect(screen.getByTestId('v-button')).toBeInTheDocument()
    expect(screen.getByText('less')).toBeInTheDocument()
    expect(screen.queryByText('more')).not.toBeInTheDocument()
  })

  it('should toggle the footer state when clicked', () => {
    render(<VButton />)

    fireEvent.click(screen.getByTestId('v-button'))

    expect(mockSetShowFooter).toHaveBeenCalledWith(true)
  })

  it('should have btn-open class when footer is shown', () => {
    vi.mocked(useAppStore).mockReturnValue({
      showFooter: true,
      setShowFooter: mockSetShowFooter,
    })

    render(<VButton />)

    expect(screen.getByTestId('v-button')).toHaveClass('btn-open')
  })

  it('should not have btn-open class when footer is hidden', () => {
    render(<VButton />)

    expect(screen.getByTestId('v-button')).not.toHaveClass('btn-open')
  })
})
