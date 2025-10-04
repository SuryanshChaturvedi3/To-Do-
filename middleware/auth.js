const {verifyToken} = require("../services/authentication");

function verifyTokenForCookie(cookieName){
    return function(req, res, next){
        const tokenCookieValue = req.cookies[cookieName];

        if(!req.cookies || !tokenCookieValue){
            req.user = null;
            res.locals.user = null;
            return next();
        }

        try {
            const payload = verifyToken(tokenCookieValue); // ✅ Token verify
            req.user = payload;        // ✅ Backend me user info
            res.locals.user =  req.user; // ✅ EJS me user info
        } catch (error) {
            console.error("Invalid token:", error.message);
            res.clearCookie(cookieName);
        }

        return next();
    }
}

module.exports = {
    verifyTokenForCookie,
    verifyToken
};
