import { Page } from "@playwright/test";
import { waitForElementToVisible, findElementUniversal, click, type } from "@tx/playwright-core";
import { CommonActions } from "./CommonActions.js";
export class SearchPageCode {
    constructor(private page: Page) { }

    searchBarDropDownOption = ['button[name*="viewMenu"]', '[jsname="yZiJb0e"]', '[class="gLFyf"]']
    pageCode = ['input[id*="pageCode"]', '[jsname="YPqjbf"]', '[class="whsOnd"]'];
    enterTextInSearchBar = ['input[data-qa-id*="searchBar"]', '[jsname="YPqjbf"]', '[class="whsOnd"]'];
    createButton = ['button[name*="Create"]', '[jsname="LgbsSe"]', '[class*="VfPpkd-LgbsSe"]'];
    overLayContainer = ['.overlayContainer', 'div[jsname="hSRGPd"]', 'div[class*="gb_9d"]'];

    async clicksearchBarDropDownOption() {
        const validSelector = await findElementUniversal(this.page, this.searchBarDropDownOption, "search bar drop down option");
        await click(this.page, validSelector);
        await this.pageCodeCheckboxOption();
        await this.page.keyboard.press('Tab');
    }

    async enterTextInSearchBarOption(text: string) {
        const validSelector = await findElementUniversal(this.page, this.enterTextInSearchBar, "Enter Text In Search Bar");
        await type(this.page, validSelector, text);
    }

    async pageCodeCheckboxOption() {
        try {
            const validSelector = await findElementUniversal(
                this.page,
                this.pageCode,
                "Page Code Checkbox Option"
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

    async clickPageCodeOption(labelText: string) {
        const commonActions = new CommonActions(this.page);
        const parameterizedXPath = `xpath=.//*[@data-qa-id[contains(., 'pgCdLookupResult')]]//span[@aria-label='${labelText}']`;
        await waitForElementToVisible(this.page, parameterizedXPath);
        await click(this.page, parameterizedXPath);
        await commonActions.waitForWithRetry(this.page.locator('button[name*="Create"]'), this.page, 3, 2000);
        // const overlayContainerValid = await findElementUniversal(this.page, this.overLayContainer, "Overlay Container");
        // await this.page.locator(overlayContainerValid).waitFor({ state: 'hidden', timeout: 10000 });
        const createButtonValid = await findElementUniversal(this.page, this.createButton, "Create Button");
        await waitForElementToVisible(this.page, createButtonValid);
    }
}




