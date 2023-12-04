const fs = require('fs')
const { expect } = require('@playwright/test')
const locators = require('./locators.js')
const translations = require('./translations.js')

const cookiesAction = async (page, url) => {
  await page.goto(url)
  await page.getByRole('button', {name: translations.agreeAll}).click()
}

const locationSelection = async (page, dialog) => {
  await dialog.locator('wb-select-control').click()

  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
}

const fillInDemo = async (page, dialog) => {
  await dialog.locator('wb-input-control').click()
  await page.keyboard.type('7000')
  await dialog.locator('wb-radio-control').first().click()
}

const filterByColour = async (page, colour) => {  
  await expect(page.locator(locators.filterSvgLocator)).toBeVisible()
  await page.locator(locators.filterSvgLocator).click()

  await page.locator('div').filter({ hasText: /^Colour$/ }).getByRole('img').click()
  await page.locator(locators.colourSelectLocator).getByText(translations.colourSelectLabel).click()
  await page.locator(locators.colourOptionsLocator)
    .filter({ hasText: new RegExp('^ ' + colour + ' $')}).click()
  await page.waitForURL(process.env.MB_USED_CAR_WITH_FILTER_URL+colour)  
}


const sortByPriceDesc = async (page) => {
  await page.getByLabel('Sorting').click()
  await page.keyboard.type('PP', {delay:100})
  await page.keyboard.press('Enter')
  await page.waitForURL(process.env.MB_USED_CAR_WITH_FILTER_AND_SORT_URL)
}

const saveCarData = async (page) => {
  const vin = await page.locator(locators.carDataVinLiLocator).locator(locators.carDataLiValueLocator).innerText()
  const modelYear = await page.locator(locators.carDataModelYearLiLocator).locator(locators.carDataLiValueLocator).innerText()
  await fs.writeFileSync('carData.txt', 'Model Year:' + modelYear + ', VIN:' + vin)
}

module.exports = {
  cookiesAction,
  locationSelection,
  fillInDemo,
  filterByColour,
  sortByPriceDesc,
  saveCarData
}
