module.exports = class TokenService {
    constructor() { }

    createToken(user, expiry) {
    	return Promise.reject(new Error('Method not implemented'));
    }

    authenticateToken(token) {
        return Promise.reject(new Error('Method not implemented'));
    }
}