const MongoService = require('../infrastructure/database/MongoService');
const Jwt = require('../infrastructure/token/Jwt');

module.exports = (() => {
    return {
        DBService: new MongoService(),
        TokenService: new Jwt(),
    };
})();