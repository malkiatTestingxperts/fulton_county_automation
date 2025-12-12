import { Page } from "@playwright/test";
import { waitForElementToVisible, findElementUniversal, click, type } from "@tx/playwright-core";
import { CommonActions } from "./CommonActions.js";

export class LogOut {
    constructor(private page: Page) { }
    profileIcon = ['[data-qa-id*="profileIcon.userlogo"]', '[jsname="yZiJb0e"]', '[class="gLFyf"]']
    signOut = ['[data-qa*="signout"]', '[jsname="yZiJb0e"]', '[class="gLFyf"]']
    continueButton = ['button[name*="Continue"]', 'button[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]']
    password = ['input[name*="passwordField"]', '[jsname="YPqjbf"]', '[class="whsOnd"]']
    signInButton = ['button[name*="SignIn"]', 'button[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]']
    homePageIcon = ['button[id*="homePage"]', 'div[jsname="hSRGPd"]', 'div[class*="gb_9d"]']
    iAgreeButton = ['button[name*="IAgree"]', 'button[jsname="LgbsSe"]', 'button[class*="VfPpkd-LgbsSe"]']
    iGotItButton = [
        'button[data-qa-id="advIntelligenceDisplay.button"]',
        '#overlayButton',
        'button.overlayButton',
        'button:has-text("OK, I got it")'
    ];

    async clickUserProfile() {
        const validSelector = await findElementUniversal(this.page, this.profileIcon, "User Profile Icon");
        await click(this.page, validSelector);
    }

    async clickSignOutButton() {
        const commonActions = new CommonActions(this.page);
        const validSelector = await findElementUniversal(this.page, this.signOut, "Signout button");
        await click(this.page, validSelector);
        await commonActions.waitForWithRetry(this.page.locator('[data-qa*="signout"] span'), this.page, 3, 2000);
        await click(this.page, validSelector);
    }

    async enterPassword(password: string) {
        const validSelector = await findElementUniversal(this.page, this.password, "Password Input Field");
        await type(this.page, validSelector, password);
    }

    async clickSignInButton() {
        const validSelector = await findElementUniversal(this.page, this.signInButton, "Sign In button");
        await click(this.page, validSelector);
    }

    async clickIAgreeButton() {
        const validSelector = await findElementUniversal(this.page, this.iAgreeButton, "I Agree button");
        await click(this.page, validSelector);
    }

    async clickIGotItButton() {
        const validSelector = await findElementUniversal(this.page, this.iGotItButton, "I Got It button");
        await click(this.page, validSelector);
        const homePageIconValid = await findElementUniversal(this.page, this.homePageIcon, "Home Page Icon");
        await waitForElementToVisible(this.page, homePageIconValid);
    }

    async logout() {
        await this.clickUserProfile();
        await this.clickSignOutButton();
    }
}
