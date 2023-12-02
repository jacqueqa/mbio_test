const { test, expect } = require('@playwright/test');
const common = require("../resources/locator.js")

test.only('Verify if list of vehicles can be access successful', async ({ page }) => {
  
    let stateDropDown = "xpath=//wb-select-control[class='dcp-header-location-modal-dropdown hydrated']"
    let postalCodeInput = "input[@id='sqk50x1zn']" 
    let privateRadioBtn = "//span[contains(text(),'Private')]"
    let continueBtn = "//data-test-id='state-selected-modal__close'"
    let tasmaniaPostalCode = "7000"  
    let pageTitle = "//h1[contains(text(),'Explore available vehicles and order online')]"
    let filter = "//body/div[@id='app']"
    await page.goto('/');

    await expect(page).toHaveTitle(/Please choose your Mercedes-Benz Shop./);
    await page.getByRole('select').click()
    await stateDropDown.getByRole('option', {name:'Tasmania'}).click()
    await stateDropDown.getByRole('input', {type:'number'}).fill('7000')
    await stateDropDown.locator(privateRadioBtn).click()
    await stateDropDown.getByRole('button').click()



  });

test('Verify if title and location are correctly displayed   ', async ({ page }) => {
    await page.goto('https://playwright.dev/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Explore available vehicles and order online/);
  });