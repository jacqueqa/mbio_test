const { faker } = require('@faker-js/faker')

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
  createUser,
  openHomepage,
}
