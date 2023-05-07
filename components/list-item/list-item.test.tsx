import { render, screen } from '@testing-library/react'
import { internet, lorem } from 'faker'
import ListItem from './list-item'

const mockClassName = lorem.word()
const mockLink = internet.url()
const mockText = lorem.sentence()


describe('Component: <ListItem>', () => {
  it('renders correctly', () => {
    render(
        <ListItem
          className={mockClassName}
          link={mockLink}
          text={mockText}
        />
    )

    expect(screen.getByRole('link', { name: mockText }))
      .toHaveAttribute('href', mockLink)
  })
})
