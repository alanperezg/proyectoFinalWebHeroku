const { mongoose } = require('../dbConnection/mongoConnection');
const ordenSchema = new mongoose.Schema({
    mesa: {type: mongoose.Schema.Types.ObjectId, ref: 'Mesa', required: false},
    mesero: {type: mongoose.Schema.Types.ObjectId, ref: 'Mesero', required: false},
    cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' , required: false},
    fechaRegistro: Date,
    tipo: Number,
    estado: Number, 
    total: Number
},{ toJSON: { virtuals: true }, toObject: { virtuals: true }});
const orden = mongoose.model('Orden', ordenSchema);
module.exports = { orden };
