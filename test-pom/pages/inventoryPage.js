const {By, until} = require('selenium-webdriver');

class InventoryPage {
    constructor(driver) {
        this.driver = driver;
        this.inventoryList = By.xpath('//*[@id="inventory_container"]');
        this.appLogo = By.css(".app_logo");
        this.productLocator = By.xpath('//*[@id="cart_contents_container"]/div/div[1]');
    }
    async getTitleText() {
        return await this.driver.findElement(this.appLogo).getText();
    }
    async getInventoryItems() {
        return await this.driver.findElements(this.inventoryList);
    }
    
    async getproductCount(){
        await this.driver.wait(until.elementsLocated(this.productLocator));
        const products = await this.driver.findElements(this.productLocator);
        return products.length;
    }
    
}

module.exports = InventoryPage;