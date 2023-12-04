const { test, expect } = require('@playwright/test')
const fs = require('fs')

test.describe('Check mandatory actions', () => {
  test('Verify modal behavior', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await page.goto('https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo')
    await page.getByRole('button', {name:'Agree to all'}).click()
    await dialog.locator('wb-select-control').click()

    await page.keyboard.press('ArrowDown')
    await page.locator('wb-input-control').click()
    await page.keyboard.type('7000')
    await page.locator('wb-radio-control').first().click()
    await dialog.getByRole('button', {name:'Continue'}).click()
    await expect(page).toHaveTitle(/Search Overview/)
  })

  test('Verify vehicles filter behavior', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await page.goto('https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/used')
    await page.getByRole('button', {name:'Agree to all'}).click()

    await dialog.locator('wb-select-control').click()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await dialog.getByRole('button', {name:'Continue'}).click()

    const cssSelector = 'div.dcp-shop:nth-child(1) div.dcp-shop__container div.dcp-cars-srp div.wrapper div.sidebar > span.filter-toggle'
    await page.locator(cssSelector).click()
    await page.locator('div').filter({ hasText: /^Colour$/ }).getByRole('img').click()
    await page.locator('a[data-test-id="multi-select-dropdown-card-opener"]').getByText('Colour 0').click()
    await page.locator('a[class="dcp-filter-pill dcp-multi-select-dropdown-card-pill-wrapper__pill dcp-filter-pill--full-width"]')
      .filter({ hasText: /^ BRILLANTBLUE metallic $/}).click()
    await page.waitForURL('https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/used?sort=relevance-ucos&assortment=vehicle&color_text=BRILLANTBLUE%20metallic')
    await page.getByLabel('Sorting').click()
    await page.keyboard.type('PP', {delay:100})
    await page.keyboard.press('Enter')
    await page.waitForURL('https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/used?sort=price-desc-ucos&assortment=vehicle&color_text=BRILLANTBLUE%20metallic')
    await page.locator('div[class="dcp-cars-srp-results__tile"]').first().click()
    await page.waitForURL('https://shop.mercedes-benz.com/en-au/shop/vehicle/pdp/AU2300080929T')

    const vin = await page.locator('li[data-test-id="dcp-vehicle-details-list-item-11"]').locator('span[class="dcp-vehicle-details-list-item__value"]').innerText()
    const modelYear = await page.locator('li[data-test-id="dcp-vehicle-details-list-item-3"]').locator('span[class="dcp-vehicle-details-list-item__value"]').innerText()
    await fs.writeFileSync('carData.txt', 'Model Year:' + modelYear + ', VIN:' + vin)
  })

  
  test('Verify email invalid error', async ({ page }) => {
    const dialog = page.getByRole('dialog')
    await page.goto('https://shop.mercedes-benz.com/en-au/shop/vehicle/pdp/AU2300080929T')
    await page.getByRole('button', {name:'Agree to all'}).click()
    await dialog.locator('wb-select-control').click()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await dialog.getByRole('button', {name:'Continue'}).click()

    await page.locator('button[data-test-id="dcp-buy-box__contact-seller"]').click()
    
    await page.locator('div[data-test-id="rfq-contact__email"]').locator('input').fill('invalid_email')
    await page.locator('button[data-test-id="dcp-rfq-contact-button-container__button-next"]').click()

    expect(page.locator('div[data-test-id="rfq-contact__email"]').textContent())
      .toContain('Please enter a valid email address using a minimum of six characters.')
  })
})