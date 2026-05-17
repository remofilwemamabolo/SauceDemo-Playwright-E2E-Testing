import {expect,test} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import loginData from '../fixtures/loginData.json'

//loop for each data set in json
loginData.forEach((data) =>{

    test(`login test - ${data.username}`, async ({ page }) => {//dynamic test name based on username
        
        test.skip(!data.run, `Skipping test for ${data.username} as run is set to false`);
        //conditional skip based on run flag in json  

        const loginPage = new LoginPage(page);//page class object
//reference to page class methods
        await loginPage.gotoLoginPage();
        await loginPage.login(data.username, data.password);

        //dynamic assertion based on expected result in json
        if(data.expected === 'success')
        {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');   
        }
        else
        {
            await expect(loginPage.errorMessage).toBeVisible();
        }
   });
});






// test('valid login test', async ({ page }) => {

//     const loginPage = new LoginPage(page);

//     await loginPage.gotoLoginPage();
//     // this is hardcoded = await loginPage.login('standard_user', 'secret_sauce');
    
// //referenced from data file
//     // await loginPage.login(
//     //     loginData.validUser.username,
//     //     loginData.validUser.password
//     // );
//     // await loginPage.verifyLoginSuccess();

//     //assertion
//     await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

// });


// test('invalid login test', async ({ page }) => {

//     const loginPage = new LoginPage(page);

//     await loginPage.gotoLoginPage();
//     // this is hardcoded = await loginPage.login('standard_user', 'secret_sauce');
    
// //referenced from data file
//     await loginPage.login(
//         loginData.invalidUser.username,
//         loginData.invalidUser.password
//     );
//     // await loginPage.verifyLoginSuccess();

//     //assertion
//     await expect(loginPage.errorMessage).toBeVisible();

// });