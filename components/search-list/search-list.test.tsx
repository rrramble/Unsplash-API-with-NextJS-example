import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { makeMockSearchTopics } from '@/utils/mocks'
import { datatype } from 'faker'
import SearchList from './search-list'
import { AppRoute } from 'consts/consts'
import { SearchTopics } from 'types/search-tags'

const MockIsFull = [ true, false ]
const mockItemsCount = datatype.number({ min: 1, max: 50 })
const mockItems = makeMockSearchTopics(mockItemsCount)
const mockOnSearchTopicClick = jest.fn()


describe('Component: <SearchList />', () => {
  beforeEach(() => {
    cleanup()
  })

  test.concurrent.each(MockIsFull)('renders correctly with "isFull": %s', (isFull) => {
    cleanup()

    render(
        <SearchList
          isFull={isFull}
          items={mockItems}
          onSearchTopicClick={mockOnSearchTopicClick}
        />
    )

    expect(screen.getByRole('banner'))
      .toHaveTextContent(/Темы фотографий/i)

    const foundLinks = screen.queryAllByRole('link')

    expect(foundLinks.length)
      .toEqual(mockItemsCount)

    foundLinks.forEach((foundLink, index) => {
      mockOnSearchTopicClick.mockClear()

      const href = foundLink.getAttribute('href')
      const slugToBe = mockItems[index].slug

      expect(href)
        .toEqual(`${AppRoute.Topics}${slugToBe}`)

      expect(foundLink)
        .toHaveTextContent(mockItems[index].title)
    })
  })


  it('clicks correctly', () => {
    render(
        <SearchList
          isFull={true}
          items={mockItems}
          onSearchTopicClick={mockOnSearchTopicClick}
        />
    )

    const foundLinks = screen.queryAllByRole('link')

    foundLinks.forEach((foundLink, index) => {
      mockOnSearchTopicClick.mockClear()

      fireEvent.click(foundLink)

      const itemToBe = mockItems[index]

      expect(mockOnSearchTopicClick)
        .toBeCalledWith(itemToBe)
    })
  })


  it('passes "null" as list', () => {
    render(
        <SearchList
          isFull={true}
          items={null as unknown as SearchTopics}
          onSearchTopicClick={jest.fn()}
        />
    )

    expect(screen.queryByRole('heading'))
      .not.toBeInTheDocument()
  })
})
