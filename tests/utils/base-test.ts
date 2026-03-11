import { test as base } from '@playwright/test';

/**
 * Custom Playwright test fixture that automatically captures Frontegg trace IDs.
 */

type FronteggTraceFixtures = {
    captureTraceIds: void;
};

export const test = base.extend<FronteggTraceFixtures>({
    captureTraceIds: [async ({ page }, use, testInfo) => {
        const traceIds: Array<{ url: string; traceId: string; timestamp: string }> = [];

        // Listen to all responses and capture frontegg-trace-id headers
        const responseListener = (response) => {
            const traceId = response.headers()['frontegg-trace-id'];
            if (traceId) {
                traceIds.push({
                    url: response.url(),
                    traceId: traceId,
                    timestamp: new Date().toISOString()
                });
            }
        };

        page.on('response', responseListener);

        // Pass control to the test
        await use();

        // After test completes, attach trace IDs if test failed
        if (testInfo.status === 'failed' && traceIds.length > 0) {
            await testInfo.attach('frontegg-trace-ids', {
                body: JSON.stringify(traceIds, null, 2),
                contentType: 'application/json'
            });
        }

        // Cleanup
        page.off('response', responseListener);
    }, { auto: true }]
});

export { expect } from '@playwright/test';