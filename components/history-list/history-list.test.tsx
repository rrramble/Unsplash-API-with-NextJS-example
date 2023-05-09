import { cleanup, render, screen } from '@testing-library/react'
import { makeMockHistoryEntries } from '@/utils/mocks'
import HistoryList from './history-list'
import { AppRoute } from 'consts/consts'
import { HistoryEntries } from 'types/history'

const MockItemsCount = [ 0, 1, 100 ]

describe('Component: <SearchList />', () => {
  beforeEach(() => {
    cleanup()
  })

  test.concurrent.each(MockItemsCount)('renders correctly with items count: %s', (mockItemsCount) => {
    cleanup()
    const mockItems = makeMockHistoryEntries(mockItemsCount)

    render(
        <HistoryList
          items={mockItems}
        />
    )

    const foundLinks = screen.queryAllByRole('link')

    expect(foundLinks.length)
      .toEqual(mockItemsCount)

    foundLinks.forEach((foundLink, index) => {
      const href = foundLink.getAttribute('href')
      const { slug, title } = mockItems[index]
      const hrefToBe = slug === undefined ?
        `${AppRoute.Search}/${encodeURIComponent(title)}` :
        `${AppRoute.Topics}${encodeURIComponent(slug)}`

      expect(href)
        .toEqual(hrefToBe)

      expect(foundLink)
        .toHaveTextContent(mockItems[index].title)
    })
  })


  it('passes "null" as list', () => {
    render(
        <HistoryList
          items={null as unknown as HistoryEntries}
        />
    )

    expect(screen.queryByRole('heading'))
      .not.toBeInTheDocument()
  })
})
