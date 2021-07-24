const Response = require('../../entities/Response');

module.exports = (PurchaseRepository) => {

	const Execute = async (payment_mode, name, email, mobile, promo_code, subtotal, paid, purchaseTickets) => {
		const result = await PurchaseRepository.create(payment_mode, name, email, mobile, promo_code, subtotal, paid, purchaseTickets);

		return result !== null ? new Response(result, true, 'Result retrieved') : new Response(null, false, 'No data found'); 
	}

	return {
        Execute
    };
}