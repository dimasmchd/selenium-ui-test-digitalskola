const { By } = require('selenium-webdriver');

class CheckoutItem {
    constructor(driver) {
        this.driver = driver; // menyimpan driver agar bisa dipakai di method lain
        this.checkout = By.name('checkout');
        // Memisahkan elemen input untuk tiap field
        this.firstNameInput = By.id('first-name');
        this.lastNameInput = By.id('last-name');
        this.zipcodeInput = By.id('postal-code');
        this.checkoutContinue = By.id('continue');
        this.finishcheckout = By.id('finish');
        this.complete = By.id('checkout_complete_container');
        this.completeMessage = By.css('.checkout_complete_container');
    }

    async getCheckOutButton(){
        await this.driver.findElement(this.checkout).click();
    }

    async getInformation(firstname, lastname, zipcode){
        await this.driver.findElement(this.firstNameInput).sendKeys(firstname);
        await this.driver.findElement(this.lastNameInput).sendKeys(lastname);
        await this.driver.findElement(this.zipcodeInput).sendKeys(zipcode);
    }

    async getContinue(){
        await this.driver.findElement(this.checkoutContinue).click();
    }

    async getFinish(){
        await this.driver.findElement(this.finishcheckout).click();
    }

    async getCompleteCheckout(){
        return await this.driver.findElement(this.complete).getText();
    }

    async getCompleteMessage() {
        return await this.driver.findElement(this.completeMessage).getText();
    }
}

module.exports = CheckoutItem;
