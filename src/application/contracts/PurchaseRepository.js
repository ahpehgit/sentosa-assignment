module.exports = class PurchaseRepository {
    constructor() { }

    create(payment_mode, name, email, mobile, promo_code, subtotal, paid, purchaseTickets) {
        return Promise.reject(new Error('Method not implemented'));
    }

    getAll() {
        return Promise.reject(new Error('Method not implemented'));
    }

    getByTicketNumber(ticket_number) {
        return Promise.reject(new Error('Method not implemented'));
    }

    deleteAll() {
       return Promise.reject(new Error('Method not implemented'));
    }
}