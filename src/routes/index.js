const express = require('express');
const sample = require('./sample');

const apiRouter = (dependencies) => {
    const routes = express.Router();

    const sampleRouter = sample(dependencies);
    
    routes.use('/sample', sampleRouter);
    
    return routes;
};

module.exports = apiRouter;