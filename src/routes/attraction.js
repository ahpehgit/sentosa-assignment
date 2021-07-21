const express = require('express');
const AttractionController = require('../controllers/AttractionController');

// address - /<host>:<port>/sample
// load dependencies

const attractionRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = AttractionController(dependencies);
    router.get('/getByAttractionId/:attractionId', controller.getByAttractionIdRoute);
    router.get('/getByLocations/:locations', controller.getByLocationsRoute);
    router.get('/getByPriceRange/', controller.getByPriceRangeRoute);

    return router;
};

module.exports = attractionRouter;