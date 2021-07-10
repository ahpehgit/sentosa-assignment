const express = require('express');
const SampleController = require('../controllers/SampleController');

// address - /<host>:<port>/sample
// load dependencies

const sampleRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = SampleController(dependencies);
    router.get('/', controller.sampleRoute);
    return router;
};

module.exports = sampleRouter;