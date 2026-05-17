import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../fixtures/loginData.json';

// Reusable login helper so every test section doesn't repeat the same 3 lines for loggin in as standard_user
export async function loginAsStandardUser(page: Page): Promise<void> {
    const user = loginData.find(d => d.username === 'standard_user')!;
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(user.username, user.password);
}