const GetByTicketNumber = require('../application/use_cases/GetByTicketNumber');
const CreatePurchase = require('../application/use_cases/CreatePurchase');

module.exports = (dependencies) => {

	const { purchaseRepository } = dependencies.DBService;

	const getByTickerNumberRoute = (req, res, next) => {
        //localhost:3000/purchase/getByTickerNumber/:tickerNumber

        const query = GetByTicketNumber(purchaseRepository);

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

    const createPurchaseRoute = (req, res, next) => {
        //localhost:3000/purchase/createPurchase/

        const query = CreatePurchase(purchaseRepository);

        const payment_mode = req.body.payment_mode;
        const name = req.body.name;
        const email = req.body.email;
        const mobile = req.body.mobile;
        const promo_code = req.body.promo_code;
        const subtotal = req.body.subtotal;
        const paid =  req.body.paid;
        const purchaseTickets = req.body.purchaseTickets;
        const ticket_num = req.body.ticket_num;

        query.Execute(payment_mode, name, email, mobile, promo_code, subtotal, paid, purchaseTickets, ticket_num).then((data) => {
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
		getByTickerNumberRoute,
        createPurchaseRoute,
	};
}