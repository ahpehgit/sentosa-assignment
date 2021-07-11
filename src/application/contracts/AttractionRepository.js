module.exports = class AttractionRepository {
    constructor() { }

    add(attraction_id, name, location, available) {
        return Promise.reject(new Error('Method not implemented'));
    }

    getAll() {
        return Promise.reject(new Error('Method not implemented'));
    }

    getByAttractionId(attraction_id) {
        return Promise.reject(new Error('Method not implemented'));
    }

    getByLocations(locations) {
        return Promise.reject(new Error('Method not implemented'));
    }

    getByPriceRange(min, max) {
        return Promise.reject(new Error('Method not implemented'));
    }
    
    deleteAll() {
       return Promise.reject(new Error('Method not implemented'));
    }
}