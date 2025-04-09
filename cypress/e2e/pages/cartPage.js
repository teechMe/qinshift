import HomePage from './homePage';

/**
 * Page Object Model for the Cart page of Saucedemo application
 */
class CartPage {
    // ====================
    // Locators
    // ====================
    cartUrl = 'https://www.saucedemo.com/cart.html';
    title = '.title';
    shoppingCartLnk = '[data-test="shopping-cart-link"]';
    cartContainer = '[data-test="cart-contents-container"]';
    qtyLbl = '[data-test="cart-quantity-label"]';
    descriptionLbl = '[data-test="cart-desc-label"]';
    inventItem = '[data-test="inventory-item"]';
    inventQuantity = '[data-test="item-quantity"]';
    inventName = '[data-test="inventory-item-name"]';
    inventDesc = '[data-test="inventory-item-desc"]';
    inventPrice = '[data-test="inventory-item-price"]';
    removeBtn = '[data-test^="remove-"]';
    continueBtn = '[data-test="continue-shopping"]';
    checkoutBtn = '[data-test="checkout"]';

    // ====================
    // Validation Methods
    // ====================

    /**
     * Validates successful addition of product to cart by checking all cart elements
     * @returns {CartPage} Instance of CartPage for method chaining
     */
    validateSuccessfulAddingProductToCart() {
        cy.get(this.title).should('be.visible').and('have.text', 'Your Cart');
        cy.get(this.shoppingCartLnk).should('be.visible');
        cy.get(this.cartContainer).should('be.visible');
        cy.get(this.qtyLbl).should('be.visible').and('have.text', 'QTY');
        cy.get(this.descriptionLbl).should('be.visible').and('have.text', 'Description');
        cy.get(this.inventItem).should('be.visible');
        cy.get(this.inventQuantity).should('be.visible');
        cy.get(this.inventName).should('be.visible');
        cy.get(this.inventDesc).should('be.visible');
        cy.get(this.inventPrice).should('be.visible');
        cy.get(this.removeBtn).should('be.visible').and('have.text', 'Remove');
        cy.get(this.continueBtn).should('be.visible').and('have.text', 'Continue Shopping');
        cy.get(this.checkoutBtn).should('be.visible').and('have.text', 'Checkout');
        return this;
    }

    /**
     * Validates product details in cart match expected values
     * @param {Object} productDetails - Expected product details {name, desc, price}
     * @returns {CartPage} Instance of CartPage for method chaining
     */
    validateProductDetails(productDetails) {
        cy.get(this.inventName).should('have.text', productDetails.name);
        cy.get(this.inventDesc).should('have.text', productDetails.desc);
        cy.get(this.inventPrice).should('have.text', productDetails.price);
        return this;
    }

    /**
     * Validates product details visually (with price mismatch expectation)
     * @param {Object} productDetails - Expected product details {name, desc, price}
     * @returns {CartPage} Instance of CartPage for method chaining
     */
    validateProductDetailsVisualUser(productDetails) {
        cy.get(this.inventName).should('have.text', productDetails.name);
        cy.get(this.inventDesc).should('have.text', productDetails.desc);
        cy.get(this.inventPrice).should('not.have.text', productDetails.price);
        return this;
    }

    // ====================
    // Page Actions
    // ====================

    /**
     * Clicks the Checkout button
     * @returns {CartPage} Instance of CartPage for method chaining
     */
    clickCheckout() {
        cy.get(this.checkoutBtn).click();
        return this;
    }

    /**
     * Visits cart page and validates unauthorized access redirect
     * @returns {CartPage} Instance of CartPage for method chaining
     */
    visitAndValidate() {
        cy.visit(this.cartUrl, { failOnStatusCode: false });
        
        cy.url().should('eq', HomePage.baseUrl);
        cy.get(HomePage.error)
          .should('be.visible')
          .and('have.text', "Epic sadface: You can only access '/cart.html' when you are logged in.");
          
        return this;
    }

    /**
     * Clicks the Continue Shopping button
     * @returns {HomePage} Instance of HomePage for method chaining
     */
    clickContinueShopping() {
        cy.get(this.continueBtn).click();
        return HomePage;
    }

    /**
     * Removes item from cart by product name
     * @param {string} productName - Name of product to remove
     * @returns {CartPage} Instance of CartPage for method chaining
     */
    removeItem(productName) {
        cy.get(this.inventName)
          .contains(productName)
          .parents(this.inventItem)
          .find(this.removeBtn)
          .click();
        return this;
    }
}

export default new CartPage();