export function checkSearchModalHalfOpen() {
  context('checks menu icons: Logotype, Search, Favorites, History', () => {
    cy.get('header nav [data-test="menu-logo"]').
      find('a').should('have.attr', 'href', '/').
      find('img:visible').should('have.attr', 'alt', 'Логотип')

    cy.get('header nav [data-test="menu-search"]').
      find('button').eq(0).
      // should('not.be.visible'). // TODO
      should('have.text', 'Поиск')

    cy.get('header nav [data-test="menu-favorite"]').
      find('a').eq(0).
      should('have.attr', 'href', '/favorite').
      should('have.text', 'Избранное')

    cy.get('header nav [data-test="menu-history"]').
      find('button').eq(0).should('have.text', 'История поиска')
  })

  context('checks Search modal', () => {
    cy.get('[data-test="menu-search__icon"]').
      should('not.be.visible')

    cy.get('[data-test="menu-search__modal"]').
      should('be.visible')

    cy.get('[data-test="menu-search__input-container"]').
      should('be.visible')

    cy.get('[data-test="menu-search__topic-list"]').
      should('be.visible')
  })

  context('checks History modal', () => {
    cy.get('[data-test="menu-history__modal"]').
      should('not.be.visible')
  })
}


export function checkHistoryModalOpen() {
  context('checks menu icons: Logotype, Search, Favorites, History', () => {
    cy.get('header nav [data-test="menu-logo"]').
      find('a').should('have.attr', 'href', '/').
      find('img:visible').should('have.attr', 'alt', 'Логотип')

    cy.get('header nav [data-test="menu-search"]').
      find('button').eq(0).
      // should('not.be.visible'). // TODO
      should('have.text', 'Поиск')

    cy.get('header nav [data-test="menu-favorite"]').
      find('a').eq(0).
      should('have.attr', 'href', '/favorite').
      should('have.text', 'Избранное')

    cy.get('header nav [data-test="menu-history"]').
      find('button').eq(0).should('have.text', 'История поиска')
  })

  context('checks Search modal', () => {
    /*cy.get('[data-test="menu-search__icon"]').
      should('not.be.visible') */ // TODO

    cy.get('[data-test="menu-search__modal"]').
      should('not.be.visible')

    cy.get('[data-test="menu-search__input-container"]').
      should('not.be.visible')

    cy.get('[data-test="menu-search__topic-list"]').
      should('not.be.visible')
  })

  context('checks History modal', () => {
    cy.get('[data-test="menu-history__modal"]').
      should('be.visible')
  })
}


export function checkMenuModalsClosed() {
  it('checks menu icons: Logotype, Search, Favorites, History', () => {
    cy.get('header nav [data-test="menu-logo"]').
      find('a').should('have.attr', 'href', '/').
      find('img:visible').should('have.attr', 'alt', 'Логотип')

    cy.get('header nav [data-test="menu-search"]').
      find('button').eq(0).
      should('be.visible').
      should('have.text', 'Поиск')

    cy.get('header nav [data-test="menu-favorite"]').
      find('a').eq(0).
      should('have.attr', 'href', '/favorite').
      should('have.text', 'Избранное')

    cy.get('header nav [data-test="menu-history"').
      find('button').eq(0).should('have.text', 'История поиска')
  })

  it('checks Search modal', () => {
    cy.get('[data-test="menu-search__icon"]').
      should('not.be.visible')
    cy.get('[data-test="menu-search__modal"]').
      should('not.be.visible')
    cy.get('[data-test="menu-search__input-container').
      should('not.be.visible')
    cy.get('[data-test="menu-search__topic-list').
      should('not.be.visible')
  })

  it('checks History modal', () => {
    cy.get('[data-test="menu-history__modal"]').
      should('not.be.visible')
  })
}

export function checkSearchModalOpen() {
  cy.get('header nav [data-test="menu-logo"]').
    find('a').should('have.attr', 'href', '/').
    find('img:visible').should('have.attr', 'alt', 'Логотип')

  cy.get('header nav [data-test="menu-search__icon"]').
    should('not.be.visible').
    should('have.text', 'Поиск')

  cy.get('header nav [data-test="menu-favorite"]').
    find('a').eq(0).
    should('have.attr', 'href', '/favorite').
    should('have.text', 'Избранное')

  cy.get('header nav [data-test="menu-history"]').
    find('button').eq(0).should('have.text', 'История поиска')

  cy.get('[data-test="menu-search__icon"]').
    should('not.be.visible').
    get('[data-test="menu-search__modal"]').
    should('be.visible').
    get('[data-test="menu-search__input-container"]').
    should('be.visible').
    get('[data-test="menu-search__topic-list"]').
    should('be.visible').

    get('[data-test="menu-history__modal"]').
    should('not.be.visible')
}
