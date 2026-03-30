
import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly products: Locator;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('.product_sort_container');
    this.products = page.locator('.inventory_item');
    this.cartButton = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async sortByNameAZ() {
    await this.sortDropdown.selectOption('az');
  }

  async sortByPriceHighToLow() {
    await this.sortDropdown.selectOption('hilo');
  }

  async verifySortByPriceHighToLow() {
    // Verify products are sorted by price high to low
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => b - a);
    expect(numericPrices).toEqual(sortedPrices);
  }

  async clickProduct(productName: string) {
    await this.page.locator('.inventory_item_name').filter({ hasText: productName }).click();
  }

  async verifyPrice(expectedPrice: string) {
    const priceLocator = this.page.locator('.inventory_details_price');
    await expect(priceLocator).toHaveText(expectedPrice);
  }

  async addToCart(productName?: string) {
    
    if (productName) {
    
        // On list page
      const addButton = this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
      await addButton.click();
    } 
    
    else {
      // On detail page
      const addButton = this.page.locator('[data-test="add-to-cart"]');
      await addButton.click();
    }
  }

  async removeFromCart(productName?: string) {
    
    if (productName) {
    
      // On list page
      const removeButton = this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
      await removeButton.click();
    } 
    
    else {
      // On detail page
      const removeButton = this.page.locator('[data-test="remove"]');
      await removeButton.click();
    }

  }

  async verifyAddedToCart(productName?: string) {
    
    if (productName) {
     
        // On list page
      const removeButton = this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
      await expect(removeButton).toBeVisible();
    }
    
    else {
    
        // On detail page
      const removeButton = this.page.locator('[data-test="remove"]');
      await expect(removeButton).toBeVisible();
    
    }
  }

  async verifyRemovedFromCart(productName?: string) {
    
    if (productName) {
    
        // On list page
      const addButton = this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
      await expect(addButton).toBeVisible();
    }
    
    else {
      // On detail page
      const addButton = this.page.locator('[data-test="add-to-cart"]');
      await expect(addButton).toBeVisible();
    }

  }

  async backToProducts() {
    await this.page.locator('#back-to-products').click();
  }

  async clickCart() {
    await this.cartButton.click();
  }
}