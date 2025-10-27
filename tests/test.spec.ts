import { test } from '@playwright/test';
import { launchURL, click } from '@tx/playwright-core';

test('login', async ({ page }) => {
    await launchURL(page, 'https://google.com');
    await click(page, '[role="combobox"]',);
});
