const express = require('express');
const attraction = require('./attraction');
const purchase = require('./purchase');
const login = require('./login');

const apiRouter = (dependencies) => {
    const routes = express.Router();

    const attractionRouter = attraction(dependencies);
    const purchaseRouter = purchase(dependencies);
    const loginRouter = login(dependencies);

    routes.use('/attraction', attractionRouter);
    routes.use('/purchase', purchaseRouter);
    routes.use('/login', loginRouter);
    
    return routes;
};

module.exports = apiRouter;