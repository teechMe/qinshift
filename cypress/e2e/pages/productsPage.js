import HomePage from './homePage';

/**
 * Page Object Model for the Products/Inventory page of Saucedemo application
 */
class ProductPage {
    // ====================
    // Locators
    // ====================
    productUrl = 'https://www.saucedemo.com/inventory.html';
    burgerBtn = '[data-test="open-menu"]';
    header = '.app_logo';
    title = '.title';
    shopingCartLnk = '[data-test="shopping-cart-link"]';
    sortDD = '[data-test="product-sort-container"]';
    productContainer = '[data-test="inventory-container"]';
    productItems = '[data-test="inventory-item"]';
    addToCartBtn = '[data-test^="add-to-cart"]';
    removeBtn = '[data-test^="remove-"]';
    productName = '[data-test="inventory-item-name"]';
    productDesc = '[data-test="inventory-item-desc"]';
    productPrice = '[data-test="inventory-item-price"]';

    // Store product details as an object
    selectedProduct = {
        name: '',
        desc: '',
        price: ''
    };

    // ====================
    // Validation Methods
    // ====================

    /**
     * Validates successful login by checking all product page elements
     * @returns {ProductPage} Instance of ProductPage for method chaining
     */
    validateSuccessfulLogin() {
        cy.get(this.burgerBtn).should('be.visible');
        cy.get(this.header)
          .should('be.visible')
          .and('have.text', 'Swag Labs');
        cy.get(this.title)
          .should('be.visible')
          .and('have.text', 'Products');
        cy.get(this.shopingCartLnk).should('be.visible');
        cy.get(this.sortDD)
          .should('be.visible')
          .and('contain', 'Name (A to Z)');
        cy.get(this.productContainer).should('be.visible');
        return this;
    }

    /**
     * Validates product list contains exactly 6 items
     * @returns {ProductPage} Instance of ProductPage for method chaining
     */
    validateProductListCount() {
        cy.get(this.productItems)
          .should('be.visible')
          .and('have.length', 6);
        return this;
    }

    /**
     * Validates the selected product shows Remove button
     * @returns {ProductPage} Instance of ProductPage for method chaining
     */
    validateSelectedProduct() {
        cy.get(this.removeBtn)
          .should('be.visible')
          .and('have.text', 'Remove');
        return this;
    }

    /**
     * Validates shopping cart badge shows 1 item
     * @returns {ProductPage} Instance of ProductPage for method chaining
     */
    validateShoppingCart() {
        cy.get(this.shopingCartLnk)
          .should('be.visible')
          .and('contain', '1');
        return this;
    }

    // ====================
    // Page Actions
    // ====================

    /**
     * Gets a random product from the inventory list
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} Random product element
     */
    getRandomProduct() {
        return cy.get(this.productItems).then(($products) => {
            const randomIndex = Math.floor(Math.random() * $products.length);
            return cy.wrap($products[randomIndex]);
        });
    }

    /**
     * Adds random product to cart and stores its details
     * @returns {Cypress.Chainable<Object>} Chainable with selected product details
     */
    addRandomProductToCart() {
        this.getRandomProduct().then(($product) => {
            cy.wrap($product).find(this.productName).invoke('text')
                .then(name => { this.selectedProduct.name = name; });
            cy.wrap($product).find(this.productDesc).invoke('text')
                .then(desc => { this.selectedProduct.desc = desc; });
            cy.wrap($product).find(this.productPrice).invoke('text')
                .then(price => { this.selectedProduct.price = price; });
            cy.wrap($product).find(this.addToCartBtn).click();
        });
        
        return cy.wrap(this.selectedProduct);
    }

    /**
     * Gets the name of a random product
     * @returns {Cypress.Chainable<string>} Product name text
     */
    getRandomProductName() {
        return this.getRandomProduct()
            .find(this.productName)
            .invoke('text');
    }

    /**
     * Clicks on shopping cart link
     * @returns {void}
     */
    clickOnCart() {
        cy.get(this.shopingCartLnk).click();
    }

    /**
     * Visits product page and validates unauthorized access redirect
     * @returns {ProductPage} Instance of ProductPage for method chaining
     */
    visitAndValidate() {
        cy.visit(this.productUrl, { failOnStatusCode: false });
        
        cy.url().should('eq', HomePage.baseUrl);
        cy.get(HomePage.error)
          .should('be.visible')
          .and('have.text', "Epic sadface: You can only access '/inventory.html' when you are logged in.");
          
        return this;
    }
}

export default new ProductPage();