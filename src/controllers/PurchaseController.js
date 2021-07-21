const GetByTicketNumber = require('../application/use_cases/GetByTicketNumber');

module.exports = (dependencies) => {

	const { purchaseRepository } = dependencies.DBService;

	const getByTickerNumberRoute = (req, res, next) => {
        //localhost:3000/purchase/getByTickerNumber/:tickerNumber

        const query = GetByTicketNumber(attractionRepository);

        query.Execute(req.params.tickerNumber).then((data) => {
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
		getByTickerNumberRoute
	};
}