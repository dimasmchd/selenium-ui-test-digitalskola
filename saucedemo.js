const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');



async function saucedemologin() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.saucedemo.com/');
    // Simulate user behavior typing hello world
        await driver
        .findElement(By.id('user-name')).sendKeys('standard_user', Key.RETURN);
        await driver
        .findElement(By.id('password')).sendKeys('secret_sauce', Key.RETURN);
        await driver
        .findElement(By.name('login-button')).click();
        //assertion

        let titleText = await driver.findElement(By.css(".app_logo")).getText();
        assert.strictEqual(titleText, 'Swag Labbs'), true,'Title is not correct';
    } 
    finally {
        
        await driver.quit();
    }
    
}

saucedemologin();