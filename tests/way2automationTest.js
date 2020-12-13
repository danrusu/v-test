'use strict';

const getUniqueTestData = testDataJsonFile => {
  const testData = require(testDataJsonFile);
  const timestamp = Math.floor(Date.now() / 1000);
  testData.registrationFormData.email = `${timestamp}${testData.registrationFormData.email}`;
  testData.registrationFormData.username = `${testData.registrationFormData.username}_${timestamp}`;
  testData.registrationFormData.password = `${testData.registrationFormData.password}_${timestamp}`;
  return testData;
};

const way2automationTest = async driver => {
  const { registrationFormData, dateFormat } = getUniqueTestData(
    '../test-data/way2automationTestData.json'
  );

  const homePage = require('../pages/way2automation-com/homePage').createPage(
    driver
  );

  await homePage.open();

  await homePage.fillRegistrationForm(registrationFormData);

  await homePage.submitForm();

  await homePage.openDatePickerWidget();

  const datePickerWidgetPage = require('../pages/way2automation-com/datePickerWidgetPage').createPage(
    driver
  );

  await datePickerWidgetPage.openFormatSection();

  const currentDate = new Date();

  await datePickerWidgetPage.selectDate(currentDate);

  const currentFormat = await datePickerWidgetPage.selectDateFormat(dateFormat);

  await datePickerWidgetPage.validateDate(currentDate)(currentFormat);

  await driver.end();
};

module.exports = {
  'Datepicker format current date test': way2automationTest,
};
