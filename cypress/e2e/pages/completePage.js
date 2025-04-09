import HomePage from './homePage';

/**
 * Page Object Model for the Checkout Complete page of Saucedemo application
 */
class CompletePage {
    // ====================
    // Locators
    // ====================
    completeUrl = 'https://www.saucedemo.com/checkout-complete.html';
    title = '.title';
    shoppingCartLnk = '[data-test="shopping-cart-link"]';
    checkoutCompleteContainer = '[data-test="checkout-complete-container"]';
    completeLogo = '[data-test="pony-express"]';
    completeHeader = '[data-test="complete-header"]';
    completeText = '[data-test="complete-text"]';
    backHomeBtn = '[data-test="back-to-products"]';

    // ====================
    // Validation Methods
    // ====================

    /**
     * Validates all elements on the checkout complete page
     * @returns {CompletePage} Instance of CompletePage for method chaining
     */
    validateCompletePage() {
        cy.get(this.title)
          .should('be.visible')
          .and('have.text', 'Checkout: Complete!');
        cy.get(this.shoppingCartLnk).should('be.visible');
        cy.get(this.checkoutCompleteContainer).should('be.visible');
        cy.get(this.completeLogo).should('be.visible');
        cy.get(this.completeHeader)
          .should('be.visible')
          .and('have.text', 'Thank you for your order!');
        cy.get(this.completeText)
          .should('be.visible')
          .and('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        cy.get(this.backHomeBtn)
          .should('be.visible')
          .and('have.text', 'Back Home');
        return this;
    }

    // ====================
    // Page Actions
    // ====================

    /**
     * Clicks the Back Home button
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    clickBackHome() {
        cy.get(this.backHomeBtn).click();
        return HomePage;
    }

    /**
     * Visits complete page and validates unauthorized access redirect
     * @returns {CompletePage} Instance of CompletePage for method chaining
     */
    visitAndValidate() {
        cy.visit(this.completeUrl, { failOnStatusCode: false });
        
        cy.url().should('eq', HomePage.baseUrl);
        cy.get(HomePage.error)
          .should('be.visible')
          .and('have.text', "Epic sadface: You can only access '/checkout-complete.html' when you are logged in.");
          
        return this;
    }

    /**
     * Verifies current URL matches the complete page URL
     * @returns {CompletePage} Instance of CompletePage for method chaining
     */
    validateUrl() {
        cy.url().should('eq', this.completeUrl);
        return this;
    }
}

export default new CompletePage();