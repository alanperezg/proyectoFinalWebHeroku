const { categoria } = require('../schemas/categoriaSchema');

const categoriaController = class{
    static get = (req, res) => {
        let filter = {};
        let result =  [];
        categoria.find(filter, (err, categorias) => {
            categorias.forEach((categoria) => {
                let row = {id: categoria._id, nombre: categoria.nombre};
                result.push(row);
            });
            return res.json(result);
        });
    }
}
module.exports = { categoriaController };