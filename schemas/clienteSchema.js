const { mongoose } = require('../dbConnection/mongoConnection');
const clienteSchema = new mongoose.Schema({
    nombre: String,
    colonia: String,
    direccion: String,
    cp: String,
    telefono: String
});
const cliente = mongoose.model('Cliente', clienteSchema);
module.exports = { cliente };