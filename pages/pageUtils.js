'use strict';

const DEFAULT_MILLISECONDS_TIMEOUT = 5000;

const getDefaulttimeout = () => DEFAULT_MILLISECONDS_TIMEOUT;

const clickElementIfVisible = driver => (
  timeout = DEFAULT_MILLISECONDS_TIMEOUT
) => async selector => {
  await driver.expect.element(selector).to.be.visible.before(timeout);
  await driver.click(selector);
};

const setElementIfVisible = driver => (
  timeout = DEFAULT_MILLISECONDS_TIMEOUT
) => selector => async textValue => {
  await driver.expect.element(selector).to.be.visible.before(timeout);
  //await driver.clearValue(selector);
  await driver.setValue(selector, textValue);
};

const getElementTextIfVisible = driver => (
  timeout = DEFAULT_MILLISECONDS_TIMEOUT
) => async selector => {
  await driver.expect.element(selector).to.be.visible.before(timeout);
  return (await driver.getText(selector)).value;
};

const navigate = driver => (
  timeout = DEFAULT_MILLISECONDS_TIMEOUT
) => async url => {
  await driver.url(url);
  await driver.expect.element('body').to.be.visible.before(timeout);
};

const checkElementIsPresent = driver => (
  timeout = DEFAULT_MILLISECONDS_TIMEOUT
) => async selector =>
  await driver.expect.element(selector).to.be.present.before(timeout);

const checkElementIsNotPresentAfter = driver => (
  timeout = DEFAULT_MILLISECONDS_TIMEOUT
) => async selector =>
  await driver.expect.element(selector).to.not.be.present.after(timeout);

const checkElementIsVisible = driver => (
  timeout = DEFAULT_MILLISECONDS_TIMEOUT
) => async selector =>
  await driver.expect.element(selector).to.be.visible.after(timeout);

const checkElementText = driver => (
  timeout = DEFAULT_MILLISECONDS_TIMEOUT
) => selector => expectedText =>
  driver.expect.element(selector).text.to.equal(expectedText).before(timeout);

module.exports = {
  checkElementIsPresent,
  checkElementIsVisible,
  checkElementIsNotPresentAfter,
  checkElementText,
  clickElementIfVisible,
  getElementTextIfVisible,
  getDefaulttimeout,
  navigate,
  setElementIfVisible,
};
