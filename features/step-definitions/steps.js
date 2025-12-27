const {Given, When, Then} = require('@cucumber/cucumber');
const {PageObjectManager} = require('../../pageObjects/PageObjectManager');
const {firefox} = require('playwright');

Given('I open the application at URL {string}', {timeout : 30*1000}, async function (appUrl) {
    const browser = await firefox.launch(
        {headless: false}
    );
    const context = await browser.newContext();
    const page = await context.newPage();
    this.pageObjectManager = new PageObjectManager(page);//Initiate Page Object Manager
    
    //Navigate to Login page and perform valid login
    this.loginPage = this.pageObjectManager.getLoginPage();
    await this.loginPage.openApplicationUrl(appUrl); 
});
Given('I log in with username {string} and password {string}', async function (loginEmail, password) {
    await this.loginPage.validLogin(loginEmail,password);
});
When('I search for the product {string} and add to Cart', async function (itemToBuy) {
    this.dashboardPage = this.pageObjectManager.getDashboardPage();
    await this.dashboardPage.selectItemAndAddToCart(itemToBuy);
});
Then('I verify message for successful addition', async function () {
    await this.dashboardPage.verifyAddedToCartMsg();
});
When('I go to the Cart page', async function () {
    await this.dashboardPage.goToCart();
});
Then('I verify presence of product {string} in Cart', async function (itemToBuy) {
    this.cartPage = this.pageObjectManager.getCartPage();
    await this.cartPage.verifyProductAddedToCart(itemToBuy);
});
When('I click on the Checkout button', async function () {
    await this.cartPage.clickCheckOut();
});
When('I enter card details: card number {string}, expiry month {string}, expiry year {string}, CVV {string}, Name on Card {string}', async function (ccNo, ccExpMonth, ccExpYear, ccCVV, ccNameOnCard) {
    this.checkOutPage = this.pageObjectManager.getCheckOutPage();
    await this.checkOutPage.clearAndEnterCCNo(ccNo);
    await this.checkOutPage.selectExpMonthYear(ccExpMonth,ccExpYear);
    await this.checkOutPage.enterCVVField(ccCVV);
    await this.checkOutPage.enterNameonCCField(ccNameOnCard);
});
When('I verify that the username {string} is already published', async function (loginEmail) {
    await this.checkOutPage.verifyEmailIDPopulated(loginEmail);
});
When('I select the country {string} from the dropdown', async function (country) {
    await this.checkOutPage.selectCountry(country);
});
When('I enter the coupon code {string} and verify it is successfully applied', async function (couponToApply) {
    await this.checkOutPage.applyCoupon(couponToApply);
});
When('I click on Place order', async function () {
    await this.checkOutPage.clickPlaceOrderBtn();
});
Then('I am shown the Order confirmation page and verify product {string}', async function (itemToBuy) {
    this.orderConfirmationPage = this.pageObjectManager.getOrderConfirmationPage();
    await this.orderConfirmationPage.verifyDetailsOnConfirmationPage(itemToBuy);
});
Then('I capture the order number', async function () {
    this.orderID = await this.orderConfirmationPage.getOrderIDFromConfPage();
});
When('I click on the Orders button to go to the Orders page', async function () {
    await this.dashboardPage.goToOrders();
});
Then('I verify that the order number is present in the list', async function () {
    this.ordersPage = this.pageObjectManager.getOrdersPage();
    await this.ordersPage.verifyOrdersPageLabel();
    await this.ordersPage.verifyPresenceOfOrderID(this.orderID);
});
When('I click on the View button for order number', async function () {
    this.ordersPage.clickViewOrderButton(this.orderID);
});
Then('I am on the Order Details page and I verify the order number, product {string}, username {string}, and country {string}', async function ( itemToBuy, loginEmail, country) {
    const orderDetailsPage = this.pageObjectManager.getOrderDetailsPage();
    await orderDetailsPage.verifyOrderDetails(this.orderID, loginEmail, country, itemToBuy);
});