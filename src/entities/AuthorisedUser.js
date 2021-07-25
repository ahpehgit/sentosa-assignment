module.exports = class AuthorisedUser {
    constructor(user, password = '') {
        this.user = user;
        this.password = password;
    }
};