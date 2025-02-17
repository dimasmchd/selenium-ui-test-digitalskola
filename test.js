const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');



async function exampletest() {
    //membuat koneksi dengan webdriver
    //let driver = await new Builder().forBrowser('chrome').build();
    // Menambahkan ChromeOptions untuk menggunakan user agent
    let options = new chrome.Options();
    options.addArguments("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36");
    options.addArguments("--disable-blink-features=AutomationControlled");
    // exception handling
    let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
    try {
        await driver.get('https://www.google.com/');
    let searchBox = await driver.findElement(By.name("q"));

    // Simulate user behavior typing hello world
    await searchBox.sendKeys('hello world', Key.RETURN);
    await driver.wait(until.elementLocated(By.id('result-stats')), 10000);
    
    let title = await driver.getTitle();
    console.log(`Page title is:  ${title}`);
    } 
    finally {
        
        //await driver.quit();
    }
    
}

exampletest();