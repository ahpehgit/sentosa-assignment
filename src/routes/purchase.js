const express = require('express');
const PurchaseController = require('../controllers/PurchaseController');
const AuthenticateController = require('../controllers/AuthenticateController');

// address - /<host>:<port>/purchase
// load dependencies

const purchaseRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = PurchaseController(dependencies);
    const authenticateController = AuthenticateController(dependencies);

    router.get('/getByTickerNumber/:tickerNumber', authenticateController.authenticateToken, controller.getByTickerNumberRoute);
    router.post('/createPurchase', authenticateController.authenticateToken, controller.createPurchaseRoute);
    
    return router;
};

module.exports = purchaseRouter;