const { ordenProducto } = require('../schemas/ordenProductoSchema');

const ordenProductoController = class{
    static get = (req, res) => {
        let ordenId = req.params.id;
        let filter = {orden:ordenId};
        let result = [];
        ordenProducto.find(filter).populate('producto').exec((err, ordenProductos) => {
            ordenProductos.forEach((ordenProducto) => {
                let row = {id: ordenProducto._id, ordenId:ordenProducto.orden, productoId:ordenProducto.producto._id, nombre:ordenProducto.producto.nombre, 
                    cantidad:ordenProducto.cantidad, precio:ordenProducto.precio};
                result.push(row);
            });
            return res.json(result);
        });
    }
    static post = (req, res) => {
        let body = req.body;
        let create = {};
        if(body.orden != undefined && body.producto != undefined, body.cantidad != undefined && body.precio != undefined){
            create.orden = body.orden;
            create.producto = body.producto;
            create.cantidad = body.cantidad;
            create.precio = body.precio;
            ordenProducto.create(create);
            return res.status(201).json({created:true});
        }else{
            return res.status(400).json({created:false});
        }
    }
    static delete = (req, res) => {
        let id = req.params.id;
        console.log(id);
        ordenProducto.findByIdAndDelete(id, (err, ordenProductos) => {
            res.json({deleted: true});
        })
    }
    static patch = (req, res) => {
        let body = req.body;
        let id = req.params.id;
        let update = {};
        console.log(body);
        if(body.cantidad != undefined){
            if((!isNaN(body.cantidad))){
                update.cantidad = body.cantidad;
            }else{
                return res.status(400).json({created:false});
            }
        }
        ordenProducto.findByIdAndUpdate(id,{$set:update}, () => {
            return res.json({updated:true});
        });
    }
}
module.exports = { ordenProductoController };