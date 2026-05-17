import { Page, Locator } from '@playwright/test';

export class CartPage {

    readonly page: Page;
    readonly cartItems: Locator;
    readonly cartItemName: Locator;
    readonly cartItemPrice: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page           = page;
        this.cartItems      = page.locator('.cart_item');
        this.cartItemName   = page.locator('.inventory_item_name');
        this.cartItemPrice  = page.locator('.inventory_item_price');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async proceedToCheckout()
    {
        await this.checkoutButton.click();
    }
}