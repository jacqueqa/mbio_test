const { faker } = require('@faker-js/faker')
const { test, expect } = require('@playwright/test')

const homePage = 'https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo'
const modalActions = async page => {
  const dialog = page.getByRole('dialog')
  await page.goto('homePage')
  await page.getByRole('button', {name:'Agree to all'}).click()
  await dialog.locator('wb-select-control').click()
  await page.keyboard.press('ArrowDown')
  await page.locator('wb-input-control').click()
  await page.keyboard.type('7000')
  await page.locator('wb-radio-control').first().click()
  await dialog.getByRole('button', {name:'Continue'}).click()
}

const createUser = async page => {
  await page.type('data-testid=nome', faker.name.findName())
  await page.type('data-testid=email', faker.internet.email())
  await page.click('data-testid=checkbox') //mudar para o que vier da pagina
  await page.click('data-testid=cadastrar')
}

const openHomepage = async page => {
  await page.goto('/cadastrarusuarios')
  await createUser(page)
  await page.waitForNavigation()
}


module.exports = {
  modalActions,
  openHomepage
}
