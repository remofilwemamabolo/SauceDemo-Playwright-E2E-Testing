import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {

    readonly page: Page;
    readonly productName: Locator;        // product title on the detail page
    readonly productDescription: Locator; // product description paragraph
    readonly productPrice: Locator;       // price e.g. "$15.99"
    readonly productImage: Locator;       // product image
    readonly addToCartButton: Locator;    // "Add to cart" button
    readonly cartIcon: Locator;           // shopping cart icon in the top nav

    constructor(page: Page) {
        this.page = page;

        this.productName  = page.locator('.inventory_details_name');
        this.productDescription = page.locator('.inventory_details_desc');
        this.productPrice  = page.locator('.inventory_details_price');

        // we just verify it is visible, not its src
        this.productImage  = page.locator('.inventory_details_img');

        // data-test is used here for stability, avoids any text-based selector issues
        this.addToCartButton = page.locator('[data-test="add-to-cart"]');

        //clicking it navigates to /cart.html
        this.cartIcon = page.locator('.shopping_cart_link');
    }
}