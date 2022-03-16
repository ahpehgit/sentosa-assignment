const Login = require('../application/use_cases/Login');

module.exports = (dependencies) => {

    const { TokenService } = dependencies;
    const { authorisedUserRepository } = dependencies.DBService;

    const login = (req, res, next) => {
        //localhost:3000/login/

        const query = Login(TokenService, authorisedUserRepository);
        let name = null, password = null;

        if (req.body.name) name = req.body.name;
        if (req.body.password) password = req.body.password;

        query.Execute(name, password).then((data) => {
            if (data) {
                res.json(data);
            }
            else {
                res.sendStatus(401);
            }
        }, (err) => {
            next(err);
        });
    };

    return {
        login
    };
}
