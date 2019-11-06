//Set up mongoose connection
console.log('in db config');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Santa:christmas@santacluster-membv.mongodb.net/test?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

module.exports = mongoose;