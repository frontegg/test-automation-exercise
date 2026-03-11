import { test, expect } from '../../utils/base-test';
import LoginPage from "../pages/LoginPage";
test.describe('Sanity', () => {
    test('should load the application', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('h1')).toHaveText('Frontegg React App');
    });

});

/**
 * Task 3: Verify SSO provider buttons on the hosted login page.
 */
test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate()
    });



    test('should verify all common SSO buttons accessibility', async () => {
        // List of providers we expect to see
        const providers = loginPage.ssoProviders

        for (const provider of providers) {
            // Use the POM helper to verify visibility
            await loginPage.isSSOButtonVisible(provider);

        }
    });

    test('should show error message on invalid credentials', async () => {
        const invalidEmail = 'wrong-user@example.com';
        const invalidPassword = 'WrongPassword123!';

        // Perform login attempt with wrong details
        await loginPage.login(invalidEmail, invalidPassword);

        // Verify error message is visible
        await expect(loginPage.loginErrorMsg).toBeVisible();

        // Verify the error text (Common Frontegg message)
        const errorText = await loginPage.loginErrorMsg.textContent();
        expect(errorText.toLowerCase()).toContain('incorrect email or password');


    });
});