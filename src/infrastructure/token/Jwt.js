const jwt = require('jsonwebtoken');
const TokenService = require('../../application/contracts/TokenService');

module.exports = class Jwt extends TokenService {
	constructor() {
        super();
    }

    createToken(user, expiry) {
        return jwt.sign({id: user}, process.env.TOKEN_SECRET, { expiresIn: expiry });
    }

    authenticateToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
                if (err) reject(err);

                resolve(user);
            });
        });
    }
}