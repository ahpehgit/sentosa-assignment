const mongoose = require('mongoose');
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
        price: mongoose.Decimal128 
    }]
});

const Model = mongoose.model('Attraction', AttractionSchema);

module.exports = class MongoAttractionRepository extends AttractionRepository {
	async add(attraction_id, name, location, available, tickets) {

        const AttractionModel = new Model({attraction_id, name, location, available, tickets});

        return await AttractionModel.save()
        .then((d) => {
            console.log(`Attraction ${d.name} with id: ${d.attraction_id} inserted`); 

            if (d.tickets && d.tickets[0] !== 'undefined') {
                console.log('Tickets', d.tickets);
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
            'tickets.price': { $gte: min, $lte: max },
        };

        const data = await Model.find(filter);

        return data.map((d) => {
            const tickets = d.tickets.filter(ticket => ticket.price >= min && ticket.price <= max);
            if (tickets.length > 0)
                return new Attraction(d._id, d.attraction_id, d.name, d.location, d.available, tickets);
            else 
                null;
        }).filter(d => d != null);
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