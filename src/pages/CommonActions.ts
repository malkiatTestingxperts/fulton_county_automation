import { Page, Locator } from "@playwright/test";
import { waitForElementToVisible, findElementUniversal, click, type } from "@tx/playwright-core";

export class CommonActions {
    constructor(private page: Page) { }

    createButton = ['button[name*="Create"]', '[jsname="LgbsSe"]', '[class*="VfPpkd-LgbsSe"]'];


    async clickCreateButton() {
        const createButtonValid = await findElementUniversal(this.page, this.createButton, "Create Button");
        await waitForElementToVisible(this.page, createButtonValid);
        await click(this.page, createButtonValid);
        console.log(`Clicked on Create Button`);
    }

    async waitForSpinner(page: Page) {
        const spinner = page.locator("adv-spinner-modal .overlayContainer");
        await spinner.waitFor({ state: "hidden" });
    }
    async checkTheCheckbox(pageCodeSelectors: string[]) {
        try {
            const validSelector = await findElementUniversal(
                this.page,
                pageCodeSelectors,
                `Checkbox: ${pageCodeSelectors}`
            );

            const checkbox = this.page.locator(validSelector);

            const isChecked = await checkbox.getAttribute('aria-checked');
            if (isChecked !== 'true') {

                await checkbox.scrollIntoViewIfNeeded();
                await checkbox.waitFor({ state: 'visible' });

                await checkbox.focus();
                await this.page.keyboard.press('Space');
                await this.page.waitForTimeout(1000);

                const afterClickState = await checkbox.getAttribute('aria-checked');
                if (afterClickState === 'true') {
                    console.log("Checkbox was successfully checked.");
                } else {
                    await checkbox.click({ force: true });
                }

                await this.page.waitForTimeout(2000);

            } else {
                console.log("Checkbox is already checked, skipping click.");
            }

        } catch (error: any) {
            console.error(`Error while attempting to click checkbox: ${error.message}`);
            throw error;
        }
    }


    async waitForWithRetry(
        locator: Locator,
        page: Page,
        retries = 3,
        timeout = 25000,
        delayBetweenRetries = 1000,
        label = 'element',
        elemenState = String
    ): Promise<void> {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                console.log(`[${label}] Attempt ${attempt}/${retries}: waiting for visible (timeout ${timeout}ms)...`);
                await locator.waitFor({ state: 'visible', timeout });
                console.log(`[${label}] Element became visible.`);
                return;
            } catch (error) {
                console.warn(`[${label}] Retry ${attempt} failed.`);
                if (attempt === retries) {
                    throw new Error(`[${label}] Element not visible after ${retries} retries.\nLast error: ${error}`);
                }
                await new Promise((res) => setTimeout(res, delayBetweenRetries));
            }
        }
    }
}
export async function waitForElementToHide(element: Locator, timeout = 12000): Promise<boolean> {
    try {
        await element.waitFor({ state: 'visible', timeout });
        return true;
    } catch (e) {
        return false;
    }
}

export async function waitForInputValue(locator: Locator, page: Page, retries = 5, delay = 300, expectedValue: string): Promise<string> {
    for (let i = 0; i < retries; i++) {
        await locator.click();
        await locator.page().waitForTimeout(delay);
        const value = (await locator.inputValue()).trim();
        if (value === expectedValue)
            console.log("****************" + value);
        return value;
    }
    throw new Error(`Expected input value "${expectedValue}" not found after ${retries} retries.`);
}

