import { request } from '@playwright/test';

const HEALTH_URL = 'https://api.stg.frontegg.com/test';

async function globalSetup() {
    const context = await request.newContext();
    const response = await context.get(HEALTH_URL);
    if (response.status() !== 200) {
        throw new Error(`Health check failed: expected 200 but got ${response.status()} for ${HEALTH_URL}`);
    }
    await context.dispose();
}

export default globalSetup;
