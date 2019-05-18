const jwt = require('jsonwebtoken');

const authMWController = class{
   static authenticate = (req, res, next) => {
    let token = req.header('X-Token');
    if(token != undefined){
        try {
            jwt.verify(token, 'Deyou-token-sign');
            next();
          } catch(err) {
            return res.status(401).json({Authorized:false});
          }
    }else{
        return res.status(401).json({Authorized:false});
    }
   }
}
module.exports = { authMWController };