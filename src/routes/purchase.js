const express = require('express');
const PurchaseController = require('../controllers/PurchaseController');

// address - /<host>:<port>/purchase
// load dependencies

const purchaseRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = PurchaseController(dependencies);
    router.get('/getByTickerNumber/:tickerNumber', controller.getByTickerNumberRoute);
    
    return router;
};

module.exports = purchaseRouter;