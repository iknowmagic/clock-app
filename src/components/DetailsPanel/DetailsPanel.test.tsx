import { render, screen } from '@testing-library/react'
import DetailsPanel from './DetailsPanel'
import { mockTimeData } from '@/test/test-utils'

describe('DetailsPanel', () => {
  it('should render the component', () => {
    render(<DetailsPanel timeData={mockTimeData} expanded={true} />)

    // Check for content that should be present when expanded
    expect(screen.getByText('Current timezone')).toBeInTheDocument()
    expect(
      screen.getByText(mockTimeData.timezone.replace(/_/g, ' ')),
    ).toBeInTheDocument()
  })

  it('should not display content when not expanded', () => {
    render(<DetailsPanel timeData={mockTimeData} expanded={false} />)

    // When not expanded, the panel should be empty or hidden
    expect(screen.queryByText('Current timezone')).not.toBeInTheDocument()
  })
})
