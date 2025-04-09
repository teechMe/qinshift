/**
 * Page Object Model for the Login/Home page of Saucedemo application
 */
class HomePage {
    // ====================
    // Locators
    // ====================
    header = '.login_logo';
    baseUrl = 'https://www.saucedemo.com/';
    userNameTB = '[data-test="username"]';
    passwordTB = '[data-test="password"]';
    loginBtn = '[data-test="login-button"]';
    error = '[data-test="error"]';
    burgerMenu = '.bm-burger-button';
    allItemsLnk = '[data-test="inventory-sidebar-link"]';
    aboutLnk = '[data-test="about-sidebar-link"]';
    logoutLnk = '[data-test="logout-sidebar-link"]';
    resetAppLnk = '[data-test="reset-sidebar-link"]';

    // ====================
    // Page Actions
    // ====================

    /**
     * Navigates to the Swag Labs homepage URL
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    visit() {
        cy.visit(this.baseUrl);
        return this;
    }

    /**
     * Logs in a user with provided credentials
     * @param {Object} user - User credentials {username, password}
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    logIn(user) {
        if (user.username) {
            cy.get(this.userNameTB).type(user.username);
        } else {
            cy.log('No username provided - skipping username input');
        }
    
        if (user.password) {
            cy.get(this.passwordTB).type(user.password);
        } else {
            cy.log('No password provided - skipping password input');
        }

        cy.get(this.loginBtn).click();
        return this;
    }

    /**
     * Opens the burger menu
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    navigateToBurger() {
        cy.get(this.burgerMenu).should('be.visible').click();
        return this;
    }

    /**
     * Verifies About link exists and has correct href
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    navigateToAbout() {
        cy.get(this.aboutLnk)
          .should('be.visible')
          .and('have.attr', 'href', 'https://saucelabs.com/');
        return this;
    }

    /**
     * Clicks the Logout link
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    logOut() {
        cy.get(this.logoutLnk).click();
        return this;
    }

    /**
     * Clicks the All Items link
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    navigateToAllItems() {
        cy.get(this.allItemsLnk).click();
        return this;
    }

    // ====================
    // Validation Methods
    // ====================

    /**
     * Validates all critical page elements load correctly
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    validatePageLoad() {
        this.validateURL()
            .validateTitle()
            .validateHeaders()
            .validateLoginForm();
        return this;
    }

    /**
     * Validates homepage URL contains 'saucedemo'
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    validateURL() {
        cy.url().should('include', 'saucedemo');
        return this;
    }

    /**
     * Validates homepage title equals 'Swag Labs'
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    validateTitle() {
        cy.title().should('eq', 'Swag Labs');
        return this;
    }

    /**
     * Validates homepage header is visible and has correct text
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    validateHeaders() {
        cy.get(this.header)
          .should('be.visible')
          .and('have.text', 'Swag Labs');
        return this;
    }

    /**
     * Validates login form elements are visible
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    validateLoginForm() {
        cy.get(this.userNameTB).should('be.visible');
        cy.get(this.passwordTB).should('be.visible');
        cy.get(this.loginBtn)
          .should('be.visible')
          .and('have.value', 'Login');
        return this;
    }

    /**
     * Validates error message for locked user
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    validateLogInErrorLockedUser() {
        cy.get(this.error)
          .should('have.text', 'Epic sadface: Sorry, this user has been locked out.');
        return this;
    }

    /**
     * Validates error message for wrong credentials
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    validateLogInErrorWrongCreds() {
        cy.get(this.error)
          .should('have.text', 'Epic sadface: Username and password do not match any user in this service');
        return this;
    }

    /**
     * Validates error message for missing username
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    validateLogInErrorNoUsername() {
        cy.get(this.error)
          .should('have.text', 'Epic sadface: Username is required');
        return this;
    }

    /**
     * Validates error message for missing password
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    validateLogInErrorNoPassword() {
        cy.get(this.error)
          .should('have.text', 'Epic sadface: Password is required');
        return this;
    }

    /**
     * Validates all burger menu items are visible with correct text
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    validateBurgerMenu() {
        cy.get(this.allItemsLnk)
          .should('be.visible')
          .and('have.text', 'All Items');
        cy.get(this.aboutLnk)
          .should('be.visible')
          .and('have.text', 'About');
        cy.get(this.logoutLnk)
          .should('be.visible')
          .and('have.text', 'Logout');
        cy.get(this.resetAppLnk)
          .should('be.visible')
          .and('have.text', 'Reset App State');
        return this;
    }
}

export default new HomePage();