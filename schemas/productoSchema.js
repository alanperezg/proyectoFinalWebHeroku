const { mongoose } = require('../dbConnection/mongoConnection');
const productoSchema = new mongoose.Schema({
    categoria: {type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'},
    nombre: String,
    precio: Number
});
const producto = mongoose.model('Producto', productoSchema);
module.exports = { producto };