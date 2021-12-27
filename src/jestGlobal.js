require('dotenv').config();
const createServer = require('./createServer');

module.exports = async () => {
    console.log('Jest global startup');
    await createServer();    
};