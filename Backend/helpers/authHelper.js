const { JWT_SECRET } = require("../key");
const { JWT_SECRET2 } = require("../key");
const JWT = require("jsonwebtoken");
var jwt_Decode = require("jwt-decode");

const authHelper = {
    async createToken(user) {
        return JWT.sign({
            iss : "gymproject",
            sub : {
                i : user._id
            },
            iat : new Date().getTime(),
            exp : new Date().setTime(new Date().getTime() + 1),
        },JWT_SECRET);
    },

    async decodeToken(headers){
        
        const token = headers["authorization"];

        if(token==null){
            return "";
        }
        
        var decoded = jwt_Decode(token);
        // verify token pending
        var _id = decoded.sub.i;
        return _id;
    },

    
}

module.exports = authHelper;