import { render, screen } from '@testing-library/react'
import HeaderLogo from './header-logo'
import { AppRoute } from 'consts/consts'


describe('Component: <HeaderLogo>', () => {
  it('renders component on the root page', () => {
    render(
        <HeaderLogo
          className={'FAKE_CLASS_NAME'}
          isRootPage={true}
        />
    )

    expect(screen.queryByRole('link'))
      .not.toBeInTheDocument()

    expect(screen.getByRole('img'))
      .toBeInTheDocument()
  })


  it('renders component not on the root page', () => {
    render(
        <HeaderLogo
          className={'FAKE_CLASS_NAME'}
          isRootPage={false}
        />
    )

    expect(screen.getByRole('link'))
      .toHaveAttribute('href', AppRoute.Root)

    expect(screen.getByRole('img'))
      .toBeInTheDocument()
  })
})
