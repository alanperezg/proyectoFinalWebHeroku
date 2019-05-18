const { producto } = require('../schemas/productoSchema');
const productoController = class{
    static get = (req, res) => {
        let filter = {};
        let result =  [];
        producto.find(filter, (err, productos) => {
            productos.forEach((producto) => {
                let row = {id: producto._id, categoriaId: producto.categoriaId, nombre: producto.nombre, precio: producto.precio};
                result.push(row);
            });
            return res.json(result);
        });
    }
}
module.exports = { productoController };