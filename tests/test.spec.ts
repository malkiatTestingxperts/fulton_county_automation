import { test } from "@playwright/test";
import { BrowserManager } from "@tx/playwright-core";
import { click } from "@tx/playwright-core";

test('Google test', async () => {
    const page = await BrowserManager.getPage();
    await page.goto('https://google.com');
    // to test the click fuction
    await click('[role="combobox"]');
});
