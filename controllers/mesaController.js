const { mesa } = require('../schemas/mesaSchema');

const mesaController = class{
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
    mesa.find(filter, (err, mesas) => {
        mesas.forEach((mesa) => {
            let row = {id:mesa._id, nombre:mesa.nombre, disponible:mesa.disponible}
            result.push(row);
        });
        return res.json(result);
    });
   }
}
module.exports = { mesaController };