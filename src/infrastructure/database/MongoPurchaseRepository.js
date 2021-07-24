const mongoose = require('mongoose');
const MUUID = require('uuid-mongodb');
const Float = require('mongoose-float').loadType(mongoose, 2);
const PurchaseRepository = require('../../application/contracts/PurchaseRepository');
const Purchase = require('../../entities/Purchase');
const DateJS = require('../../utility/Date');

const PurchaseSchema = new mongoose.Schema({
    ticket_number: String,
    payment_mode: String,
    name: String,
    mobile: String,
    email: String,
    promo_code: String,
    subtotal: Float,
    paid: Float,
    purchaseTickets: [{
    	attraction_id: String,
    	quantity: Number,
    	ticket: {
	        name: String,
	        guestType: String,
	        price: Float
	    }
    }]
});

const Model = mongoose.model('Purchase', PurchaseSchema);

module.exports = class MongoPurchaseRepository extends PurchaseRepository {

	async create(payment_mode, name, email, mobile, promo_code, subtotal, paid, purchaseTickets) {
		const dd = new DateJS();
		const mUUID1 = MUUID.v1();

		const ticket_number = dd.yyyymmdd() + '-' + mUUID1.toString('N');
		const PurchaseModel = new Model({ticket_number, payment_mode, name, email, mobile, promo_code, subtotal, paid, purchaseTickets});

        await PurchaseModel.save()
        .then((d) => {
            console.log(`Purchase for ${d.name} with ticket number: ${d.ticket_number} inserted`); 

            console.log('Info', d);
            if (d.purchaseTickets && d.purchaseTickets[0] !== 'undefined') {
                console.log(d.purchaseTickets);
            }

            return new Purchase(d._id, d.ticket_number, d.payment_mode, d.name, d.email, d.mobile, d.promo_code, d.subtotal, d.paid, d.purchaseTickets);
        })
        .catch(err => {
            throw err;
        });
    }

    async getAll() {
        const data = await Model.find({});

        return data.map((d) => {
            return new Purchase(d._id, d.ticket_number, d.payment_mode, d.name, d.email, d.mobile, d.promo_code, d.subtotal, d.paid, d.purchaseTickets);
        });
    }

    async getByTicketNumber(ticket_number) {        
        const filter = {
            'ticket_number': { $eq: ticket_number }
        };

        const d = await Model.findOne(filter);

        return d ? new Purchase(d._id, d.ticket_number, d.payment_mode, d.name, d.email, d.mobile, d.promo_code, d.subtotal, d.paid, d.purchaseTickets) : null;
    }

    async deleteAll() {
       return await Model.deleteMany({})
            .then(() => {
                console.log('Purchases all deleted');
            })
            .catch(err => {
                throw err;
            });
    }
};