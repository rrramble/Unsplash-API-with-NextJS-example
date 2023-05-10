import { cleanup, render, screen } from '@testing-library/react'
import { configureMockStore } from '@jedmao/redux-mock-store';
import LayoutButtons from './layout-buttons'
import { Provider } from 'react-redux'
import { AppState } from 'types/state';
import { Action } from '@reduxjs/toolkit';

const makeMockStore = configureMockStore<
  AppState,
  Action<string>
>([]);

const mockStoreZeroColumns = makeMockStore({ columnCount: 0 })
const mockStoreOneColumn = makeMockStore({ columnCount: 1 })
const mockStoreTwoColumns = makeMockStore({ columnCount: 2 })
const mockStoreThreeColumns = makeMockStore({ columnCount: 3 })
const mockStoreTenColumns = makeMockStore({ columnCount: 10 })

const mockStores = [
  mockStoreZeroColumns,
  mockStoreOneColumn,
  mockStoreTwoColumns,
  mockStoreThreeColumns,
  mockStoreTenColumns,
]

describe('Component: <LayoutButtons>', () => {
  beforeEach(() => {
    cleanup()
  })

  test.concurrent.each(mockStores)('renders correctly', (mockStore) => {
    cleanup()

    render(
        <Provider store={mockStore}>
          <LayoutButtons />
        </Provider>
    )

    const inputs = screen.getAllByRole('radio')

    expect(inputs).toHaveLength(2)

    inputs.forEach(input => {
      expect(input).toBeDisabled()
    })
  })


  it('renders "zero" columns', () => {
    render(
        <Provider store={mockStoreZeroColumns}>
          <LayoutButtons />
        </Provider>
    )

    const [ oneColumn, severalColumns ] = screen.getAllByRole('radio')

    expect(oneColumn).toHaveAttribute('checked')
    expect(severalColumns).not.toHaveAttribute('checked')
  })

  it('renders one columns', () => {
    render(
        <Provider store={mockStoreZeroColumns}>
          <LayoutButtons />
        </Provider>
    )

    const [ oneColumn, severalColumns ] = screen.getAllByRole('radio')

    expect(oneColumn).toHaveAttribute('checked')
    expect(severalColumns).not.toHaveAttribute('checked')
  })


  it('renders two columns', () => {
    render(
        <Provider store={mockStoreTwoColumns}>
          <LayoutButtons />
        </Provider>
    )

    const [ oneColumn, severalColumns ] = screen.getAllByRole('radio')

    expect(oneColumn).not.toHaveAttribute('checked')
    expect(severalColumns).toHaveAttribute('checked')
  })


  it('renders three columns', () => {
    render(
        <Provider store={mockStoreThreeColumns}>
          <LayoutButtons />
        </Provider>
    )

    const [ oneColumn, severalColumns ] = screen.getAllByRole('radio')

    expect(oneColumn).not.toHaveAttribute('checked')
    expect(severalColumns).toHaveAttribute('checked')
  })


  it('renders ten columns', () => {
    render(
        <Provider store={mockStoreTenColumns}>
          <LayoutButtons />
        </Provider>
    )

    const [ oneColumn, severalColumns ] = screen.getAllByRole('radio')

    expect(oneColumn).not.toHaveAttribute('checked')
    expect(severalColumns).toHaveAttribute('checked')
  })
})
