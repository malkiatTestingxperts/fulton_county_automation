import { test, expect } from "@playwright/test";
import { LoginToHomePage } from "../../src/pages/Login.js";
import { LogOut } from "../../src/pages/Logout.js";
import { SearchPageCode } from "../../src/pages/SearchPageCode.js";
import { CommonActions } from "../../src/pages/CommonActions.js";
import { FixedAssetFI } from "../../src/pages/FixedAssetFI.js";
import { launchURL } from "@tx/playwright-core";
import * as dotenv from 'dotenv';
import { generateUniqueName } from "../../src/util/CommonUtils.js";

dotenv.config();

test.describe('GAFULFA-1007.5-Create a FI transaction to decrease a assets value', () => {
    test("Create a FI to decrease an asset value", async ({ page }) => {
        const login = new LoginToHomePage(page);
        const logout = new LogOut(page);
        const searchPage = new SearchPageCode(page);
        const commonActions = new CommonActions(page);
        const fixedAssetFI = new FixedAssetFI(page);
        const baseURL = process.env.BASE_URL;
        const usrName = process.env.USR_NAME;
        const password = process.env.PASSWORD;
        const fixedAsset = process.env.FIXEDASSET_INC_DEC;
        const transactionCode = process.env.TRANSACTION_CODE;
        const transactionDepartment = process.env.TRANSACTION_DEPARTMENT;

        if (!baseURL) {
            throw new Error('BASE_URL environment variable is not set');
        }

        if (!usrName) {
            throw new Error('USR_NAME environment variable is not set');
        }
        if (!password) {
            throw new Error('PASSWORD environment variable is not set');
        }
        if (!fixedAsset) {
            throw new Error('FIXEDASSET_INC_DEC environment variable is not set');
        }

        if (!transactionCode) {
            throw new Error('TRANSACTION_CODE environment variable is not set');
        }

        if (!transactionDepartment) {
            throw new Error('TRANSACTION_DEPARTMENT environment variable is not set');
        }
        await launchURL(page, baseURL);
        await login.loginToApplication(usrName, password);
        await searchPage.clicksearchBarDropDownOption();
        await searchPage.enterTextInSearchBarOption(transactionCode);
        await searchPage.clickPageCodeOption(fixedAsset);
        await commonActions.clickCreateButton();
        await fixedAssetFI.enterTransactionCode(transactionCode);
        await fixedAssetFI.enterTransactionDepartment(transactionDepartment);
        await fixedAssetFI.clickAutonumberedFI();
        await fixedAssetFI.clickContinueButton();
        const faTxnHeader = generateUniqueName('MainAcc');
        await fixedAssetFI.enterFATransactionHeader("Test_" + faTxnHeader);
        await fixedAssetFI.searchAndClickFixedAssetNum();
        await fixedAssetFI.openThreeDottedMenu();
        await fixedAssetFI.clickHowToApplyButton();
        await fixedAssetFI.openAccountingTab();
        await fixedAssetFI.expandFirstRowOnAccountingTab();
        await fixedAssetFI.optionCOASubTab();
        await fixedAssetFI.enterLineAmountInFICOA("50");
        await fixedAssetFI.searchAndClickApprUnit();
        await fixedAssetFI.clickValidateButton();
        const isValidationMessagePresent = await commonActions.expectFeedbackMessage();
        expect(isValidationMessagePresent).toContain('Transaction validated successfully');
        await fixedAssetFI.clickSubmitButton();
        const isSubmitMessagePresent = await commonActions.expectFeedbackMessage();
        expect(isSubmitMessagePresent).toContain('Transaction submitted successfully');
        await logout.logout();
    });
});