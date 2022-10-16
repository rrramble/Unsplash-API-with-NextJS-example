describe('Index page "/"', () => {
    beforeEach(() => {
      cy.visit('/').wait(100)
    })

    it('checks Layout buttons', () => {
      cy.get('[data-test="images-layout-button"]').
        should('be.visible').
        should('have.length', 2)
    })

    it('checks Images', () => {
      cy.get('[data-test="image-card"]').
      each(($imageCard, index) => {
        if (index > 5) {
          return false
        }
        cy.wrap($imageCard).within(checkImageCard)
      })
    })
  })

function checkImageCard($imageCard) {
    cy.get('[data-test="image-card__image"]').
      should('be.visible').
      should('have.length', 1).
      should('have.attr', 'src').
      and('match', /^https:\/\/images.unsplash.com\/photo-/)

    checkLikeButton(
      $imageCard.find('[data-test="menu-item"]').get()[0]
    )

    checkOpenButton(
      $imageCard.find('[data-test="menu-item"]').get()[1]
    )

    checkDownloadButton(
      $imageCard.find('[data-test="menu-item"]').get()[2]
    )
  }

function checkLikeButton($el) {
  cy.wrap($el).find('input').should('exist')
}

function checkOpenButton($el) {
  cy.wrap($el).find('a').
    should('have.attr', 'href').
    and('match', /^\/photo\//, { matchCase: false })
}

function checkDownloadButton($el) {
  cy.wrap($el).find('button').should('exist')
}
