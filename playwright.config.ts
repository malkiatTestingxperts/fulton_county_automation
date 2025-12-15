
import { defineConfig } from '@playwright/test';

export default defineConfig({
    timeout: 900000,
    workers: 1,
    use: {
        headless: false,
        channel: 'chrome',
        viewport: null,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        actionTimeout: 45000,
        launchOptions: {
            args: ['--start-maximized'],
        },
    },
    reporter: [
        ['blob'],
        ['html', { outputFolder: 'playwright-reports/merged', open: 'never' }]
    ]
});
