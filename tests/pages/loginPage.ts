import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
    githubButton: Locator;
    microsoftButton: Locator;
    customProviderButton: Locator;
    emailInput: Locator;
    passwordInput: Locator;
    signInButton: Locator;
    loginErrorMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.githubButton = this.page.locator('[data-test-id="github-btn"]');
        this.microsoftButton = this.page.locator('[data-test-id="microsoft-btn"]');
        this.customProviderButton = this.page.locator('[data-test-id="Auth0-btn"]');
        this.emailInput = this.page.locator('[data-test-id="input-identifier"]');
        this.passwordInput = this.page.locator('[data-test-id="input-password"]');
        this.signInButton = this.page.locator('[data-test-id="submit-btn"]');
        this.loginErrorMessage = this.page.locator('[data-test-id="login-error"]');
    }

    get ssoButtons(): Locator[] {
        return [
            this.githubButton,
            this.microsoftButton,
            this.customProviderButton
        ];
    }

    async attemptLogin(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}