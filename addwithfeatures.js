const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");


async function additemwithfeatures() {
    const browsers = [{
        name :"chrome",
        option : new chrome.Options().addArguments("--headless")
    },
    {
        name :"firefox",
        option : new firefox.Options().addArguments("--headless")
    },
    {
        name :"MicrosoftEdge",
        option : new edge.Options().addArguments("--headless")
    },
    ];
    let driver = await new Builder().forBrowser(browsers).build();
    
    for (let browser of browsers) {
        let driver = await new Builder()
        .forBrowser(browser.name)
        .setChromeOptions(browser.name === "chrome" ? browser.option : undefined)
        .setFirefoxOptions(browser.name === "firefox" ? browser.option : undefined)
        .setEdgeOptions(browser.name === "MicrosoftEdge" ? browser.option : undefined)
        .build();
    try {

        await driver.get('https://www.saucedemo.com/');
    // Simulate user behavior typing hello world
        await driver
        .findElement(By.id('user-name')).sendKeys('standard_user', Key.RETURN);
        await driver
        .findElement(By.id('password')).sendKeys('secret_sauce', Key.RETURN);
        await driver
        .findElement(By.name('login-button')).click();
        await driver.findElement(By.id('add-to-cart-sauce-labs-bike-light')).click();
        await driver.findElement(By.id('root')).click();
        await driver.wait(until.elementLocated(By.id('root')));
        console.log("Berhasil menambahkan item ke cart"+ browser.name);
  
    }
    catch (error) {
        console.log('Gagal Menambahkan item ke cart'+ browser.name);
    }  
    finally {
        
        await driver.quit();
    }
    }
}

additemwithfeatures();