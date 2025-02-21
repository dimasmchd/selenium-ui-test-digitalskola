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
        await driver.findElement(By.id('add-to-cart-sauce-labs-bike-light')).click();
        await driver.findElement(By.id('root')).click();
        // Ganti pencarian elemen menggunakan XPath
        let cartBadge = await driver.wait(until.elementLocated(By.xpath('//*[@id="shopping_cart_container"]/a/span')), 5000);

        let cartCount = await cartBadge.getText();
        if (cartCount === '1') {
            console.log(' Berhasil menambahkan item ke cart');
        }
    }
    catch (error) {
        console.log('Gagal Menambahkan item ke cart!!');}  
    finally {
        
        await driver.quit();
    }
    
}

saucedemologin();