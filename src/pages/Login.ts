import { Page } from "@playwright/test";
import { waitForElementToVisible, findElementUniversal, click, type } from "@tx/playwright-core";

export class LoginToHomePage {
    constructor(private page: Page) { }

    userName = ['input[name*="userIdField"]', '[jsname="yZiJb0e"]', '[class="gLFyf"]']
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
    async enterUserName(userName: string) {
        const validSelector = await findElementUniversal(this.page, this.userName, "User Name Input Field");
        await type(this.page, validSelector, userName);
    }

    async clickContinueButton() {
        const validSelector = await findElementUniversal(this.page, this.continueButton, "Continue button");
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

    async loginToApplication(userName: string, password: string) {
        await this.enterUserName(userName);
        await this.clickContinueButton();
        await this.enterPassword(password);
        await this.clickSignInButton();
        await this.clickIAgreeButton();
        await this.clickIGotItButton();
    }
}
