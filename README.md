
# Javascript - Tests for MB.IO

Repository with exercise on automated tests for MB.io using **[Playwright](https://playwright.dev/)**.

For this project the following stack was used

- JavaScript
- Docker
- Playwright

**NOTE:**  Windows as OS with WSL

-----------------------

## Pre-requisites

### Node.js

Make sure to have the correct Node version installed, which can be found in `.nvmrc` file in the repository root. 

### Yarn

The project also uses [Yarn](https://yarnpkg.com/), if yout don't have, please follow the  [installation steps](https://classic.yarnpkg.com/lang/en/docs/install/).

## To run using Docker

- Perform all the tests on the container `docker-compose up`
- To perform the tests one by one using the docker build: `docker-compose up -d` 
- To teardown `docker-compose down`


## Running locally

- Install dependencies: `yarn install`
- Run End-to-end tests: `yarn test:e2e`
- Run End-to-end tests with html report: `yarn test:e2e:html`

-----------------------

### Mandatory Steps

- [x] Open the Mercedes-Benz Shop used cars in Australian market.
- [x] Fullfil the dialog input data
- [x] Click on the filter icon
- [x] Select Pre-Owned Tab
- [x] Select to filter by Colour
- [x] Navigate to the Vehicle Details of the most expensive car on the filtered results.
- [x] Save the following car details to a file:
    **VIN number**
    **Model Year**
- [x] In the side vehicle details click “Enquire Now”
- [x] Fill the “Contact Details and Account Creation” form with invalid data. (e.g. with an invalid email format)
- [x] Click "Proceed" and validate the error.

![image](https://github.com/jacqueqa/mbio_test/assets/77998671/0a0d1d92-73b2-48f0-bcd1-5a0bce98a0b3)



-----------------------

### License

[![License](https://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2023 © <a href="https://github.com/jacqueqa" target="_blank">Jacqueline Tatiani</a>
