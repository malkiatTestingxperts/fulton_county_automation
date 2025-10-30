import { test } from "@playwright/test";
import { launchURL, logger, findElementUniversal } from "@tx/playwright-core";

test("login", async ({ page }) => {
    await launchURL(page, "https://google.com");
    const searchBox = await findElementUniversal(
        page, ['input[name="3q1"]', '[role="csasombobox1"]'], "Search Box"
    );
    await searchBox.click();
});
