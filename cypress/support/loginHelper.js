const credentials = require('../fixtures/credentials.json');

class LoginHelper {
    static getCredentials(userType) {
        return credentials[userType]; // Direct synchronous access
    }
}

export default LoginHelper;