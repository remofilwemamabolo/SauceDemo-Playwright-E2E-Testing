import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductListingPage } from '../pages/ProductListingPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import loginData from '../fixtures/loginData.json';
import productData from '../fixtures/productData.json';
import productDetailsData from '../fixtures/productDetailsData.json';
import cartData from '../fixtures/cartData.json';
import checkoutData from '../fixtures/checkoutData.json';
import { loginAsStandardUser } from '../utils/loginHelper';

// ── Login Tests ────────────────────────────────────────────────────────────
// Tests login with multiple users from fixture, skips entries where run is false

loginData.forEach((data) => {
    test(`login test - ${data.username}`, async ({ page }) => {
        test.skip(!data.run, `Skipping test for ${data.username} as run is set to false`);

        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(data.username, data.password);

        // Assert success by URL or failure by error message visibility
        if (data.expected === 'success') {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        } else {
            await expect(loginPage.errorMessage).toBeVisible();
        }
    });
});

// ── Product Listing Tests ──────────────────────────────────────────────────

productData.forEach((data) => {
    test(data.testName, async ({ page }) => {
        test.skip(!data.run, `Skipping: ${data.testName}`);

      await loginAsStandardUser(page); // Reusable login helper for standard_user

        const productListingPage = new ProductListingPage(page);

        // Verify total product count on the listing page
        if (data.expectedCount) {
            await expect(productListingPage.productItems).toHaveCount(data.expectedCount);
        }

        // Sort and verify the first product name matches expected order
        if (data.sortOrder) {
            await productListingPage.sortBy(data.sortOrder as 'az' | 'za' | 'lohi' | 'hilo');
            const firstProductName = await productListingPage.getProductName();
            await expect(firstProductName).toHaveText(data.expectedFirstProduct!);
        }
    });
});

// ── Product Detail Tests ───────────────────────────────────────────────────

productDetailsData.forEach((data) => {
    test(data.testName, async ({ page }) => {
        test.skip(!data.run, `Skipping: ${data.testName}`);

        await loginAsStandardUser(page); // Reusable login helper for standard_user 

        const productListingPage = new ProductListingPage(page);
        await productListingPage.sortBy('za');
        await productListingPage.clickItemName();

        const detailPage = new ProductDetailsPage(page);

        // Assert each detail field based on what the fixture provides
        if (data.expectedProduct) {
            await expect(detailPage.productName).toHaveText(data.expectedProduct);
        }
        if (data.expectedPrice) {
            await expect(detailPage.productPrice).toHaveText(data.expectedPrice);
        }
        if (data.expectedDescription) {
            await expect(detailPage.productDescription).toHaveText(data.expectedDescription);
        }
        if (data.testName === 'product image is visible') {
            await expect(detailPage.productImage).toBeVisible();
        }
    });
});

// ── Cart Tests ─────────────────────────────────────────────────────────────
cartData.forEach((data) => {
    test(data.testName, async ({ page }) => {
        test.skip(!data.run, `Skipping: ${data.testName}`);

        await loginAsStandardUser(page); // Reusable login helper for standard_user 

        const productListingPage = new ProductListingPage(page);
        await productListingPage.sortBy('za'); //sorts by z-a 
        await productListingPage.clickItemName();

        const detailPage = new ProductDetailsPage(page);
        await detailPage.addToCartButton.click(); // add product from detail page
        await detailPage.cartIcon.click();        // navigate to cart

        const cartPage = new CartPage(page);
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

        // Assert product name and price in cart from fixture
        if (data.expectedProduct) {
            await expect(cartPage.cartItemName).toHaveText(data.expectedProduct);
        }
        if (data.expectedPrice) {
            await expect(cartPage.cartItemPrice).toHaveText(data.expectedPrice);
        }
    });
});

// ── Checkout Tests ─────────────────────────────────────────────────────────
checkoutData.forEach((data) => {
    test(data.testName, async ({ page }) => {
        test.skip(!data.run, `Skipping: ${data.testName}`);

        await loginAsStandardUser(page); // Reusable login helper for standard_user

        //view products and sort by z-a
        const productListingPage = new ProductListingPage(page);
        await productListingPage.sortBy('za');
        await productListingPage.clickItemName();

        //add to cart and navigate to cart page
        const detailPage = new ProductDetailsPage(page);
        await detailPage.addToCartButton.click(); 
        await detailPage.cartIcon.click();        

        //go to checkoutpage
        const cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();       

        //fill out the checkout information from fixture data 
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillDetails(data.firstName, data.lastName, data.zip);
        await checkoutPage.continueToOverview();  // proceed to order summary
        await checkoutPage.finishCheckout();      // place the order

        // Assertion of success confirmation message matches fixture
        await expect(checkoutPage.successMessage).toHaveText(data.expectedSuccessMessage);
    });
});