import { render, screen } from '@testing-library/react'
import Footer from './footer'

const mockOnClick = jest.fn()

let mockScrollY: number

jest.mock('hooks/use-window-scroll-y', () => ({
  useWindowScrollY: () => mockScrollY,
}))

describe('Component: <Footer>', () => {
  it('renders without component', () => {
    mockScrollY = 0

    render(
        <Footer onClick={mockOnClick} />
    )

    expect(screen.queryByRole('button'))
      .not.toBeInTheDocument()
  })


  it('renders without component', () => {
    mockScrollY = 1

    render(
        <Footer onClick={mockOnClick} />
    )

    expect(screen.getByRole('button'))
      .toBeInTheDocument()
  })
})
