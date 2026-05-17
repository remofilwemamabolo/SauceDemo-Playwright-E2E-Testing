import {Page, Locator} from '@playwright/test'  

export class ProductListingPage{
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly productItems: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page){
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.productItems = page.locator('.inventory_item');
        this.sortDropdown = page.locator('.product_sort_container');
    }

    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> 
    {
        await this.sortDropdown.selectOption(option);
    }
//returns the name of the first product in the list
    async getProductName(){
        return this.productItems.first().locator('.inventory_item_name');
    }

    //clicks on the item name for more information
     async clickItemName() {
        await this.productItems.first().locator('.inventory_item_name').click();
    }
}