import {
  checkSearchModalHalfOpen,
  checkHistoryModalOpen,
  checkMenuModalsClosed,
  checkSearchModalOpen,
} from './nav-menu'

describe('Site menu behaviour', () => {
  beforeEach('', () => {
    cy.viewport(375, 600).visit('/')
  })

  context('with initial site state', () => {
    it('checks default state', () => {
      cy.get('body').within(checkSearchModalHalfOpen).
        focused().should('not.exist')
    })

    it('checks click on Favorite', () => {
      cy.get('[data-test="menu-favorite"]').click().
        location('pathname').should('eq', '/favorite').
        get('body').within(checkSearchModalHalfOpen)
    })

    it('checks click on History', () => {
      cy.get('[data-test="menu-history"]').click().
        get('body').within(checkHistoryModalOpen).
        get('[data-test="menu-history"]').click().
        get('body').within(checkSearchModalHalfOpen)
    })

    it('checks Search apperance when scrolling window', () => {
      cy.scrollTo(0, -1).
        get('body').within(checkSearchModalHalfOpen).
        get(window).scrollTo(0, 1, { ensureScrollable: false }).
        get('body').within(checkMenuModalsClosed)
    })

    it('checks click on Search icon', () => {
      cy.
        scrollTo(0, 1).get('body').within(checkMenuModalsClosed).
        get('[data-test="menu-search__icon"]').click().
        get('body').within(checkSearchModalOpen)
    })
  })
})
