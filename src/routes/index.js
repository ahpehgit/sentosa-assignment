const express = require('express');
const sample = require('./sample');
const attraction = require('./attraction');
const purchase = require('./purchase');

const apiRouter = (dependencies) => {
    const routes = express.Router();

    const sampleRouter = sample(dependencies);
    const attractionRouter = attraction(dependencies);
    const purchaseRouter = purchase(dependencies);

    routes.use('/sample', sampleRouter);
    routes.use('/attraction', attractionRouter);
    routes.use('/purchase', purchaseRouter);
    
    return routes;
};

module.exports = apiRouter;