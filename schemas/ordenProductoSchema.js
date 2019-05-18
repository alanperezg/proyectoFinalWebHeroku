const { mongoose } = require('../dbConnection/mongoConnection');
const ordenProductoSchema = new mongoose.Schema({
    orden: {type: mongoose.Schema.Types.ObjectId, ref: 'Orden'},
    producto: {type: mongoose.Schema.Types.ObjectId, ref: 'Producto'},
    cantidad: Number,
    precio: Number
});
const ordenProducto = mongoose.model('OrdenProducto', ordenProductoSchema);
module.exports = { ordenProducto };