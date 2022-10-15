describe('Index page "/"', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('Checks menu icons: Logotype, Search, Favorites, History)', () => {
      cy.get('header nav').find('a').eq(0).find('img:visible').eq(0).should('have.attr', 'alt', 'Логотип')
      cy.get('header nav').find('button').eq(0).should('have.text', 'Поиск')      
      // cy.get('header nav').find('a').eq(1).should('have.text', 'Избранное') // TODO
      cy.get('header nav').find('button:visible').eq(1).should('have.text', 'История поиска')
    })
    /*
    it('Checks Images', () => {
      const imageCards = cy.get('main').get('ul[class^="image-cards"]').get('li')
      
      imageCards.should('be.at.least', 3)
      imageCards.should(lis => lis.forEach(checkImageCard))

    })*/
  })
  
  function checkImageCard(li) {
    li.get('img').should('exist')

    // Local menu
    const menuItems = li.find('menu li')
    menuItems.should('have.length', 3)

    menuItems.eq(0).find('input[type="checkbox"]').should('have.text', '')
  }