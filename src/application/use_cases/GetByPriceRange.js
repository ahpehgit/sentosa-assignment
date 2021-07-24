const Response = require('../../entities/Response');

module.exports = (AttractionRepository) => {

	const Execute = async (min, max) => {
		const result = await AttractionRepository.getByPriceRange(min, max);

		return result.length > 0 ? new Response(result, true, 'Result retrieved') : new Response(null, false, 'No data found'); 
	}

	return {
        Execute
    };
}