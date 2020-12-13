'use strict';

const { checkElementText } = require('../pageUtils');

const elements = {
  topicTitle: '.fancy-title',
};

const createPage = driver => ({
  checkTopicPageTitle: (expectedTopicTitle, timeout) =>
    checkElementText(driver)(timeout)(elements.topicTitle)(expectedTopicTitle),
});

module.exports = {
  createPage,
};
