const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
const additem = require('../pages/additemPage');
const LoginPage = require('../pages/LoginPage.js');
const InventoryPage = require('../pages/inventoryPage');
const screenshotsDir = './screenshots/';
const fs = require('fs');
if (!fs.existsSync(screenshotsDir)){
    fs.mkdirSync(screenshotsDir, {recursive: true});
}
async function additemtocart(){
    describe ('Menambah Item Ke Cart', function(){
        let driver;
        let browserName = 'chrome';
        let loginPage;
        let addItem;
        let inventoryPage;

    beforeEach(async function (){
        this.timeout(70000);
            driver = await new Builder().forBrowser(browserName).build();
            loginPage = new LoginPage(driver);
            inventoryPage = new InventoryPage(driver);
            addItem = new additem(driver);
            await loginPage.open('https://www.saucedemo.com/');
            await loginPage.login('standard_user', 'secret_sauce');
    });
    it("AC-01 Menambahkan Item Ke Cart dan validate Carts", async function(){
        
        await addItem.getItemToCart();
        cartCount = await addItem.getValidateCart();
        assert.strictEqual(cartCount, '1', 'Cart harus menampilkan angka 1');
        await addItem.getCartItems();
        console.log('BErhasil Menambahkan 1 item ke Cart');
        });
    afterEach(async function (){
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotsDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
        fs.writeFileSync(filepath, screenshot, 'base64');
    });
    })
}

additemtocart();