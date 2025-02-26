const {By} = require('selenium-webdriver');

class additem {
    constructor(driver) {
        this.driver = driver;
        this.validatecart = By.xpath('//*[@id="shopping_cart_container"]/a/span');
        this.additemall = By.id('add-to-cart-sauce-labs-backpack');
        this.checkcart = By.xpath('//*[@id="shopping_cart_container"]/a');
        this.valuecart = By.css('.cart_item');
    }
    async getItemToCart() {
        return await this.driver.findElement(this.additemall).click();
    }
    async getValidateCart(){
        return await this.driver.findElement(this.validatecart).getText();
    }
    async getCartItems(){
        return await this.driver.findElement(this.checkcart).click();
    }
}
module.exports = additem;