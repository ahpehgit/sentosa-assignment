const MongoService = require('../infrastructure/database/MongoService');

module.exports = (() => {
    return {
        DBService: new MongoService(),
    };
})();