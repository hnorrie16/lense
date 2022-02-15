module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const checkAuthToken = require('../middleware/checkAuthToken')
  const authorise = require('../middleware/authorise')
  var router = require("express").Router();

  // Sign in user
  router.post("/signIn", users.signIn)

  // Logout user
  router.put("/logout", users.logout);

  // Authenticate magic link
  router.post("/magiclink/auth", users.magicLink)

  // Change password of user
  router.post("/changePassword", users.changePassword)

  // Refresh token
  router.put("/refreshToken", users.refreshToken)

  // Update a user with id
  router.put("/update/:id", checkAuthToken, users.update);

  // ADMIN ENDPOINTSs


  // Create a new User

  router.post("/register", checkAuthToken, authorise, users.register);

  // Retrieve all staff users
  router.get("/", checkAuthToken, authorise, users.findAll)

  // Link client to user
  router.put('/updateClientLink/:id', checkAuthToken, authorise, users.updateClientLink)

  // Delete a user with id
  router.delete("/:id", checkAuthToken, authorise, users.delete);

  // Search for a user
  router.get("/search", checkAuthToken, authorise, users.search);

  // Retrieves all clients assigned to a particular staff member
  router.get("/staffClients/:id", checkAuthToken, authorise, users.staffClients)

  // Searches all clients 
  router.get("/searchClients", checkAuthToken, authorise, users.searchClients)

  app.use('/api/users', router);

};