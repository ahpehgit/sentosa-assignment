const express = require('express');
const LoginController = require('../controllers/LoginController');

// address - /<host>:<port>/login
// load dependencies

const loginRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = LoginController(dependencies);
    router.post('/', controller.login);
    return router;
};

module.exports = loginRouter;