const Ticket = require('./Ticket');

module.exports = class Attraction {
    constructor(id, attraction_id, name, location, available, tickets) {
        this.id = id;
        this.attraction_id = attraction_id;
        this.name = name;
        this.location = location;
        this.available = available;

        this.tickets = [];
        for(let i=0; i < tickets.length; i++) {
            this.tickets.push(new Ticket(tickets[i].name, tickets[i].guestType, tickets[i].price));
        }
    }
};