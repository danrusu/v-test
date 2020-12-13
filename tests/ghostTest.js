'use strict';

const closeDriver = (driver, done) => {
  if (driver.sessionId) {
    driver.end(() => done());
  } else {
    done();
  }
};

const getRandomInIntRange = (minInt, maxInt) =>
  // min and max are inclusive
  Math.floor(Math.random() * (maxInt + 1 - minInt) + minInt);

describe('gost.org', () => {
  it('Should be able to search within Comunity Forum page', async driver => {
    const homePage = require('../pages/ghost-org/homePage').createPage(driver);
    await homePage.open();
    await homePage.clickResourcesMenu();
    await homePage.clickResourcesComunityForum();

    const communityForumPage = require('../pages/ghost-org/communityForumPage').createPage(
      driver
    );
    communityForumPage.checkUrl();
    await communityForumPage.search('create new blog');
    await communityForumPage.checkThatSearchResultsAreReturned();

    // open random topic from search results
    const searchResultStatus = await communityForumPage.getSearchResultsStatus();
    const searchResultsCount = searchResultStatus.replace(/(\d{1,}).*/, '$1');
    const randomTopicIndex = getRandomInIntRange(
      1,
      parseInt(searchResultsCount)
    );
    const randomTopicTitle = await communityForumPage.getTopicTitleByIndex(
      randomTopicIndex
    );
    await communityForumPage.clickTopicByIndex(randomTopicIndex);

    const topicPage = require('../pages/ghost-org/topicPage').createPage(
      driver
    );
    topicPage.checkTopicPageTitle(randomTopicTitle);
  });

  after(closeDriver);
});
