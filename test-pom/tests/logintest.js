const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const LoginPage = require('../pages/LoginPage.js');
const InventoryPage = require('../pages/inventoryPage.js');
const screenshotsDir = './screenshots/';
const fs = require('fs');
if (!fs.existsSync(screenshotsDir)){
    fs.mkdirSync(screenshotsDir, {recursive: true});
}
async function saucedemologin() {
        describe('Login Page', function() {
            let driver;
            let browserName = 'chrome';
            let loginPage;
            let inventoryPage;

        beforeEach(async function () {
            this.timeout(30000);
            driver = await new Builder().forBrowser(browserName).build();
            loginPage = new LoginPage(driver);
            inventoryPage = new InventoryPage(driver);
            await loginPage.open('https://www.saucedemo.com/');
        });

        it("LO-01 TC-01 Login Sukses", async function () {
            await loginPage.login('standard_user', 'secret_sauce');
            const titleText = await inventoryPage.getTitleText();

            assert.strictEqual(
                titleText.includes("Swag Labs"),
                true,
                "Title is not correct"
            );
            console.log("Testing Login Sukses");
        }),
            it("LO-02 Login Failed", async function () {
                await loginPage.login('standard_user', 'passowrdbohong');
                let errorMessage = await loginPage.getErrorMessage();
                assert.strictEqual(
                    errorMessage.includes("Epic sadface: Username and password do not match any user in this service"),
                    true,
                    "Error message do not match");
                console.log("Testing Login Failed = Sukses");
            })
        afterEach(async function () {
            const screenshot = await driver.takeScreenshot();
            const filepath = `${screenshotsDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
            fs.writeFileSync(filepath, screenshot, 'base64');
        });
    }
)
}

saucedemologin();
