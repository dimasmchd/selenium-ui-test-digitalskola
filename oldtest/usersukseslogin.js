const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');



async function usersukseslogin() {
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
        
        await driver.wait(until.elementLocated(By.id('inventory_container')), 5000);
        console.log('Login User Sukses');
  
    }
    catch (error) {
        console.log('Login gagal.');
    }  
    finally {
        
        await driver.quit();
    }
    
}

usersukseslogin();