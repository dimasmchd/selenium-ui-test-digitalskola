const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");
describe("user login sukses", function () {
    this.timeout(30000);

    
    let browsersgroup = [
        {
            name: "chrome",
            options: new chrome.Options().addArguments("--headless")
        },
        {
            name: "firefox",
            options: new firefox.Options().addArguments("--headless")
        },
        {
            name: "MicrosoftEdge",
            options: new edge.Options().addArguments("--headless")
        },
    ];


    browsersgroup.forEach(browser => {
        describe(`Testing in ${browser.name}`, function () {
            let driver;

            beforeEach(async function () {
                
                driver = await new Builder()
                    .forBrowser(browser.name)
                    .setChromeOptions(browser.name === "chrome" ? browser.options : undefined)
                    .setFirefoxOptions(browser.name === "firefox" ? browser.options : undefined)
                    .setEdgeOptions(browser.name === "MicrosoftEdge" ? browser.options : undefined)
                    .build();

                
                await driver.get("https://www.saucedemo.com/");
            });

            afterEach(async function () {
                
                if(driver) {
                    await driver.quit();
                }
            });

            it("AWF-01 Sukses", async function () {
                
                await driver.findElement(By.id('user-name')).sendKeys('standard_user');
                await driver.findElement(By.id('password')).sendKeys('secret_sauce');
                await driver.findElement(By.id('login-button')).click();
                await driver.wait(until.elementLocated(By.id('inventory_container')), 5000);

                console.log('User Sukses Login');
            });

            it("AWF-02 Failed", async function () {
                await driver.findElement(By.id('user-name')).sendKeys('standard_user');
                await driver.findElement(By.id('password')).sendKeys('secret1_sauce');
                await driver.findElement(By.id('login-button')).click();
                await driver.findElement(By.xpath('//*[@id="login_button_container"]/div/form/div[3]/h3'));
                console.log("User Gagal Login = Test Berhasil")
            });
        });
    });
});
