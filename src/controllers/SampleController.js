const Sample = require('../application/use_cases/Sample');

module.exports = (dependencies) => {

    const { sampleRepository } = dependencies.DBService;
    
    const sampleRoute = (req, res, next) => {
        //localhost:3000/sample

        const query = Sample(sampleRepository);

        query.Execute().then((data) => {
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
        sampleRoute
    };
}