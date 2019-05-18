const { mesero } = require('../schemas/meseroSchema');

const meseroController = class{
    static get = (req, res) => {
        let params = req.query;
        let filter = {};
        let result = [];
        if(params.disponible != undefined){
            if(params.disponible == "true"){
                filter.disponible=true;
            }
            if(params.disponible == "false"){
                filter.disponible=false;
            }
        }
        mesero.find(filter, (err, meseros) => {
            meseros.forEach((mesero) => {
                let row = {id: mesero._id, nombre: mesero.nombre, disponible: mesero.disponible};
                result.push(row);
            });
            return res.json(result);
        });
    }
}
module.exports = { meseroController };