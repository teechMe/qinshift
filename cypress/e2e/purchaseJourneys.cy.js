import HomePage from './pages/homePage';
import ProductsPage from './pages/productsPage';
import CartPage from './pages/cartPage';
import CheckoutPage from './pages/checkoutPage';
import ConfirmationPage from './pages/confirmationPage';
import CompletePage from './pages/completePage';

/**
 * Test suite for complete purchase journeys and various user scenarios
 */
describe('Purchase Journeys', () => {
    /**
     * Tests complete purchase flow for a standard valid user
     */
    it('should complete the entire purchase flow for valid user', () => {
        // 1. Initialize and login
        const credentials = require('../fixtures/credentials.json').validUser;
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify products page
        ProductsPage.validateSuccessfulLogin()
            .validateProductListCount();
        
        // 3. Add product to cart and validate
        ProductsPage.addRandomProductToCart()
            .then((productDetails) => {
                ProductsPage.validateShoppingCart()
                    .validateSelectedProduct();
                
                // 4. Go to cart page
                ProductsPage.clickOnCart();
                
                // 5. Validate cart page, product details and click on Checkout
                CartPage.validateSuccessfulAddingProductToCart()
                    .validateProductDetails(productDetails)
                    .clickCheckout();

                // 6. Validate Checkout page and click continue
                const userData = require('../fixtures/userData.json').validUser;
                CheckoutPage.validateCheckoutPage()
                    .addCheckoutData(userData)
                    .clickContinue();

                // 7. Validate Confirmation page and click Finish
                ConfirmationPage.validateConfirmationPage(productDetails)
                    .clickFinish();

                // 8. Validate Complete page and click Back Home
                CompletePage.validateCompletePage()
                    .clickBackHome();
            });
    });

    /**
     * Tests login attempt with locked user credentials
     */
    it('should try log in with locked user', () => {
        // 1. Initialize and login
        const credentials = require('../fixtures/credentials.json').lockedUser;
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify error message
        HomePage.validateLogInErrorLockedUser();
    });

    /**
     * Tests purchase attempt with problematic user (expecting errors)
     */
    it('should try to purchase product with problematic user', () => {
        // 1. Initialize and login
        const credentials = require('../fixtures/credentials.json').problematicUser;
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify products page
        ProductsPage.validateSuccessfulLogin()
            .validateProductListCount();

        // 3. Add product to cart and validate
        ProductsPage.addRandomProductToCart()
            .then((productDetails) => {
                ProductsPage.validateShoppingCart()
                    .validateSelectedProduct();
                
                // 4. Go to cart page
                ProductsPage.clickOnCart();

                // 5. Validate cart page and click Checkout
                CartPage.validateSuccessfulAddingProductToCart()
                    .validateProductDetails(productDetails)
                    .clickCheckout();

                // 6. Validate Checkout page and verify error
                const userData = require('../fixtures/userData.json').validUser;
                CheckoutPage.validateCheckoutPage()
                    .addCheckoutData(userData)
                    .clickContinue()
                    .validateErrorContainer();
            });
    });

    /**
     * Tests complete purchase flow for low performance user
     */
    it('should complete the entire purchase flow for low performance user', () => {
        // 1. Initialize and login
        const credentials = require('../fixtures/credentials.json').lowPerformanceUser;
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify products page
        ProductsPage.validateSuccessfulLogin()
            .validateProductListCount();
        
        // 3. Add product to cart and validate
        ProductsPage.addRandomProductToCart()
            .then((productDetails) => {
                ProductsPage.validateShoppingCart()
                    .validateSelectedProduct();
                
                // 4. Go to cart page
                ProductsPage.clickOnCart();
                
                // 5. Validate cart page and click Checkout
                CartPage.validateSuccessfulAddingProductToCart()
                    .validateProductDetails(productDetails)
                    .clickCheckout();

                // 6. Fill checkout info and continue
                const userData = require('../fixtures/userData.json').validUser;
                CheckoutPage.validateCheckoutPage()
                    .addCheckoutData(userData)
                    .clickContinue();

                // 7. Confirm order and finish
                ConfirmationPage.validateConfirmationPage(productDetails)
                    .clickFinish();

                // 8. Validate completion
                CompletePage.validateCompletePage()
                    .clickBackHome();
            });
    });

    /**
     * Tests checkout form submission with error-prone user
     */
    it('should try to insert user data for error user', () => {
        // 1. Initialize and login
        const credentials = require('../fixtures/credentials.json').errorUser;
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify products page
        ProductsPage.validateSuccessfulLogin()
            .validateProductListCount();
        
        // 3. Add product to cart and validate
        ProductsPage.addRandomProductToCart()
            .then((productDetails) => {
                ProductsPage.validateShoppingCart()
                    .validateSelectedProduct();
                
                // 4. Go to cart page
                ProductsPage.clickOnCart();
                
                // 5. Validate cart page and click Checkout
                CartPage.validateSuccessfulAddingProductToCart()
                    .validateProductDetails(productDetails)
                    .clickCheckout();

                // 6. Attempt checkout with error handling
                const userData = require('../fixtures/userData.json').validUser;
                CheckoutPage.validateCheckoutPage()
                    .addCheckoutDataError(userData);
            });
    });

    /**
     * Tests purchase flow for visual user (validates visual aspects)
     */
    it('should complete the entire purchase flow for visual user', () => {
        // 1. Initialize and login
        const credentials = require('../fixtures/credentials.json').visualUser;
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify products page
        ProductsPage.validateSuccessfulLogin()
            .validateProductListCount();
        
        // 3. Add product to cart and validate
        ProductsPage.addRandomProductToCart()
            .then((productDetails) => {
                ProductsPage.validateShoppingCart()
                    .validateSelectedProduct();
                
                // 4. Go to cart page
                ProductsPage.clickOnCart();
                
                // 5. Validate cart page with visual checks
                CartPage.validateSuccessfulAddingProductToCart()
                    .validateProductDetailsVisualUser(productDetails);
            });
    });
});