import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage";

export class MainPage extends BasePage {
    loginHostedButton: Locator
    header: Locator
    
    constructor(page: Page) {
        super(page)

        this.loginHostedButton = this.page.getByRole('button', { name: 'Click me to login - hosted' });
        this.header = this.page.getByRole('heading', { name: 'Frontegg React App' });
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
    }

    async clickLogin(): Promise<void> {
        await this.loginHostedButton.click();
    }
}