const Ticket = require('./Ticket');

class PurchaseTicket {
    constructor(attraction_id, quantity, ticket) {
        this.attraction_id;
        this.quantity = quantity;
        this.ticket = new Ticket(ticket.name, ticket.guestType, ticket.price);
    }
}

module.exports = class Purchase {
    constructor(id, ticket_number, payment_mode, name, email, mobile, promo_code, subtotal, paid, purchaseTickets) {
        this.id = id;
        this.ticket_number = ticket_number;
        this.payment_mode = payment_mode;
        this.name = name;
        this.mobile = mobile;
        this.email = email;
        this.promo_code = promo_code;
        this.subtotal = subtotal;
        this.paid = paid;

        this.purchaseTickets = [];
        for(let i=0; i < purchaseTickets.length; i++) {
            this.purchaseTickets.push(new PurchaseTicket(purchaseTickets[i].attraction_id, purchaseTickets[i].quantity, purchaseTickets[i].ticket));
        }
    }
};