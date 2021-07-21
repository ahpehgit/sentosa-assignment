const GetByLocations = require('../application/use_cases/GetByLocations');
const GetByAttractionId = require('../application/use_cases/GetByAttractionId');
const GetByPriceRange = require('../application/use_cases/GetByPriceRange');

module.exports = (dependencies) => {

    const { attractionRepository } = dependencies.DBService;
    
    const getByAttractionIdRoute = (req, res, next) => {
        //localhost:3000/attraction/getByAttractionId/:attractionId

        const query = GetByAttractionId(attractionRepository);

        query.Execute(req.params.attractionId).then((data) => {
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

    const getByLocationsRoute = (req, res, next) => {
        //localhost:3000/attraction/getByLocations/:locations
        
        try {
            const query = GetByLocations(attractionRepository);
            const locations = JSON.parse(req.params.locations);
            query.Execute(locations).then((data) => {
                if (data) {
                    res.json(data);
                }
                else {
                    res.sendStatus(401);
                }
            }, (err) => {
                next(err);
            });    
        }
        catch(err) {
            res.status(400).send(err);
        }
    };

    const getByPriceRangeRoute = (req, res, next) => {
        //localhost:3000/attraction/getByPriceRange/?min=value&max=value

        const query = GetByPriceRange(attractionRepository);

        const min = req.query.min;
        const max = req.query.max;

        query.Execute(min, max).then((data) => {
            if (data) {
                res.json(data);
            }
            else {
                res.sendStatus(401);
            }
        }, (err) => {
            next(err);
        });
    }

    return {
        getByAttractionIdRoute,
        getByLocationsRoute,
        getByPriceRangeRoute,
    };
}