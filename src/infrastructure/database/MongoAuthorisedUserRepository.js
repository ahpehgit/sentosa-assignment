const mongoose = require('mongoose');
const AuthorisedUserRepository = require('../../application/contracts/AuthorisedUserRepository');
const AuthorisedUser = require('../../entities/AuthorisedUser');

const AuthorisedUserSchema = new mongoose.Schema({
    name: String,
    password: String,
});

const Model = mongoose.model('AuthorisedUser', AuthorisedUserSchema);

module.exports = class MongoAuthorisedUserRepository extends AuthorisedUserRepository {
    async add(authorisedUserObj) {
        const { name, password } = authorisedUserObj;

        const User = new Model({name, password});
        await User.save()
        .then(() => {
            console.log('Authorised user inserted'); 
        })
        .catch(err => {
            throw err;
        });

        return new AuthorisedUser(name, password);
    }

    async getUser(userName) {
        const data = await Model.findOne({name: userName});
        return data ? new AuthorisedUser(data.name, data.password) : null;
    }

    async deleteAll() {
        
        return await Model.deleteMany({})
        .then(() => {
            console.log('Authorised users all deleted');
        })
        .catch(err => {
            throw err;
        });
    }
}