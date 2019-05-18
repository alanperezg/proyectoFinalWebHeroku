const { orden } = require('../schemas/ordenSchema');
const { mesa } = require('../schemas/mesaSchema');
const { mesero } = require('../schemas/meseroSchema');
const ordenController = class{
    static get = (req, res) => {
        let params = req.query;
        let filter = {};
        let result = [];
        if(params.abierta != undefined){
            if(params.abierta == "true"){
                filter.estado = {$ne: 0}
            }
            if(params.abierta == "false"){
                filter.estado = 0;
            }
        }
        if(params.tipo != undefined){
            filter.tipo = params.tipo;
        }
        orden.find(filter).populate('mesa').populate('mesero').populate('cliente').exec((err, ordenes) => {
            ordenes.forEach((orden) => {
                if(orden.cliente == null){
                    let row = {id: orden._id, mesaId:orden.mesa._id, mesa:orden.mesa.nombre, meseroId:orden.mesero._id, 
                        mesero:orden.mesero.nombre, clienteId:null, cliente:"", colonia:"",
                        direccion: "", cp: "", telefono: "", 
                        fechaRegistro:orden.fechaRegistro, tipo:orden.tipo, estado:orden.estado, total:orden.total};
                    result.push(row);
                }else{
                    let row = {id: orden._id, mesaId:orden.mesa._id, mesa:orden.mesa.nombre, meseroId:orden.mesero._id, 
                        mesero:orden.mesero.nombre, clienteId:orden.cliente._id, cliente:orden.cliente.nombre, colonia:orden.cliente.colonia,
                        direccion: orden.cliente.direccion, cp: orden.cliente.cp, telefono: orden.cliente.telefono, 
                        fechaRegistro:orden.fechaRegistro, tipo:orden.tipo, estado:orden.estado, total:orden.total};
                    result.push(row);
                }
            });
            return res.json(result);
        });
    }
    static getOne = (req, res) => {
        let params = req.query;
        let id = req.params.id;
        let filter = {};
        let result = null;
        filter._id = id;
        if(params.abierta != undefined){
            if(params.abierta == "true"){
                filter.estado = {$ne: 0}
            }
            if(params.abierta == "false"){
                filter.estado = 0;
            }
        }
        if(params.tipo != undefined){
            filter.tipo = params.tipo;
        }
        orden.find(filter).populate('mesa').populate('mesero').populate('cliente').exec((err, ordenes) => {
            ordenes.forEach((orden) => {
                if(orden.cliente == null){
                    let row = {id: orden._id, mesaId:orden.mesa._id, mesa:orden.mesa.nombre, meseroId:orden.mesero._id, 
                        mesero:orden.mesero.nombre, clienteId:null, cliente:"", colonia:"",
                        direccion: "", cp: "", telefono: "", 
                        fechaRegistro:orden.fechaRegistro, tipo:orden.tipo, estado:orden.estado, total:orden.total};
                    result = row;
                }else{
                    let row = {id: orden._id, mesaId:orden.mesa._id, mesa:orden.mesa.nombre, meseroId:orden.mesero._id, 
                        mesero:orden.mesero.nombre, clienteId:orden.cliente._id, cliente:orden.cliente.nombre, colonia:orden.cliente.colonia,
                        direccion: orden.cliente.direccion, cp: orden.cliente.cp, telefono: orden.cliente.telefono, 
                        fechaRegistro:orden.fechaRegistro, tipo:orden.tipo, estado:orden.estado, total:orden.total};
                    result = row;
                }
            });
            return res.json(result);
        });
    }
    static patch = (req, res) => {
        let body = req.body;
        let id = req.params.id;
        let update = {};
        if(body.estado != undefined){
            if((!isNaN(body.estado)) && body.estado < 3){
                update.estado = body.estado;
            }
        }
        orden.findByIdAndUpdate(id,{$set:update}, () => {
            return res.json({updated:true});
        });
    }
    static abrirOrden = (req, res) => {
        let body = req.body;
        let create = {};
        if(body.mesaId != undefined && body.meseroId != undefined && body.clienteId != undefined && 
            body.tipo != undefined && body.estado != undefined && body.total != undefined){
            let fecha = new Date();
            let mesaFilter = {};
            let mesaUpdate = {};
            if(body.mesaId != ""){
                create.mesa = body.mesaId;
            }
            if(body.meseroId != ""){
                create.mesero = body.meseroId;
            }
            if(body.clienteId != ""){
                create.cliente = body.clienteId;
            }
            create.fechaRegistro = fecha;
            create.tipo = body.tipo;
            create.estado = body.estado;
            create.total = body.total;
            orden.create(create);
            mesaFilter._id = body.mesaId;
            mesaUpdate.disponible = false;
            mesa.findByIdAndUpdate(mesaFilter, mesaUpdate).exec();
            return res.status(201).json({created:true});
        }
        return res.status(400).json({created:false});
    }
    static cerrarOrden = (req, res) => {
        let id = req.params.id;
        let ordenFilter = {};
        let mesaFilter = {};
        let ordenUpdate = {};
        let mesaUpdate = {};
        ordenFilter._id = id;
        ordenUpdate.estado = 0;
        orden.findOneAndUpdate(ordenFilter, ordenUpdate).exec();
        orden.findById(id, (err, orden) => {
            let mesaId = orden.mesa;
            mesaFilter._id = mesaId;
            mesaUpdate.disponible = true;
            mesa.findOneAndUpdate(mesaFilter, mesaUpdate).exec();
            res.status(200).json({updated: true});
        });

    }
}
module.exports = {ordenController};