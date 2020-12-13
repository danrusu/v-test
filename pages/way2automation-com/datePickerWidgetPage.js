'use strict';

const { clickElementIfVisible } = require('../pageUtils');

const elements = {
  formatDateSectionLink: {
    selector: '//a[text()="Format date"]',
    locateStrategy: 'xpath',
  },
  formatDateSectionSelector: {
    selector: '//a[text()="Format date"]/ancestor::li',
    locateStrategy: 'xpath',
  },
  datePickerInput: '#datepicker',
  currentDayCellTemplate: {
    selector: '//*[@id="ui-datepicker-div"]//a[text()=$date]',
    locateStrategy: 'xpath',
  },
  dateFormatSelect: '#format',
  dateFormatOptionTemplate: {
    selector: '//option[contains(text(),"$dateFormat")]',
    locateStrategy: 'xpath',
  },
};

const replaceSelectorTemplate = (selectorTemlate, toReplace, replacement) => ({
  ...selectorTemlate,
  selector: selectorTemlate.selector.replace(toReplace, replacement),
});

const getFormatDateFrameIndex = async driver => {
  const href = (
    await driver.getAttribute(elements.formatDateSectionLink, 'href')
  ).value;

  return parseInt(href.replace(/.*-(\d{1,})$/, '$1')) - 1;
};

const createPage = driver => ({
  openFormatSection: async () => {
    await clickElementIfVisible(driver)()(elements.formatDateSectionSelector);
    driver.expect
      .element(elements.formatDateSectionSelector)
      .to.have.property('className')
      .equals('active');
  },

  selectDate: async date => {
    const formatDateFrameIndex = await getFormatDateFrameIndex(driver);
    await driver.frame(formatDateFrameIndex);
    await clickElementIfVisible(driver)()(elements.datePickerInput);
    const currentDayCellSelector = replaceSelectorTemplate(
      elements.currentDayCellTemplate,
      '$date',
      date.getDate()
    );
    await clickElementIfVisible(driver)()(currentDayCellSelector);
    await driver.frame(null);
  },

  selectDateFormat: async dateFormat => {
    const formatDateFrameIndex = await getFormatDateFrameIndex(driver);
    await driver.frame(formatDateFrameIndex);
    await clickElementIfVisible(driver)()(elements.dateFormatSelect);
    const dateFormatOptionSelector = replaceSelectorTemplate(
      elements.dateFormatOptionTemplate,
      '$dateFormat',
      dateFormat
    );

    //TODO this seems wrong yy shoud format to 20, not 2020
    const format = (
      await driver.getAttribute(dateFormatOptionSelector, 'value')
    ).value.replace(/y/g, 'yy');

    await clickElementIfVisible(driver)()(dateFormatOptionSelector);
    await driver.frame(null);

    return format;
  },

  validateDate: driver => date => async format => {
    const formatDateFrameIndex = await getFormatDateFrameIndex(driver);
    await driver.frame(formatDateFrameIndex);
    const dateFormatter = require('dateformat');
    const formattedDate = dateFormatter(date, format);

    driver.expect
      .element(elements.datePickerInput)
      .to.have.value.that.equals(formattedDate);

    await driver.frame(null);
  },
});

module.exports = {
  createPage,
};
