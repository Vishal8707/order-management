const jwt = require("jsonwebtoken")


const isAuthenticated = async function ( req , res , next ) {
    try{
        let token = req.headers["x-api-key"]
        if(!token){
            return res.status(400).send({ status : false , message : "Token must be present."})
        }
   
        jwt.verify( token , "group-13-project" , function ( error , decodedToken ) {
            if ( error) {
                if ( error.name === "JsonWebTokenError" ) {
                    return res.status(401).send({ status : false , message : "Invalid token."})
                }
                else {
                    return res.status(401).send({ status : false , message : error.message})
                }
            }else{
                req.token = decodedToken
                next()
            }
        })

    }catch( error ){
        return res.status(500).send({ status : false , message : error.message})
    }
}

module.exports = {isAuthenticated}