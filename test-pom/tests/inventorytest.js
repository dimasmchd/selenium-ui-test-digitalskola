const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const LoginPage = require('../pages/LoginPage.js');
const InventoryPage = require('../pages/inventoryPage.js');
const AddtoCart = require('../pages/additemPage.js');
const fs = require('fs');
const screenshotsDir = './screenshots/';

if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function inventoryvalid() {
    describe('Validasi Inventory', function() {
        this.timeout(70000);
        let driver;
        let browserName = 'chrome';
        let loginPage;
        let inventoryPage;
        let addToCart;

        beforeEach(async function () {
            driver = await new Builder().forBrowser(browserName).build();
            loginPage = new LoginPage(driver);
            inventoryPage = new InventoryPage(driver);
            addToCart = new AddtoCart(driver);
            await loginPage.open('https://www.saucedemo.com/');
            await loginPage.login('standard_user', 'secret_sauce');
        });

        it("VD-01 Validasi Inventory Page Sukses", async function(){
            const items = await inventoryPage.getInventoryItems();
            assert.ok(items.length > 0, 'Inventory list tidak ditemukan');
        });

        afterEach(async function () {
            const screenshot = await driver.takeScreenshot();
            const filepath = `${screenshotsDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
            fs.writeFileSync(filepath, screenshot, 'base64');
            await driver.quit(); // Pastikan driver ditutup setelah test selesai
        });
    });
}

inventoryvalid();
