const bcrypt = require('bcrypt');

module.exports = (TokenService, AuthorisedUserRepository) => {

    const Execute = async (userName, userPassword) => {
        if (!userName || !userPassword) return null;

        const user = await AuthorisedUserRepository.getUser(userName);
        if (user) {
            const isValid = bcrypt.compareSync(userPassword, user.password);
            return isValid ? TokenService.createToken(userName, 3600) : null;
        }
        return null;
    }

    return {
        Execute
    };
}