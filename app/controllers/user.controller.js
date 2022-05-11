const db = require("../models");
const User = db.users;
const Client = db.clients;
const bcrypt = require('bcrypt');
const checkAuthToken = require('../middleware/checkAuthToken');
const jwt = require('jsonwebtoken');
const { checkIfDefined } = require('../shared/validation')


//retrieving the token secrets from environmental variables
const accessTokenSecret = process.env.TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
let refreshTokens = [];

//Endpoint responsible for signing in a staff user
//First locates username from staff table in DB - if exists then bcrypt is used to hash the entered password and compare to the password in the DB
exports.signIn = (req, res) => {
    User.find({ email: req.body.email })
        .then(user => {
            if (user.length > 0) {
                console.log("1")
                console.log(user[0].password)
                console.log("2")
                console.log(req.body.password)
                console.log("3")
                bcrypt.compare(req.body.password, user[0].password).then((result) => { 
                console.log(result)
                console.log("4")
                //compares entered hashed password and the one from the DB
                    if (req.body.password == user[0].password) { //instead of result
                        const accessToken = jwt.sign({ email: user[0].email, role: user[0].role }, accessTokenSecret, { expiresIn: '1800s' });
                        const refreshToken = jwt.sign({ email: user[0].data, role: user[0].role }, refreshTokenSecret);
                        refreshTokens.push(refreshToken);
                        let userData = user[0].toObject();
                        delete userData.password
                        res.json({ status: 200, accessToken: accessToken, refreshToken: refreshToken, userId: user[0].id, role: user[0].role, details: userData, expiresIn: 1700 })
                        localStorage.setItem('current_token', accessToken);
                    }
                    else {
                        res.status(401).send({ error: 'Incorrect credentials' });
                    }
                }).catch(err => {
                    console.log(err)
                    res.status(500).send({ error: 'Internal Server Error' });
                })
            }
            else {
                res.status(401).send({ error: 'User does not exist' });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

//Endpoint responsible for authenticating the magic link based on the access token
exports.magicLink = (req, res) => {
    const token = req.query.auth;
    if (token) {
        //verify access token
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(401).send({ error: "Unauthorised" });
            }
            return res.send({ status: 200, error: null, response: user.email });
        });
    } else {
        res.sendStatus(401).send({ error: "Not Authenticated" });
    }
}


//Endpoint responsible for changing the users password
//Locates user in database based on email and updates the password for that user
exports.changePassword = (req, res) => {
    const { email, password } = req.body; //extracts username and password from the body of request
    const saltRounds = 10
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.log("Cannot generate salt, ", err)
            res.status(500).send({ error: 'Internal Server Error' });
        } else {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    console.log("Cannot generate hash, ", err)
                    res.status(500).send({ error: 'Internal Server Error' });
                } else {
                    User.findOneAndUpdate({ email: email }, { password: hash }, { useFindAndModify: false, new: true })
                        .then(data => {
                            if (!data) {
                                res.status(404).send({
                                    message: `Cannot update User`
                                });
                            } else return res.send({ status: 200, error: null, response: 'Password update successful' });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).send({ error: 'Internal Server Error' });
                        });
                }
            })
        }
    })
}

exports.logout = (req, res) => {
    refreshTokens = [];
    res.json({ "status": 200, "error": null, "response": "Logout successful" })
}

//Endpoint responsbile for token refreshing 
//Generates new access tokens based on refresh token that is sent in request body (if verified)
exports.refreshToken = (req, res) => {
    const { token } = req.body

    if (!token) {
        console.log("no token")
        res.status(401).send({ error: 'Unauthorised' });
    }
    // else if (!refreshTokens.includes(token)) {
    //     console.log("no refresh token")
    //     res.status(401).send({ error: 'Unauthorised' });
    // }

    else {
        //Verifies token
        jwt.verify(token, refreshTokenSecret, (err, user) => {
            if (err) {
                console.log(err)
                res.status(401).send({ error: 'Unauthorised' });
            }
            else {
                const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '1800s' }); //generates access token
                res.json({ status: 200, accessToken: accessToken, expiresIn: 1700 })
            }
        });
    }
}

// Retrieve list of clients assigned to a particular staff member
exports.staffClients = (req, res) => {
    const staffId = req.params.id;

    User.findById(staffId)
        .then(data => {
            if (!data)
                res.status(404).send({ error: "No User found with id " + id });
            else {
                const clientIds = checkIfDefined(data.clients, false) ? Object.keys(data.clients) : []
                Client.find().where('_id').in(clientIds).then((clientList) => {
                    res.send({ status: 200, error: null, response: clientList });
                }).catch(err => {
                    console.log(err)
                    res.status(500).send({ error: 'Internal Server Error' });
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

// ADMIN FUNCTIONS

// Create and Save a new User - admin only
// #####  Implement authorisation!!
exports.register = (req, res) => {
    // Validate request
    console.log("REGISTER USER")
    let email = require('../shared/email'); //retrieves the email file - send email function exists there

    const saltRounds = 10
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.log("Cannot generate salt, ", err)
            res.status(500).send({ error: 'Internal Server Error' });
        } else {
            const temp_password = req.body.fullname + "!?!" + req.body.email;
            bcrypt.hash(temp_password, salt, (err, hash) => {
                if (err) {
                    console.log("Cannot generate hash, ", err)
                    res.status(500).send({ error: 'Internal Server Error' });
                } else {
                    const user = new User({
                        fullname: req.body.fullname,
                        role: req.body.role,
                        email: req.body.email, //Instead of hash
                        password: req.body.password,
                        supplierparent: req.body.supplierparent,
                        supplierchild: req.body.supplierchild
                    });
                    // Save User in the database
                    user
                        .save(user)
                        .then(userData => {
                            //send email to newly registered user prompting to change password
                            userData = userData.toObject();
                            delete userData.password

                            const accessToken = jwt.sign({ email: userData.email, role: userData.role }, accessTokenSecret, { expiresIn: '10000s' }); //generates access token

                            //sends email with magic link to staff member - logic in send email function which exists in shared/email.js file
                            const message = 'Click the link to change your password!\n' + 'http://localhost:3000/registerstaff/changepassword?auth=' + accessToken
                            email.send_email(message, userData.email).then(data => {
                                res.send({ status: 200, error: null, response: userData });
                            }).catch(err => {
                                res.status(500).send({ error: "Error sending email" });
                            })
                        })
                        .catch(err => {
                            // console.log(err)
                            // if (err.name === "ValidationError") {
                            //     const validation = require('../shared/validation')
                            //     res.status(400).send({ error: validation.getErrors(err.errors) });
                            // }
                            // else if (err.code === 11000 || err.code === 11001) {
                            //     res.status(400).send({ error: "ER_DUP_ENTRY" });
                            // }
                            // else res.status(500).send({ error: err });
                        });
                }
            })
        }
    })
};

// Retrieve all staff users from database
exports.findAll = (req, res) => {
    let filter = req.query.filter
    //for pagination
    const page = +req.query.page
    const limit = +req.query.limit
    const lowerRange = ((page - 1) * limit)

    let countUsers = new Promise((resolve, reject) => {
        User.count({  }).then(data => { resolve(data) }).catch(err => { reject(err) });
    })

    let getUsers = new Promise((resolve, reject) => {
        
        User.find({ }, { createdAt: 0, updatedAt: 0 }).skip(lowerRange).limit(limit)
            .then(data => {
                console.log(data)
                console.log('Heeeere')
                resolve(data)
            })
            .catch(err => {
                reject(err)
            });
    })

    Promise.all([countUsers, getUsers]).then(results => {
        const totalUsers = results[0]
        const upperRange = totalUsers < (lowerRange + limit) ? totalUsers : (lowerRange + limit)
        res.send({ status: 200, error: null, response: { users: results[1], total_users: totalUsers, lower_range: lowerRange + 1, upper_range: upperRange } });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ error: 'Internal Server Error' });
    })
};

// Update a user
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            error: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;


    let updateUser = new Promise((resolve, reject) => {
        if (req.body.role) User.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true }).then(data => { resolve(data) }).catch(err => { reject(err) })
        else User.findByIdAndUpdate(id, { "$set": { "fullname": req.body.fullname, "email": req.body.email, "contact_number": req.body.contact_number } }, { useFindAndModify: false, new: true }).then(data => { resolve(data) }).catch(err => { reject(err) })
    })
    
    updateUser.then(data => {
        if (!data) {
            res.status(404).send({
                error: `Cannot update User with id=${id}. Maybe User was not found!`
            });
        } else res.send({ status: 200, error: null, response: data });
    })
        .catch(err => {
            console.log(err)
            if (err.name === "ValidationError") {
                const validation = require('../shared/validation')
                res.status(400).send({ error: validation.getErrors(err.errors) });
            }
            else if (err.code === 11000 || err.code === 11001) {
                res.status(400).send({ error: "ER_DUP_ENTRY" });
            }
            else res.status(500).send({ error: 'Internal Server Error' });
        });

    // User.findByIdAndUpdate(id, { "$set": { "fullname": req.body.fullname, "email": req.body.email, "contact_number": req.body.contact_number } }, { useFindAndModify: false, new: true })
    //     .then(data => {
    //         if (!data) {
    //             res.status(404).send({
    //                 error: `Cannot update User with id=${id}. Maybe User was not found!`
    //             });
    //         } else res.send({ status: 200, error: null, response: data });
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         if (err.name === "ValidationError") {
    //             const validation = require('../shared/validation')
    //             res.status(400).send({ error: validation.getErrors(err.errors) });
    //         }
    //         else if (err.code === 11000 || err.code === 11001) {
    //             res.status(400).send({ error: "ER_DUP_ENTRY" });
    //         }
    //         else res.status(500).send({ error: 'Internal Server Error' });
    //     });
};

// Delete a user with the specified ID
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    error: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            } else {
                res.send({ status: 200, error: null, response: data });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({ error: 'Internal Server Error' });
        });
};

// Search for user by fullname
exports.search = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            error: "Data to update can not be empty!"
        });
    }

    let filter = req.query.filter
    if (filter === "Staff") filter = { "role": "staff" }
    else if (filter === "Admin") filter = { "role": "admin" }
    else filter = {}

    const search = req.query.search

    User.find({ "fullname": { "$regex": search, "$options": "i" }, ...filter }, { password: 0, updatedAt: 0, createdAt: 0 })
        .limit(10)
        .then(data => {
            if (!data)
                res.status(404).send({ error: "No user found with id " + id });
            else res.send({ status: 200, error: null, response: data });
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({ error: 'Internal Server Error' });
        });
};

// Assigns a client to a particular staff member 
exports.updateClientLink = (req, res) => {
    const staffId = req.params.id;

    //send updated client object and update

    User.findByIdAndUpdate(staffId, { clients: req.body }, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    error: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            } else res.send({ status: 200, error: null, response: data });
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

exports.searchClients = (req, res) => {
    const search = req.query.search
    Client.find({ "fullname": { "$regex": search, "$options": "i" } }).limit(10).then((clientList) => {
        res.send({ status: 200, error: null, response: clientList });
    }).catch(err => {
        console.log(err)
        res.status(500).send({ error: 'Internal Server Error' });
    })
}