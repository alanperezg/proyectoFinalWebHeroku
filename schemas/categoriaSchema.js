const { mongoose } = require('../dbConnection/mongoConnection');
const categoriaSchema = new mongoose.Schema({
    nombre: String
});
const categoria = mongoose.model('Categoria', categoriaSchema);
module.exports = { categoria };