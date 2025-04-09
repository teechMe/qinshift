import HomePage from './homePage';

/**
 * Page Object Model for the Checkout Confirmation page of Saucedemo application
 */
class ConfirmationPage {
    // ====================
    // Locators
    // ====================
    confirmationtUrl = 'https://www.saucedemo.com/checkout-step-two.html';
    title = '.title';
    shoppingCartLnk = '[data-test="shopping-cart-link"]';
    checkoutSummaryContainer = '[data-test="checkout-summary-container"]';
    qtyLbl = '[data-test="cart-quantity-label"]';
    descriptionLbl = '[data-test="cart-desc-label"]';
    inventItem = '[data-test="inventory-item"]';
    inventQuantity = '[data-test="item-quantity"]';
    inventName = '[data-test="inventory-item-name"]';
    inventDesc = '[data-test="inventory-item-desc"]';
    inventPrice = '[data-test="inventory-item-price"]';
    paymentInfoLbl = '[data-test="payment-info-label"]';
    paymentInfoValueLbl = '[data-test="payment-info-value"]';
    shippingInfoLbl = '[data-test="shipping-info-label"]';
    shippingInfoValueLbl = '[data-test="shipping-info-value"]';
    priceTotalLbl = '[data-test="total-info-label"]';
    priceTotalValueLbl = '[data-test="subtotal-label"]';
    taxLbl = '[data-test="tax-label"]';
    totalLbl = '[data-test="total-label"]';
    cancelBtn = '[data-test="cancel"]';
    finishBtn = '[data-test="finish"]';

    // ====================
    // Validation Methods
    // ====================

    /**
     * Validates all elements and calculations on the confirmation page
     * @param {Object} productDetails - Product details {name, desc, price}
     * @param {number} [taxRate=0.081] - Tax rate as decimal (default 8.1%)
     * @returns {ConfirmationPage} Instance of ConfirmationPage for method chaining
     */
    validateConfirmationPage(productDetails, taxRate = 0.081) {
        cy.get(this.title)
          .should('be.visible')
          .and('have.text', 'Checkout: Overview');
        cy.get(this.shoppingCartLnk).should('be.visible');
        cy.get(this.checkoutSummaryContainer).should('be.visible');
        cy.get(this.qtyLbl)
          .should('be.visible')
          .and('have.text', 'QTY');
        cy.get(this.descriptionLbl)
          .should('be.visible')
          .and('have.text', 'Description');
        cy.get(this.inventItem).should('be.visible');
        cy.get(this.inventQuantity).should('be.visible');
        cy.get(this.inventName)
          .should('be.visible')
          .and('have.text', productDetails.name);
        cy.get(this.inventDesc)
          .should('be.visible')
          .and('have.text', productDetails.desc);
        cy.get(this.inventPrice)
          .should('be.visible')
          .and('have.text', productDetails.price);
        cy.get(this.paymentInfoLbl)
          .should('be.visible')
          .and('have.text', 'Payment Information:');
        cy.get(this.paymentInfoValueLbl)
          .should('be.visible')
          .and('contain', 'SauceCard');
        cy.get(this.shippingInfoLbl)
          .should('be.visible')
          .and('have.text', 'Shipping Information:');
        cy.get(this.shippingInfoValueLbl)
          .should('be.visible')
          .and('have.text', 'Free Pony Express Delivery!');
        cy.get(this.priceTotalLbl)
          .should('be.visible')
          .and('have.text', 'Price Total');
        cy.get(this.priceTotalValueLbl)
          .should('be.visible')
          .and('have.text', `Item total: ${productDetails.price}`);

        // Convert price to number once
        const itemPrice = parseFloat(productDetails.price.replace('$', ''));
        const expectedTax = itemPrice * taxRate;
        const expectedTotal = itemPrice + expectedTax;

        // Validate tax with tolerance
        cy.get(this.taxLbl)
          .should('be.visible')
          .then((el) => {
              const taxValue = parseFloat(el.text().replace(/[^\d.]/g, ''));
              expect(taxValue).to.be.within(
                  expectedTax - 0.1,
                  expectedTax + 0.1
              );
          })
          .and('contain', 'Tax: $');

        // Validate total with tolerance
        cy.get(this.totalLbl)
          .should('be.visible')
          .then((el) => {
              const totalValue = parseFloat(el.text().replace(/[^\d.]/g, ''));
              expect(totalValue).to.be.within(
                  expectedTotal - 0.1,
                  expectedTotal + 0.1
              );
          })
          .and('contain', 'Total: $');

        cy.get(this.cancelBtn)
          .should('be.visible')
          .and('contain.text', 'Cancel');
        cy.get(this.finishBtn)
          .should('be.visible')
          .and('contain.text', 'Finish');

        return this;
    }

    // ====================
    // Page Actions
    // ====================

    /**
     * Clicks the Finish button to complete checkout
     * @returns {ConfirmationPage} Instance of ConfirmationPage for method chaining
     */
    clickFinish() {
        cy.get(this.finishBtn).click();
        return this;
    }

    /**
     * Visits confirmation page and validates unauthorized access redirect
     * @returns {ConfirmationPage} Instance of ConfirmationPage for method chaining
     */
    visitAndValidate() {
        cy.visit(this.confirmationtUrl, { failOnStatusCode: false });
        
        cy.url().should('eq', HomePage.baseUrl);
        cy.get(HomePage.error)
          .should('be.visible')
          .and('have.text', "Epic sadface: You can only access '/checkout-step-two.html' when you are logged in.");
          
        return this;
    }
}

export default new ConfirmationPage();