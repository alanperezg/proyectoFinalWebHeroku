const { cliente } = require('../schemas/clienteSchema');

const clienteController = class{
    static get = (req, res) => {
        let result =  [];
        let filter = {}
        cliente.find(filter, (err, clientes) => {
            clientes.forEach((cliente) => {
                let row = {id: cliente._id, nombre: cliente.nombre, colonia: cliente.colonia, direccion: cliente.direccion,
                cp: cliente.cp, telefono: cliente};
                result.push(row);
            });
            return res.json(result);
        });
    }
}
module.exports = { clienteController };