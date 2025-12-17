// extension.js
module.exports = {
  name: 'MultiPages',
  publisher: 'Sample',
  cards: [{
    type: 'MultiPagesCard',
    source: './src/cards/MultiPagesCard',
    title: 'MultiPages Card',
    displayCardType: 'MultiPages Card',
    description: 'This is an introductory card to the Ellucian Experience SDK',
    pageRoute: {
      route: '/',
      excludeClickSelectors: ['a','button']
    }
  }],
  page: {
    source: './src/page/router.jsx'
  }
}
