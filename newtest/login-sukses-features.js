const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");
const assert = require('assert');

describe("user login sukses", function () {
    this.timeout(30000);

    // Definisikan grup browser yang akan digunakan
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

    // Loop untuk tiap browser dalam grup
    browsersgroup.forEach(browser => {
        describe(`Testing in ${browser.name}`, function () {
            let driver;

            beforeEach(async function () {
                // Inisialisasi driver sesuai browser dan options
                driver = await new Builder()
                    .forBrowser(browser.name)
                    .setChromeOptions(browser.name === "chrome" ? browser.options : undefined)
                    .setFirefoxOptions(browser.name === "firefox" ? browser.options : undefined)
                    .setEdgeOptions(browser.name === "MicrosoftEdge" ? browser.options : undefined)
                    .build();

                // Buka URL utama
                await driver.get("https://www.saucedemo.com/");
            });

            afterEach(async function () {
                // Pastikan driver ditutup setelah test selesai
                if(driver) {
                    await driver.quit();
                }
            });

            it("AWF-01 Sukses", async function () {
                // Lakukan login
                await driver.findElement(By.id('user-name')).sendKeys('standard_user');
                await driver.findElement(By.id('password')).sendKeys('secret_sauce');
                await driver.findElement(By.id('login-button')).click();

                // Tunggu hingga halaman inventory muncul (gunakan element yang unik di halaman tersebut)
                await driver.wait(until.elementLocated(By.id('inventory_container')), 5000);

                console.log('User Sukses Login');
            });

            it("AWF-02 Failed", async function () {
                await driver.findElement(By.id('user-name')).sendKeys('standard_user');
                await driver.findElement(By.id('password')).sendKeys('secret_sauce');
                await driver.findElement(By.id('login-button')).click();
                await driver.wait(until.elementLocated(By.id('inventory_container')), 5000);
                
                console.log("User Gagal Login = Test Berhasil")
            });
        });
    });
});
