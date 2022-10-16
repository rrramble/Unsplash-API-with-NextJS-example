import { checkDefaultSiteState } from './nav-menu'

describe('Site menu behaviour', () => {
  beforeEach('', () => {
    cy.visit('/').wait(100)
  })

  context('with initial site state', () => {
    it('checks default state', () => {
      checkDefaultSiteState()
    })
  })
})
