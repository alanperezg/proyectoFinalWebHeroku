const { mongoose } = require('../dbConnection/mongoConnection');
const mesaSchema = new mongoose.Schema({
    nombre: String,
    disponible: Boolean
});
const mesa = mongoose.model('Mesa', mesaSchema);
module.exports = { mesa };