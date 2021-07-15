const Response = require('../../entities/Response');

module.exports = (AttractionRepository) => {

	const Execute = async (id) => {
		const result = AttractionRepository.getByAttractionId(id);

		return result !== null ? new Response(result, true, 'Result retrieved') : new Response(null, false, 'No data found'); 
	}

	return {
        Execute
    };
}