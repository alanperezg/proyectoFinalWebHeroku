var mongoose = require('mongoose');
var mongoDB = "mongodb+srv://alan:alan@cluster0-tse1d.mongodb.net/test?retryWrites=true";
mongoose.connect(mongoDB, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = { mongoose };