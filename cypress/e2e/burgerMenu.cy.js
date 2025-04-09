import HomePage from './pages/homePage';
import ProductsPage from './pages/productsPage';

/**
 * Test suite for Burger Menu functionality
 */
describe("Burger Menu Testing", () => {
    /**
     * Tests the Logout functionality from the burger menu
     */
    it('should verify Logout link', () => {
        // 1. Initialize and login
        const credentials = require('../fixtures/credentials.json').validUser;
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify products page
        ProductsPage.validateSuccessfulLogin()
            .validateProductListCount();
        
        // 3. Navigate to Logout
        HomePage.navigateToBurger()
            .validateBurgerMenu()
            .logOut();
        
        // 4. Validate LogOut
        HomePage.validatePageLoad();
    });

    /**
     * Tests the All Items link functionality from the burger menu
     */
    it('should verify All Items link', () => {
        // 1. Initialize and login
        const credentials = require('../fixtures/credentials.json').validUser;
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify products page
        ProductsPage.validateSuccessfulLogin()
            .validateProductListCount();
        
        // 3. Verify products page again (duplicate step - consider removing)
        ProductsPage.validateSuccessfulLogin()
            .validateProductListCount();
        
        // 4. Add product to cart and validate
        ProductsPage.addRandomProductToCart()
            .then((productDetails) => {
                ProductsPage.validateShoppingCart()
                    .validateSelectedProduct();
                
                // 5. Go to cart page
                ProductsPage.clickOnCart();
            });
        
        // 6. Navigate to All Items and validate
        HomePage.navigateToBurger()
            .validateBurgerMenu()
            .navigateToAllItems();
        ProductsPage.validateSuccessfulLogin()
            .validateProductListCount();
    });

    /**
     * Tests the About link functionality from the burger menu
     */
    it('should verify About link', () => {
        // 1. Initialize and login
        const credentials = require('../fixtures/credentials.json').validUser;
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify products page
        ProductsPage.validateSuccessfulLogin()
            .validateProductListCount();
        
        // 3. Navigate to About
        HomePage.navigateToBurger()
            .validateBurgerMenu();
        HomePage.navigateToAbout();
    });
});