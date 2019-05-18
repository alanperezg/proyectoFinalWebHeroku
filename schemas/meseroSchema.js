const { mongoose } = require('../dbConnection/mongoConnection');
const meseroSchema = new mongoose.Schema({
    nombre: String,
    disponible: Boolean
});
const mesero = mongoose.model('Mesero', meseroSchema);
module.exports = { mesero };