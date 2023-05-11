import { fireEvent, render, screen } from '@testing-library/react'
import NavButton from './nav-button'

const mockOnClick = jest.fn()

const baseProps = {
  className: 'mock-class-name',
  onClick: mockOnClick,
  title: 'mock title',
  wrapperClassName: 'mock-wrapper-class-name',
}

describe('Component: <NavButton>', () => {
  it('renders component, isHidden = false', () => {
    const mockProps = {
      ...baseProps,
      isHidden: false,
    }

    render(
        <NavButton
          {...mockProps}
        />
    )

    const buttonNode = screen.getByRole('button', { name: mockProps.title })

    expect(buttonNode)
      .toBeInTheDocument()

    fireEvent.click(buttonNode)

    expect(mockOnClick)
      .toBeCalledTimes(1)
  })


  it('renders component, isHidden = true', () => {
    const mockProps = {
      ...baseProps,
      isHidden: true,
    }

    render(
        <NavButton
          {...mockProps}
        />
    )

    const buttonNode = screen.queryByRole('button', { name: mockProps.title })

    expect(buttonNode)
      .not.toBeInTheDocument()
  })
})
