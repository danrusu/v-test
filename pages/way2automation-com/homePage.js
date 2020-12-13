'use strict';

const URL = 'http://way2automation.com/way2auto_jquery/index.php';
const TITLE = 'Welcome to the Test Site';

const {
  clickElementIfVisible,
  checkElementIsVisible,
  checkElementIsPresent,
  checkElementIsNotPresentAfter,
  setElementIfVisible,
} = require('../pageUtils');

const elements = {
  body: 'body',
  createAccountForm: {
    form: '#load_form',
    inputTemplate: '#load_box.popupbox [name=$inputNameAttribute]',
    submitButton: '#load_box.popupbox [type=submit]',
  },
  datePickerWidget: {
    selector: '//h2[text()="Datepicker"]/ancestor::li',
    locateStrategy: 'xpath',
  },
};

const createPage = driver => ({
  open: async () => {
    await driver.url(URL);
    await checkElementIsVisible(driver)()(elements.body);
    driver.expect.url().to.equal(URL);
    driver.expect.title().to.equal(TITLE);
  },

  fillRegistrationForm: async registrationFormData => {
    await checkElementIsPresent(driver)()(elements.createAccountForm.form);

    const inputNameAttributes = Object.keys(registrationFormData);
    for (let i = 0; i < inputNameAttributes.length; i++) {
      const inputNameAttribute = inputNameAttributes[i];
      const inputValue = registrationFormData[inputNameAttribute];
      await setElementIfVisible(driver)()(
        elements.createAccountForm.inputTemplate.replace(
          '$inputNameAttribute',
          inputNameAttribute
        )
      )(inputValue);
    }
  },

  submitForm: async () => {
    await clickElementIfVisible(driver)()(
      elements.createAccountForm.submitButton
    );
    await checkElementIsNotPresentAfter(driver)()(
      elements.createAccountForm.submitButton
    );
  },

  openDatePickerWidget: async () => {
    await clickElementIfVisible(driver)()(elements.datePickerWidget);
    driver.expect
      .url()
      .to.equal('http://way2automation.com/way2auto_jquery/datepicker.php');
  },
});

module.exports = {
  createPage,
};
