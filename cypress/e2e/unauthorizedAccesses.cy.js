import ProductsPage from './pages/productsPage';
import CartPage from './pages/cartPage';
import CheckoutPage from './pages/checkoutPage';
import ConfirmationPage from './pages/confirmationPage';
import CompletePage from './pages/completePage';

/**
 * Test suite for verifying unauthorized access attempts to protected pages
 */
describe('Unauthorized Access Tests', () => {
    /**
     * Tests unauthorized access attempt to product inventory page
     */
    it('should try to access product page with no login', () => {
        ProductsPage.visitAndValidate();
    });
   
    /**
     * Tests unauthorized access attempt to shopping cart page
     */
    it('should try to access cart page with no login', () => {
        CartPage.visitAndValidate();
    });
   
    /**
     * Tests unauthorized access attempt to checkout page
     */
    it('should try to access checkout page with no login', () => {
        CheckoutPage.visitAndValidate();
    });

    /**
     * Tests unauthorized access attempt to order confirmation page
     */
    it('should try to access confirmation page with no login', () => {
        ConfirmationPage.visitAndValidate();
    });

    /**
     * Tests unauthorized access attempt to order completion page
     */
    it('should try to access complete page with no login', () => {
        CompletePage.visitAndValidate();
    });
});