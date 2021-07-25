module.exports = (dependencies) => {

    const { TokenService } = dependencies;

    const authenticateToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) { 
            return res.sendStatus(401)
        }

        TokenService.authenticateToken(token)
        .then((user) => {
            req.user = user;
            next();        
        })
        .catch(err => res.sendStatus(403));
    };

    return {
        authenticateToken
    };
}