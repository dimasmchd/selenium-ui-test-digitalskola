const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
const additem = require('../pages/additemPage');
const LoginPage = require('../pages/LoginPage.js');
const InventoryPage = require('../pages/inventoryPage');
const Checkout = require('../pages/checkoutPage');
const screenshotsDir = './screenshots/';
const fs = require('fs');
if (!fs.existsSync(screenshotsDir)){
    fs.mkdirSync(screenshotsDir, {recursive: true});
}
async function checkout(){
    describe ('Menambah Item Ke Cart', function(){
        let driver;
        let browserName = 'chrome';
        let loginPage;
        let addItem;
        let inventoryPage;
        let checkOut;

    beforeEach(async function (){
        this.timeout(30000);
            driver = await new Builder().forBrowser(browserName).build();
            loginPage = new LoginPage(driver);
            inventoryPage = new InventoryPage(driver);
            addItem = new additem(driver);
            checkOut = new Checkout(driver);
            await loginPage.open('https://www.saucedemo.com/');
            await loginPage.login('standard_user', 'secret_sauce');
    });
    it("CO-01 Checkout Items", async function(){
        
        await addItem.getItemToCart();
        cartCount = await addItem.getValidateCart();
        assert.strictEqual(cartCount, '1', 'Cart harus menampilkan angka 1');
        await addItem.getCartItems();
        await checkOut.getCheckOutButton();
        await checkOut.getInformation('Dimas', 'Giffari', '140140');
        await checkOut.getContinue();
        await checkOut.getFinish();
        await checkOut.getCompleteCheckout();
        });
    afterEach(async function (){
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotsDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
        fs.writeFileSync(filepath, screenshot, 'base64');
    });
    })
}

checkout();