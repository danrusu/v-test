'use strict';

const { clickElementIfVisible, navigate } = require('../pageUtils');

const URL = 'https://ghost.org/';

const elements = {
  resourcesMenu: {
    menuButtonXpath: {
      selector: '//header//*[contains(text(), "Resources")]/ancestor::button',
      locateStrategy: 'xpath',
    },
    comunityForumItemXpath: {
      selector: '//*[contains(text(), "Community Forum")]/ancestor::a',
      locateStrategy: 'xpath',
    },
  },
};

const createPage = driver => ({
  open: async bodyVisibilityTimeout =>
    await navigate(driver)(bodyVisibilityTimeout)(URL),

  clickResourcesMenu: async visibilityTimeout =>
    await clickElementIfVisible(driver)(visibilityTimeout)(
      elements.resourcesMenu.menuButtonXpath
    ),

  clickResourcesComunityForum: async visibilityTimeout =>
    await clickElementIfVisible(driver)(visibilityTimeout)(
      elements.resourcesMenu.comunityForumItemXpath
    ),
});

module.exports = {
  createPage,
};
