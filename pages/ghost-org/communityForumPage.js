'use strict';

const {
  clickElementIfVisible,
  getElementTextIfVisible,
  setElementIfVisible,
  checkElementIsNotPresentAfter,
} = require('../pageUtils');

const URL = 'https://forum.ghost.org/';

const elements = {
  search: {
    topButton: '#search-button',
    textInput: '#search-term',
    googleSearchButton: '#google-search',
    resultsCount: {
      selector:
        '//*[@class="result-count"][*[contains(text(), "results for")]]',
      locateStrategy: 'xpath',
    },
  },

  topicLinks: {
    selector: '//*[@class="search-link"][*[@class="topic-title"]]',
    locateStrategy: 'xpath',
  },

  getTopicLinksSelectorByIndex: index => ({
    selector: `(${elements.topicLinks.selector})[${index}]`,
    locateStrategy: 'xpath',
  }),
};

const createPage = driver => ({
  checkUrl: () => driver.expect.url().to.startWith(URL),

  search: async (textValue, visibilityTimeout) => {
    await clickElementIfVisible(driver)(visibilityTimeout)(
      elements.search.topButton
    );
    await setElementIfVisible(driver)(visibilityTimeout)(
      elements.search.textInput
    )(textValue);
    await driver.keys(driver.Keys.ENTER);
  },

  checkThatSearchResultsAreReturned: async timeout =>
    await checkElementIsNotPresentAfter(driver)(timeout)(
      elements.search.googleSearchButton
    ),

  getSearchResultsStatus: async searchTimeout =>
    await getElementTextIfVisible(driver)(searchTimeout)(
      elements.search.resultsCount
    ),

  getTopicsCount: async () => await driver.elements(elements.topicLinks),

  getTopicTitleByIndex: async index => {
    const topicSelector = elements.getTopicLinksSelectorByIndex(index);
    return (await driver.getText(topicSelector)).value;
  },

  clickTopicByIndex: async index => {
    const topicSelector = elements.getTopicLinksSelectorByIndex(index);
    await clickElementIfVisible(driver)()(topicSelector);
  },
});

module.exports = {
  createPage,
};
