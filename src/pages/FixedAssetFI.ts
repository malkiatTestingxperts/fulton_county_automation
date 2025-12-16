import { Page } from "@playwright/test";
import { waitForElementToVisible, findElementUniversal, click, type, clickWithIndex, clickWithRetry } from "@tx/playwright-core";
import { CommonActions } from "./CommonActions.js";

export class FixedAssetFI {
    constructor(private page: Page) { }

    transactionCode = ['[data-qa-id*="rsscalar"][data-qa-id$="DOC_DEPT_CD"]', '[jsname="yZiJb0e"]', '[class="gLFyf"]']
    transactionDepartment = ['input[name*="DOC_DEPT_CD"]', '[jsname="YPqjbf"]', '[class="whsOnd"]'];
    continueButton = ['button[name*="Continue"]', 'button[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]']
    autonumberedFI = ['xpath=.//label[contains(@data-qa-id, "DOC_AUTO_NUM")]', '[jsname="YPqjbf"]', '[class="whsOnd"]'];
    transactionIDLabel = ['[data-qa-id*="DOC_ID.label"]', '[jsname="YPqjbf"]', '[class="whsOnd"]'];
    fixedAssetTransactionName = ['input[name*="DOC_NM"]', '[jsname="YPqjbf"]', '[class="whsOnd"]'];;
    searchIconFixedAssetNum = ['button[data-qa*="FA_NO.picklist"]', '[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]'];
    overLayContainer = ['.overlayContainer', 'div[jsname="hSRGPd"]', 'div[class*="gb_9d"]'];
    searchButton = ['button[data-qa*="searchAndResetActns.search"]', 'button[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]'];
    selectFANumRow = ['[data-qa-id*="FA_NO.cellData"]', 'button[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]'];
    okButtonOnFANumberSelectionSearch = ['button[name*="header.OK"]', 'button[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]'];;
    threeDottedIcon = ['button[data-qa-id*="pageLevelThreedotMenu"]', 'button[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]'];
    howToApplyButton = ['button[data-qa-id*="HDR_AUTO_APPLY"]', 'button[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]'];
    accountingTab = ['[data-qa*="tabs.accounting"]', 'div[jsname="LgbsSe"]', 'div[class*="VfPpkd-LgbsSe"]'];
    firstRowIconOnAccountingTab = ['[data-qa-id*="rows.1.data_row_exp_col_cell"]', 'div[jsname="LgbsSe"]', 'div[class*="VfPpkd-LgbsSe"]'];
    coaOption = ['[aria-label="COA"]', 'div[jsname="LgbsSe"]', 'div[class*="VfPpkd-LgbsSe"]'];
    lineAmout = ['[name*="LN_AM"]', 'button[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]'];
    searchIconApprUnit = ['button[data-qa*="APPR_CD.picklist"]', '[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]'];
    okButtonOnAccountingNumberSelectionSearch = ['button[name*="accounting.OK"]', 'button[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]'];
    validateButton = ['button[name*="accounting.Validate"]', 'button[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]'];
    submitButton = ['button[name*="accounting.Submit"]', 'button[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]'];


    async enterTransactionCode(transactionCode: string) {
        const commonActions = new CommonActions(this.page);
        await this.page.waitForTimeout(5000);
        // const overlayContainerValid = await findElementUniversal(this.page, this.overLayContainer, "Overlay Container");
        // await this.page.locator(overlayContainerValid).waitFor({ state: 'detached', timeout: 10000 });
        const validSelector = await findElementUniversal(this.page, this.transactionCode, "search bar drop down option");
        await commonActions.waitForWithRetry(this.page.locator('[data-qa-id*="rsscalar"][data-qa-id$="DOC_DEPT_CD"]'), this.page, 8, 2000);
        await type(this.page, validSelector, transactionCode);
    }

    async enterTransactionDepartment(transactionDepartment: string) {
        const validSelector = await findElementUniversal(this.page, this.transactionDepartment, "Enter Text In Search Bar");
        await type(this.page, validSelector, transactionDepartment);
    }


    async clickAutonumberedFI() {
        const commonActions = new CommonActions(this.page);
        const validSelector = await findElementUniversal(this.page, this.autonumberedFI, "Autonumbered FI Checkbox");
        await click(this.page, validSelector);
    }

    async clickContinueButton() {
        const validSelector = await findElementUniversal(this.page, this.continueButton, "Continue button");
        await click(this.page, validSelector);
    }

    async enterFATransactionHeader(faTxName: string) {
        const validTransactionIDLabel = await findElementUniversal(this.page, this.transactionIDLabel, "Transaction Label");
        await waitForElementToVisible(this.page, validTransactionIDLabel);
        const validfixedAssetTransactionName = await findElementUniversal(this.page, this.fixedAssetTransactionName, "Transaction Name Input Field");
        await type(this.page, validfixedAssetTransactionName, faTxName);
    }

    async searchAndClickFixedAssetNum() {
        const commonActions = new CommonActions(this.page);
        const validSelector = await findElementUniversal(this.page, this.searchIconFixedAssetNum, "Search Icon Fixed Asset Number");
        await click(this.page, validSelector);
        const searchButton = await findElementUniversal(this.page, this.searchButton, "Search Button");
        await click(this.page, searchButton);
        await commonActions.waitForWithRetry(this.page.locator('[data-qa="tableGrid"] [id="tableDataRow.1"]'), this.page, 3, 2000);
        await this.page.locator('[data-qa="tableGrid"] [id="tableDataRow.6"]').scrollIntoViewIfNeeded();
        await this.page.locator('[data-qa="tableGrid"] [id="tableDataRow.6"]').click();
        const okButton = await findElementUniversal(this.page, this.okButtonOnFANumberSelectionSearch, "OK Button On FA Number Selection Search");
        await click(this.page, okButton);
    }

    async openThreeDottedMenu() {
        await this.page.locator('button[data-qa-id*="pageLevelThreedotMenu"]').last().scrollIntoViewIfNeeded();
        await this.page.locator('button[data-qa-id*="pageLevelThreedotMenu"]').last().click();
    }

    async clickHowToApplyButton() {
        const validSelector = await findElementUniversal(this.page, this.howToApplyButton, "How To Apply Button");
        await clickWithRetry(this.page, validSelector);
        const overlayContainerValid = await findElementUniversal(this.page, this.overLayContainer, "Overlay Container");
        await this.page.locator(overlayContainerValid).waitFor({ state: 'detached', timeout: 10000 });
    }

    async openAccountingTab() {
        const validSelector = await findElementUniversal(this.page, this.accountingTab, "accounting Tab");
        await click(this.page, validSelector);
        const overlayContainerValid = await findElementUniversal(this.page, this.overLayContainer, "Overlay Container");
        await this.page.locator(overlayContainerValid).waitFor({ state: 'detached', timeout: 10000 });
    }

    async expandFirstRowOnAccountingTab() {
        const validSelector = await findElementUniversal(this.page, this.firstRowIconOnAccountingTab, "firs row on accounting Tab");
        await click(this.page, validSelector);
        await this.page.waitForTimeout(3000);
    }

    async optionCOASubTab() {
        const validSelector = await findElementUniversal(this.page, this.coaOption, "first row on accounting Tab");
        await waitForElementToVisible(this.page, validSelector);
        await click(this.page, validSelector);
    }

    async enterLineAmountInFICOA(lineAmount: string) {
        const validTransactionIDLabel = await findElementUniversal(this.page, this.lineAmout, "Line Amount Input Field");
        await waitForElementToVisible(this.page, validTransactionIDLabel);
        await type(this.page, validTransactionIDLabel, lineAmount);
    }

    async searchAndClickApprUnit() {
        const commonActions = new CommonActions(this.page);
        const validSelector = await findElementUniversal(this.page, this.searchIconApprUnit, "Search Icon Fixed Asset Number");
        await this.page.locator(validSelector).scrollIntoViewIfNeeded();
        await click(this.page, validSelector);
        const searchButton = await findElementUniversal(this.page, this.searchButton, "Search Button");
        await click(this.page, searchButton);
        await commonActions.waitForWithRetry(this.page.locator('[data-qa="tableGrid"] [id="tableDataRow.1"]').last(), this.page, 3, 2000);
        await this.page.locator('[data-qa="tableGrid"] [id="tableDataRow.1"]').last().scrollIntoViewIfNeeded();
        await this.page.locator('[data-qa="tableGrid"] [id="tableDataRow.1"]').last().click();
        const okButton = await findElementUniversal(this.page, this.okButtonOnAccountingNumberSelectionSearch, "OK Button On FA Number Selection Search");
        await click(this.page, okButton);
    }

    async clickValidateButton() {
        const commonActions = new CommonActions(this.page);
        const validSelector = await findElementUniversal(this.page, this.validateButton, "Validate Button");
        await click(this.page, validSelector);
        // const overlayContainerValid = await findElementUniversal(this.page, this.overLayContainer, "Overlay Container");
        // await this.page.locator(overlayContainerValid).waitFor({ state: 'detached', timeout: 10000 });
        await commonActions.waitForWithRetry(this.page.locator('#systemFeedbackMessageRibbon'), this.page, 8, 2000);
    }

    async clickSubmitButton() {
        const commonActions = new CommonActions(this.page);
        const validSelector = await findElementUniversal(this.page, this.submitButton, "submit Button");
        await click(this.page, validSelector);
        await this.page.locator('adv-blocking-overlay').waitFor({ state: 'hidden' });
        await this.page.locator('#systemFeedbackMessageRibbon').waitFor({ state: 'attached' });
        //await commonActions.waitForWithRetry(this.page.locator('#systemFeedbackMessageRibbon'), this.page, 8, 2000);
    }

}