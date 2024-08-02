var jwt = require('jsonwebtoken');
var jwt_secret= "hellboy"
// middleware fuction to update  and modify requests of frontend
let verify =async(req,res,next)=>{
    let token = req.headers.authorization
    let ans = jwt.verify(token,jwt_secret, (error,decode)=>{
        if(error){
            return res.json ({msg:"unauthorized token "})
        }
        else{
            req.user=decode
            next()
        }
    })

}

module.exports = verify