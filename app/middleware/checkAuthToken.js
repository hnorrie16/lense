/**
 * Middleware for verifying tokens sent along with each request
 * Incorporated in every request - intercepts the request
*/

const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.TOKEN_SECRET;

//Function responsible for verifying tokens
//Gets included in every endpoint to verify the tokens sent in the request
const checkAuthToken = (req, res, next) => {
    const token = req.query.auth;
    
    if (token) { 
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                alert("error verifying token")
                console.log(err)
                res.status(401).send({ error: "Unauthorised" });
            }
            //once verified, attach user object into request and continue processing endpoint
            else {
                req.user = user;
                next();
            }
        })
    } else {
        console.log("no token being sent")
        res.status(401).send({ error: "Not Authenticated!" });
    }
}

module.exports = checkAuthToken;