  
    let stateDropDown = "xpath=//wb-select-control[class='dcp-header-location-modal-dropdown hydrated']"
    let postalCodeInput = "input[@id='sqk50x1zn']" 
    let privateRadioBtn = "//span[contains(text(),'Private')]"
    let continueBtn = "//data-test-id='state-selected-modal__close'"
    let tasmaniaPostalCode = "7000"  
    let pageTitle = "//h1[contains(text(),'Explore available vehicles and order online')]"
    let filter = "//body/div[@id='app']"
    await page.goto('/');
