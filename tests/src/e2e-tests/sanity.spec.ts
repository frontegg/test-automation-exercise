import { test, expect } from 'fixtures'
import { faker } from '@faker-js/faker'

test.describe('Sanity', () => {
    test('should load the application', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('h1')).toHaveText('Frontegg React App');
    });

    test('buttons are visible in login page', async ({ mainPage, loginPage }) => {
        await mainPage.goto();
        await expect(mainPage.header).toHaveText('Frontegg React App');
        await mainPage.clickLogin();
        for (const button of loginPage.ssoButtons) {
            await expect(button).toBeVisible();
        }
    });

    test('failed login attempt shows error and fires auth request', async ({ page, mainPage, loginPage }) => {
        await mainPage.goto();
        await mainPage.clickLogin();

        const email = faker.internet.email();
        const password = faker.internet.password();

        const authRequestPromise = page.waitForRequest(
            req => req.url().includes('identity/resources/auth') && req.method() === 'POST'
        );

        await loginPage.attemptLogin(email, password);
        await authRequestPromise;
        await expect(loginPage.loginErrorMessage).toBeVisible();
    });
});