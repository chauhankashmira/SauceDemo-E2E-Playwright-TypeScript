
import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.continueShoppingButton = page.locator('#continue-shopping');
  }


  async verifyItemInCart(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item).toBeVisible();
  }


  async verifyQuantity(expectedQuantity: string) {
    const quantity = this.page.locator('.cart_quantity');
    await expect(quantity).toHaveText(expectedQuantity);
  }


  async removeItem(productName: string) {
    const removeButton = this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await removeButton.click();
  }


  async verifyItemRemoved(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item).not.toBeVisible();
  }

  
  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}