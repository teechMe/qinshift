import HomePage from './pages/homePage';

/**
 * Test suite for negative login scenarios
 */
describe('Negative Login Tests', () => {
    /**
     * Tests login with incorrect username and password
     */
    it('should try login with wrong username', () => {
        // 1. Initialize and login
        const credentials = {
            username: "test1234567",
            password: "test1234567"
        };
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify error message
        HomePage.validateLogInErrorWrongCreds();
    });

    /**
     * Tests login with space character in username
     */
    it('should try login with space in username', () => {
        // 1. Initialize and login
        const credentials = {
            username: " ",
            password: "test1234567"
        };
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify error message
        HomePage.validateLogInErrorWrongCreds();
    });

    /**
     * Tests login with space character in password
     */
    it('should try login with space in password', () => {
        // 1. Initialize and login
        let credentials = require('../fixtures/credentials.json').validUser;
        credentials.password = ' ';
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify error message
        HomePage.validateLogInErrorWrongCreds();
    });

    /**
     * Tests login with missing username
     */
    it('should try login with no username', () => {
        // 1. Initialize and login
        const credentials = {
            password: "test1234567"
        };
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify error message
        HomePage.validateLogInErrorNoUsername();
    });

    /**
     * Tests login with missing password
     */
    it('should try login with no password', () => {
        // 1. Initialize and login
        const credentials = {
            username: "test1234567"
        };
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify error message
        HomePage.validateLogInErrorNoPassword();
    });

    /**
     * Tests login with Cyrillic script in credentials
     */
    it('should try login with cyrilic script in username and password', () => {
        // 1. Initialize and login
        const credentials = {
            username: "Ћићевац",
            password: "Грлишка Река"
        };
        HomePage.visit().validatePageLoad()
            .logIn(credentials);
        
        // 2. Verify error message
        HomePage.validateLogInErrorWrongCreds();
    });
});