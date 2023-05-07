import { render, screen } from '@testing-library/react'
import { lorem } from 'faker'
import Favorite from './favorite'
import { AppRoute } from 'consts/consts'


describe('Component: <Favorite />', () => {
  it('renders correctly', () => {
    render(
        <Favorite
          className={lorem.word()}
        />
    )

    expect(screen.getByRole('link', { name: /Избранное/i }))
      .toHaveAttribute('href', AppRoute.Favorites)
  })
})
