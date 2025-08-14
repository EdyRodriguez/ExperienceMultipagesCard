// extension.js
module.exports = {
  name: 'MultiPagesEdy',
  publisher: 'Edy',
  cards: [{
    type: 'MultiPagesCard',
    source: './src/cards/MultiPagesCard',
    title: 'MultiPages Card',
    displayCardType: 'MultiPages Card',
    description: 'This is an introductory card to the Ellucian Experience SDK'
  }],
  page: {
    source: './src/page/router.jsx'
  }
};
