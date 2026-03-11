
export default class LoginPage{
    constructor(page){
        this.page = page

        // Login form elements - Using explicit CSS selectors for data-test-id
        this.loginTitle = page.locator('[data-test-id="login-title"]');
        this.emailInput = page.locator('[data-test-id="input-identifier"]');
        this.passwordInput = page.locator('[data-test-id="input-password"]');
        this.signInBtn = page.locator('[data-test-id="submit-btn"]');

        // Error handling elements
        this.loginErrorMsg = page.locator('[data-test-id="login-error"]');

        // SSO Provider buttons - Using explicit CSS selectors
        this.microsoftButton = page.locator('[data-test-id="microsoft-btn"]');
        this.githubButton = page.locator('[data-test-id="github-btn"]');
        this.customProvider = page.locator('[data-test-id="Auth0-btn"]');

        // List of providers for iteration in tests
        this.ssoProviders = ['microsoft', 'github', 'custom'];
    }
    async navigate() {
        await this.page.goto('https://fronteggers.stg.frontegg.com/oauth/account/login');
    }

    /**
     * Attempts to login with provided credentials.
     * @param {string} email
     * @param {string} password
     */
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInBtn.click();
    }

    async isSSOButtonVisible(provider) {
        const buttonMap = {
            microsoft:  this.microsoftButton,
            github:  this.githubButton,
            custom:  this.customProvider
        };
        return buttonMap[provider].toBeVisible;
    }
}