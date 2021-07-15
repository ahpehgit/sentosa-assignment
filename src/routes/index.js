const express = require('express');
const sample = require('./sample');
const attraction = require('./attraction');

const apiRouter = (dependencies) => {
    const routes = express.Router();

    const sampleRouter = sample(dependencies);
    const attractionRouter = attraction(dependencies);

    routes.use('/sample', sampleRouter);
    routes.use('/attraction', attractionRouter);
    
    return routes;
};

module.exports = apiRouter;