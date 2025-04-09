import HomePage from './homePage';

/**
 * Page Object Model for the Checkout pages of Saucedemo application
 */
class CheckoutPage {
    // ====================
    // Locators
    // ====================
    checkoutUrl = 'https://www.saucedemo.com/checkout-step-one.html';
    title = '.title';
    shoppingCartLnk = '[data-test="shopping-cart-link"]';
    firstNameTB = '[data-test="firstName"]';
    lastNameTB = '[data-test="lastName"]';
    postalCodeTB = '[data-test="postalCode"]';
    cancelBtn = '[data-test="cancel"]';
    continueBtn = '[data-test="continue"]';
    errorContainer = '[data-test="error"]';

    // ====================
    // Validation Methods
    // ====================

    /**
     * Validates all elements on the checkout information page
     * @returns {CheckoutPage} Instance of CheckoutPage for method chaining
     */
    validateCheckoutPage() {
        cy.get(this.title)
          .should('be.visible')
          .and('have.text', 'Checkout: Your Information');
        cy.get(this.shoppingCartLnk).should('be.visible');
        cy.get(this.firstNameTB).should('be.visible');
        cy.get(this.lastNameTB).should('be.visible');
        cy.get(this.postalCodeTB).should('be.visible');
        cy.get(this.cancelBtn)
          .should('be.visible')
          .and('have.text', 'Cancel');
        cy.get(this.continueBtn)
          .should('be.visible')
          .and('have.value', 'Continue');
        return this;
    }

    /**
     * Validates error message for missing last name
     * @returns {CheckoutPage} Instance of CheckoutPage for method chaining
     */
    validateErrorContainer() {
        cy.get(this.errorContainer)
          .should('be.visible')
          .and('have.text', 'Error: Last Name is required');
        return this;
    }

    /**
     * Validates specific error message appears
     * @param {string} errorMessage - Expected error message text
     * @returns {CheckoutPage} Instance of CheckoutPage for method chaining
     */
    validateSpecificErrorMessage(errorMessage) {
        cy.get(this.errorContainer)
          .should('be.visible')
          .and('have.text', errorMessage);
        return this;
    }

    // ====================
    // Page Actions
    // ====================

    /**
     * Enters checkout information
     * @param {Object} userdata - User information {firstName, lastName, postalCode}
     * @returns {CheckoutPage} Instance of CheckoutPage for method chaining
     */
    addCheckoutData(userdata) {
        cy.get(this.firstNameTB).type(userdata.firstName);
        cy.get(this.lastNameTB).type(userdata.lastName);
        cy.get(this.postalCodeTB).type(userdata.postalCode);
        return this;
    }

    /**
     * Enters checkout information with expected error handling
     * @param {Object} userdata - User information {firstName, lastName, postalCode}
     * @returns {CheckoutPage} Instance of CheckoutPage for method chaining
     */
    addCheckoutDataError(userdata) {
        cy.get(this.firstNameTB).type(userdata.firstName);
        
        // Handle expected JavaScript error
        cy.on('uncaught:exception', (err) => {
            expect(err.message).to.include('Cannot read properties of undefined');
            return false; // Prevent failing the test
        });
        
        cy.get(this.lastNameTB).type(userdata.lastName);
        cy.get(this.postalCodeTB).type(userdata.postalCode);
        return this;
    }

    /**
     * Clicks the Continue button
     * @returns {CheckoutPage} Instance of CheckoutPage for method chaining
     */
    clickContinue() {
        cy.get(this.continueBtn).click();
        return this;
    }

    /**
     * Clicks the Cancel button
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    clickCancel() {
        cy.get(this.cancelBtn).click();
        return HomePage;
    }

    /**
     * Visits checkout page and validates unauthorized access redirect
     * @returns {CheckoutPage} Instance of CheckoutPage for method chaining
     */
    visitAndValidate() {
        cy.visit(this.checkoutUrl, { failOnStatusCode: false });
        
        cy.url().should('eq', HomePage.baseUrl);
        cy.get(HomePage.error)
          .should('be.visible')
          .and('have.text', "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.");
          
        return this;
    }

    /**
     * Clears all checkout form fields
     * @returns {CheckoutPage} Instance of CheckoutPage for method chaining
     */
    clearForm() {
        cy.get(this.firstNameTB).clear();
        cy.get(this.lastNameTB).clear();
        cy.get(this.postalCodeTB).clear();
        return this;
    }
}

export default new CheckoutPage();