import { ReporterDescription } from '@playwright/test';

export function getReporters(): ReporterDescription[] {
    const reporters: ReporterDescription[] = [];
    reporters.push(['list', { printSteps: true }]);

    // HTML Report configuration
    // Generates a report in 'playwright-report' folder and doesn't open it automatically
    reporters.push(['html', { open: 'never' }]);

    return reporters;
}