const express = require('express');
const AttractionController = require('../controllers/AttractionController');
const AuthenticateController = require('../controllers/AuthenticateController');

// address - /<host>:<port>/sample
// load dependencies

const attractionRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = AttractionController(dependencies);
    const authenticateController = AuthenticateController(dependencies);

    router.get('/getByAttractionId/:attractionId', authenticateController.authenticateToken, controller.getByAttractionIdRoute);
    router.get('/getByLocations/:locations', authenticateController.authenticateToken, controller.getByLocationsRoute);
    router.get('/getByPriceRange/', authenticateController.authenticateToken, controller.getByPriceRangeRoute);

    return router;
};

module.exports = attractionRouter;