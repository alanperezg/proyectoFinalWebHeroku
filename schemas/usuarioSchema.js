const { mongoose } = require('../dbConnection/mongoConnection');
const usuarioSchema = new mongoose.Schema({
    usuario: String,
    password: String
});
const usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = { usuario };