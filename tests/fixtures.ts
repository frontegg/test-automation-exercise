import { test as base } from '@playwright/test';
import { LoginPage } from './pages/loginPage'
import { MainPage } from './pages/mainPage'

type MyFixtures = {
  mainPage: MainPage;
  loginPage: LoginPage;
  fronteggTraceCollector: void;
};

export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await use(mainPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  fronteggTraceCollector: [async ({ page }, use, testInfo) => {
    const traceIds: string[] = [];

    page.on('response', (response) => {
      const traceId = response.headers()['frontegg-trace-id'];
      if (traceId) {
        traceIds.push(`${response.url()} → ${traceId}`);
      }
    });

    await use();

    if (testInfo.status !== testInfo.expectedStatus && traceIds.length > 0) {
      await testInfo.attach('frontegg-trace-ids', {
        body: traceIds.join('\n'),
        contentType: 'text/plain',
      });
    }
  }, { auto: true }],
});

export { expect } from '@playwright/test';