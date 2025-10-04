const JWT = require ("jsonwebtoken");

const secret = "surya@123";

function createTokenForUser(user){
    const payload ={
        id : user._id,
        email : user.email ,
        role : user.role,
         fullname: user.fullname,
    }   
    const token = JWT.sign(payload,secret);
        console.log("token generated: "+  token);

    return token;
    
}

function verifyToken(token){
   const  payload = JWT.verify(token,secret)
   return payload;
}

module.exports=({
    createTokenForUser,
     verifyToken,
})