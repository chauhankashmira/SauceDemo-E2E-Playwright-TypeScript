
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('SauceDemo E2E Test', async ({ page }) => {
  
    await page.goto('https://www.saucedemo.com/');

    await expect(page).toHaveTitle('Swag Labs');

  // LoginPage
  const loginPage = new LoginPage(page);
  await loginPage.fillUsername('standard_user');
  await loginPage.fillPassword('secret_sauce');
  await loginPage.clickLogin();

  /* ----------------------------------------------------------------------------- */

  // ProductPage
  const productPage = new ProductPage(page);

  //Filter
  await productPage.sortByNameAZ();
  await productPage.sortByPriceHighToLow();
  await productPage.verifySortByPriceHighToLow();

  //Select Product
  await productPage.clickProduct('Sauce Labs Fleece Jacket');

  // Verify price $49.99
  await productPage.verifyPrice('$49.99');

  //Product add to Cart
  await productPage.addToCart();

  // Verify added to the cart
  await productPage.verifyAddedToCart();

  //Remove from cart
  await productPage.removeFromCart();

  // Verify Sauce Labs Fleece Jacket removed from the cart
  await productPage.verifyRemovedFromCart();

  //Navigate back to products page
  await productPage.backToProducts();

  // Verify navigate back to ProductPage
  await expect(page.locator('.inventory_list')).toBeVisible();

  //Add another product
  await productPage.clickProduct('Sauce Labs Backpack');

  // Verify price $29.99
  await productPage.verifyPrice('$29.99');

  //Product add to cart
  await productPage.addToCart();

  //Go to cart
  await productPage.clickCart();


  /* ----------------------------------------------------------------------------- */

  // CartPage
  const cartPage = new CartPage(page);

  // Verify Sauce Labs Backpack added to the cart
  await cartPage.verifyItemInCart('Sauce Labs Backpack');

  // Verify quantity
  await cartPage.verifyQuantity('1');

  //Remove item
  await cartPage.removeItem('Sauce Labs Backpack');

  // Verify item removed from the cart
  await cartPage.verifyItemRemoved('Sauce Labs Backpack');

  //Go back to Product page
  await cartPage.continueShopping();

  // Verify navigate back to ProductPage
  await expect(page.locator('.inventory_list')).toBeVisible();
});
