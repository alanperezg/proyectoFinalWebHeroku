const { usuario } = require('../schemas/usuarioSchema');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const usuarioController = class{
   static login = (req, res) => {
    let user = req.body.usuario;
    let password = req.body.password;
    let filter = {};
    if(user!= undefined && password!=undefined){
        let passwordHash = crypto.createHash('md5').update(password).digest('hex');
        filter.usuario = user;
        filter.password = passwordHash;
        usuario.find(filter, (err, usuarios) => {
            if(usuarios.length > 0){
                let signedToken = jwt.sign({usuarioId: usuarios[0]._id}, 'Deyou-token-sign');
                res.cookie('token', signedToken,{ maxAge: 600000, httpOnly: true })
                res.json({token:signedToken});
            }else{
                return res.status(401).json({authorized:false});
            }
        });
    }else{
        return res.status(400).json({badRequest:true});
    }
   }
   static logout = (req, res) => {
    res.cookie('token', '',{ maxAge: -10000, httpOnly: true });
    res.json();
   }
}
module.exports = { usuarioController };