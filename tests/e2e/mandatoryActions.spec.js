const { test, expect } = require('@playwright/test')
const methods = require('../../resources/methods.js')
const locators = require('../../resources/locators.js')
const translations = require('../../resources/translations.js')

test.describe('Check mandatory steps', () => {
  test('Verify modal behavior', async ({ page }) => {
    const dialog = page.getByRole('dialog')

    await methods.cookiesAction(page, process.env.MB_DEMO_URL)
    await methods.locationSelection(page, dialog)
    await methods.fillInDemo(page, dialog)

    await dialog.getByRole('button', {name:translations.continueButton}).click()
    await expect(page).toHaveTitle(translations.searchTitle)    // Validation 1
  })

  test('Verify vehicles filter behavior', async ({ page }) => {
    const dialog = page.getByRole('dialog')

    await methods.cookiesAction(page, process.env.MB_USED_URL)
    await methods.locationSelection(page, dialog)

    await dialog.getByRole('button', {name:translations.continueButton}).click()

    await methods.filterByColour(page, translations.carColour)
    await methods.sortByPriceDesc(page)
    
    await page.locator(locators.carCardLocator).first().click()
    await page.waitForURL(process.env.MB_CAR_PAGE_URL)

    await methods.saveCarData(page)
  })
  
  test('Verify email invalid error', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    
    await methods.cookiesAction(page, process.env.MB_CAR_PAGE_URL)
    await methods.locationSelection(page, dialog)
    await dialog.getByRole('button', {name:translations.continueButton}).click()

    await page.locator(locators.endorseNowButtonLocator).click()
    
    await page.locator(locators.contactEmailLocator).locator('input').fill('invalid_email')
    await page.locator(locators.contactSubmitButtonLocator).click()

    await expect(page.getByText(translations.emailErrorMessage)).toBeVisible()    // Validation 2 
  })
})