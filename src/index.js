const express = require('express');
const cors = require('express');
const routes = require('./routes');
const dependencies = require('./config/dependencies');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.SERVER || 'localhost';

dependencies.DBService.initDatabase().then(() => {

    // * Application-Level Middleware * //

    // Third-Party Middleware
    
    // Built-In Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // load routes
    app.use('/', routes(dependencies));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // * Start * //
    app.listen(port, () => {
        console.log(`App host name is ${host}!`),
        console.log(`App listening on port ${port}!`);
    });

}, (err) => {
    console.log(`DB not ready, err:${err}`);
    process.exit(1);
});