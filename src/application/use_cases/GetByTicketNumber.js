const Response = require('../../entities/Response');

module.exports = (PurchaseRepository) => {

	const Execute = async (ticket_number) => {
		const result = await PurchaseRepository.getByTicketNumber(ticket_number);

		return result !== null ? new Response(result, true, 'Result retrieved') : new Response(null, false, 'No data found'); 
	}

	return {
        Execute
    };
}