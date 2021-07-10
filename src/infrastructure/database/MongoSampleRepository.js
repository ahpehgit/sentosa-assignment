const SampleRepository = require('../../application/contracts/SampleRepository');


module.exports = class MongoSampleRepository extends SampleRepository {
    async add() {
        console.log('Calling from MongoSampleRepository');
    }
}