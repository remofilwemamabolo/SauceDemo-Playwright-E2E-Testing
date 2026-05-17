// import { expect, test } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';
// import { ProductListingPage } from '../pages/productListingPage';
// import productData from '../fixtures/productData.json';
// import loginData from '../fixtures/loginData.json';

// productData.forEach((data) => {
//     test(data.testName, async ({ page }) => {
//         test.skip(!data.run, `Skipping: ${data.testName}`);

//         await page.goto('https://www.saucedemo.com/inventory.html');
//         const productData = new productData(page);

//         if (data.expectedCount) {
//             await expect(productData.productItem).toHaveCount(data.expectedCount);
//         }

//         if (data.sortOrder) {
//             await productData.sortBy(data.sortOrder as 'az' | 'za' | 'lohi' | 'hilo');
//             await expect(productData.getFirstItemName()).toHaveText(data.expectedFirstProduct!);
//         }
//     });
// });