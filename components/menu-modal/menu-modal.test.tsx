import { cleanup, render, screen } from '@testing-library/react'
import MenuModal from './menu-modal'
import { lorem } from 'faker'

const isFullHeightStates = [ true, false ]


describe('Component: <MenuModal>', () => {
  test.concurrent.each(isFullHeightStates)('renders component with attr "isFullHeight:" %s', (isFullHeight) => {
    cleanup()
    const mockChild = lorem.sentences()

    render(
        <MenuModal
          className="MOCK_CLASSNAME"
          dataTestId="MOCK_DATA_TEST_ID"
          isFullHeight={isFullHeight}
          isHidden={false}
        >
          {mockChild}
        </MenuModal>
    )

    expect(screen.getByTestId('MOCK_DATA_TEST_ID'))
      .toBeInTheDocument()

    expect(screen.getByText(mockChild))
      .toBeInTheDocument()
  })


  test.concurrent.each(isFullHeightStates)('renders null component with attr "isFullHeight:" %s', (isFullHeight) => {
    cleanup()

    render(
        <MenuModal
          className="MOCK_CLASSNAME"
          dataTestId="MOCK_DATA_TEST_ID"
          isFullHeight={isFullHeight}
          isHidden={true}
        />
    )

    expect(screen.queryByTestId('MOCK_DATA_TEST_ID'))
      .not.toBeInTheDocument()
  })
})
