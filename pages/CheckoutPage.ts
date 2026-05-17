import { Page, Locator } from '@playwright/test';

export class CheckoutPage {

    readonly page: Page;
    // Step 1 - customer info
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipInput: Locator;
    readonly continueButton: Locator;
    // Step 2 - order overview
    readonly finishButton: Locator;
    // Step 3 - confirmation
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page           = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput  = page.locator('[data-test="lastName"]');
        this.zipInput       = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton   = page.locator('[data-test="finish"]');
        this.successMessage = page.locator('[data-test="complete-header"]');
    }

    async fillDetails(firstName: string, lastName: string, zip: string)
    {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipInput.fill(zip);
    }

    async continueToOverview()
    {
        await this.continueButton.click();
    }

    async finishCheckout()
    {
        await this.finishButton.click();
    }
}