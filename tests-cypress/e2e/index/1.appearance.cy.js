describe('Index page "/"', () => {
    beforeEach(() => {
      cy.visit('/').wait(100)
    })
// TODO: change "[class]" to "[data-]"" attribute
    it('checks menu icons: Logotype, Search, Favorites, History)', () => {
      cy.get('header nav [data-test="menu-logo"]').
        find('a').should('have.attr', 'href', '/').
        find('img:visible').should('have.attr', 'alt', 'Логотип')

      cy.get('header nav [data-test="menu-search"]').
        find('button').eq(0).should('not.be.visible').should('have.text', 'Поиск')

      cy.get('header nav [data-test="menu-favorite"]').
        find('a').eq(0).should('have.attr', 'href', '/favorite').should('have.text', 'Избранное')

      cy.get('header nav [data-test="menu-history"').
        find('button').eq(0).should('have.text', 'История поиска')
    })

    it('checks Search modal', () => {
      cy.get('[data-test="menu-search__modal"]').should('be.visible')
      cy.get('[data-test="menu-search__input-container').should('be.visible')
      cy.get('[data-test="menu-search__topic-list').should('be.visible')
    })

    it('checks History modal', () => {
      cy.get('[data-test="menu-history__modal"]').should('not.be.visible')
    })

    it('checks Layout buttons', () => {
      cy.get('[data-test="images-layout-button"]').
        should('be.visible').
        should('have.length', 2)
    })

    it('checks Images', () => {
      cy.get('main ul[class^="image-cards"] > li').
        each(($imageCard, index) => {
          if (index > 5) {
            return false
          }
          checkImageCard($imageCard)
        })
    })
  })

function checkImageCard($imageCard) {
    cy.wrap($imageCard).find('img[class^="image-card_image"]:visible').
      should('have.length', 1).
      should('have.attr', 'src').
      and('match', /^https:\/\/images.unsplash.com\/photo-/)

    $imageCard.find('menu > li[class^="image-card-menu_"]').map((index, i) => {
      if (index === 0) checkLikeButton(i)
      if (index === 1) checkOpenButton(i)
      if (index === 2) checkDownloadButton(i)
    })
  }

function checkLikeButton($el) {
  cy.wrap($el).find('input')
}

function checkOpenButton($el) {
  cy.wrap($el).find('a').
    should('have.attr', 'href').
    and('match', /^\/photo\//, { matchCase: false })
}

function checkDownloadButton($el) {
  cy.wrap($el).find('button')
}
