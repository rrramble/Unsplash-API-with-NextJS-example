import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import SearchInput from './search-input'
import { lorem } from 'faker'

const mockPropTexts = [ '', lorem.sentence() ] as const
const mockOnChange = jest.fn()

describe('Component: <SearchInput>', () => {
  test.concurrent.each(mockPropTexts)('renders correctly with text: "%s"', (mockPropText) => {
    cleanup()

    render(
        <SearchInput
          onChange={mockOnChange}
          text={mockPropText}
        />
    )

    const inputNode = screen.getByRole('textbox')

    expect(inputNode.getAttribute('value'))
      .toEqual(mockPropText)

    expect(inputNode)
      .toHaveAccessibleName(/поиск/i)
  })

  it('changes text', () => {
    cleanup()
    const mockInputText = lorem.sentence()

    render(
        <SearchInput
          onChange={mockOnChange}
          text=""
        />
    )

    const inputNode = screen.getByRole('textbox')

    fireEvent.change(inputNode, { target: { value: mockInputText } })

    expect(mockOnChange)
      .toBeCalledWith(mockInputText)
  })
})
