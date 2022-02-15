/**
    Middleware to check user role
    Used for endpoints for higher level users - if not a higher level user - forbid
    Used after checkAuthToken
*/

const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.TOKEN_SECRET;

//Function responsible for authorising endpoints for admin or super users
const authorise = (req, res, next) => {
    //if general staff user - fobidden
    if (req.user.role === "staff") {
        console.log("Forbidden")
        res.status(403).send({ error: "Forbidden" });
    }
    else next()
}

module.exports = authorise;