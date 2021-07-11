const mongoose = require('mongoose');
const DBService = require('../../application/contracts/DBService');
const SampleRepository = require('./MongoSampleRepository');
const AttractionRepository = require('./MongoAttractionRepository');

module.exports = class MongoService extends DBService {
    constructor() {
        super();
        this.sampleRepository = new SampleRepository();
        this.attractionRepository = new AttractionRepository();
    }

    async initDatabase() {
        const dbName = "sentosa_db";
        let url = `mongodb://${process.env.MONGO_HOSTNAME}:27017/${dbName}`; //mongoserver is service name of mongo in dockers
        
        if (process.env.ENVIRONMENT && process.env.ENVIRONMENT === "production") {
            url = `mongodb+srv://user:pb6dbaV24MvFLWiy@${process.env.MONGO_HOSTNAME}/${dbName}?retryWrites=true&w=majority`;
        }
        
        return setTimeout(() => {
            return mongoose.connect(url, { useNewUrlParser: true })
                .then(async () => {
                console.log("Mongo Database created!");

                await this.attractionRepository.deleteAll();

                //const tickets = [{guestType: 'local', price: 1.01}, {guestType: 'foreign trash', price: 100.10}];
                await this.attractionRepository.add('A0001', 'Butterfly Park & Insect Kingdom', 'Imbiah Station', 'Daily', [
                    { name: 'Adm + Bird Feeding', guestType: 'local', price: 22 }, 
                    { name: 'Adm + Bird Feeding', guestType: 'foreign', price: 18 },
                    { name: '4x Adm + Bird Feeding', guestType: 'local', price: 102 },
                    { name: '4x Adm + Bird Feeding', guestType: 'foreign', price: 88 }
                    ]);
                await this.attractionRepository.add('A0002', 'Palawan Beach', 'Palawan Beach', 'Daily', [
                    { name: 'Free', guestType: 'all', price: 0 }, 
                ]);
                await this.attractionRepository.add('A0003', 'iFly Singapore', 'Beach Station', 'Daily', [
                    { name: 'Challenge Package 2 Skydive', guestType: 'local', price: 89 }, 
                    { name: 'Challenge Package 2 Skydive', guestType: 'foreign', price: 119 },
                    ]);
                await this.attractionRepository.add('A0004', '• Madame Tussauds Singapore', 'Imbiah Station', 'Daily', [
                    { name: 'Adm + Boat Ride + Marvel + Films', guestType: 'child', price: 18 }, 
                    { name: 'Adm + Boat Ride + Marvel + Films', guestType: 'adult', price: 30 },
                    ]);
                await this.attractionRepository.add('A0005', 'Nestopia', 'Siloso Point', 'Daily', [
                    { name: '1 hour play', guestType: 'all', price: 10 }, 
                    ]);
                await this.attractionRepository.add('A0006', 'Trick Eye Museum Singapore', 'Resorts World Station', 'Daily', [
                    { name: 'Adm Child', guestType: 'child', price: 15 }, 
                    { name: 'Adm Adult', guestType: 'adult', price: 20 },
                    ]);
                await this.attractionRepository.add('A0007', 'Adventure Cover Waterpark', 'Resorts World Station', 'Closed', [
                    { name: 'Adm Child', guestType: 'child', price: 30 }, 
                    { name: 'Adm Adult', guestType: 'adult', price: 38 },
                    ]);
                await this.attractionRepository.add('A0008', 'Wings of Time', 'Beach Station', 'Weekend', [
                    { name: 'Adm Premium Seat', guestType: 'local', price: 19 }, 
                    { name: 'Adm Premium Seat', guestType: 'foreign', price: 23 },
                    { name: 'Adm Standard Seat', guestType: 'local', price: 15 }, 
                    { name: 'Adm Standard Seat', guestType: 'foreign', price: 18 },
                    ]);

                //await this.attractionRepository.getAll().then(data => console.log('result', data));
                //await this.attractionRepository.getByPriceRange(0, 0).then(data => console.log('result', data[0].tickets));

            })
            .catch(error => {
                throw error;
            });
        }, 2000); //delay 10 seconds to let mongo server to get ready

        //console.log("Mongo Database created!");
    }
};