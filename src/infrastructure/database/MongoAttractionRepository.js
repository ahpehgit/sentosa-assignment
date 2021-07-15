const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 2);
const AttractionRepository = require('../../application/contracts/AttractionRepository');
const Attraction = require('../../entities/Attraction');

const AttractionSchema = new mongoose.Schema({
    attraction_id: String,
    name: String,
    location: String,
    available: String,
    tickets: [{
        name: String,
        guestType: String,
        price: Float
    }]
});

const Model = mongoose.model('Attraction', AttractionSchema);

module.exports = class MongoAttractionRepository extends AttractionRepository {
	async add(attraction_id, name, location, available, tickets) {

        //const tickets = [{guestType: 'local', price: 1.01}, {guestType: 'foreign trash', price: 100.10}];

        const Attaction = new Model({attraction_id, name, location, available, tickets});

        await Attaction.save()
        .then((d) => {
            console.log(`Attraction ${d.name} with id: ${d.attraction_id} inserted`); 

            if (d.tickets && d.tickets[0] !== 'undefined') {
                console.log(d.tickets);
            }

            return new Attraction(d._id, d.attraction_id, d.name, d.location, d.available, d.tickets);
        })
        .catch(err => {
            throw err;
        });
    }

    async getAll() {
        const data = await Model.find({});

        return data.map((d) => {
            return new Attraction(d._id, d.attraction_id, d.name, d.location, d.available, d.tickets);
        });
    }

    async getByAttractionId(attraction_id) {
        const filter = {
            'attraction_id': { $eq: attraction_id }
        };

        const d = await Model.findOne(filter);

        return d ? new Attraction(d._id, d.attraction_id, d.name, d.location, d.available, d.tickets) : null;
    }

    async getByLocations(locations) {
        const filter = {
            'location': { $in: locations }
        };

        const data = await Model.find(filter);

        return data.map((d) => {
            return new Attraction(d._id, d.attraction_id, d.name, d.location, d.available, d.tickets);
        });
    }

    async getByPriceRange(min, max) {
        const filter = {
            'tickets.price': { $gte: min, $lte: max }
        };

        const data = await Model.find(filter);

        return data.map((d) => {
            return new Attraction(d._id, d.attraction_id, d.name, d.location, d.available, d.tickets);
        });
    }

    async deleteAll() {
        return await Model.deleteMany({})
            .then(() => {
                console.log('Attractions all deleted');
            })
            .catch(err => {
                throw err;
            });
    }
}