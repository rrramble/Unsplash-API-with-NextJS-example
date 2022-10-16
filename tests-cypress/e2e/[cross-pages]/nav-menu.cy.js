import {
  checkSearchModalHalfOpen,
  checkHistoryModalOpen,
  checkMenuModalsClosed,
  checkSearchModalOpen,
} from './nav-menu'

describe('Site menu behaviour', () => {
  beforeEach('', () => {
    cy.viewport(375, 600).visit('/').wait(100)
  })

  context('with initial site state', () => {
    it('checks default state', () => {
      checkSearchModalHalfOpen()
      cy.focused().should('not.exist')
    })

    it('checks click on Favorite', () => {
      cy.get('[data-test="menu-favorite"]').click().wait(50)
      cy.location('pathname').should('eq', '/favorite')
      checkSearchModalHalfOpen()
    })

    it('checks click on History', () => {
      cy.get('[data-test="menu-history"]').click().wait(50)
      checkHistoryModalOpen()

      cy.get('[data-test="menu-history"]').click().wait(50)
      checkSearchModalHalfOpen()
    })

    it('scrolls window', () => {
      cy.scrollTo(0, 0)
      checkSearchModalHalfOpen()

      cy.scrollTo(0, 1)
      checkMenuModalsClosed()
    })

    it.only('checks click on Search icon', () => {
      cy.
        scrollTo(0, 1).get('body').within(checkMenuModalsClosed).
        get('[data-test="menu-search__icon"]').click().
        get('body').within(checkSearchModalOpen)
    })
  })
})
