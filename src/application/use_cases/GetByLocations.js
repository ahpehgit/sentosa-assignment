const Response = require('../../entities/Response');

module.exports = (AttractionRepository) => {

	const Execute = async (locations) => {
		const result = await AttractionRepository.getByLocations(locations);

		return result.length > 0 ? Promise.resolve(new Response(result, true, 'Result retrieved')) : Promise.resolve(new Response(null, false, 'No data found')); 
	}

	return {
        Execute
    };
}