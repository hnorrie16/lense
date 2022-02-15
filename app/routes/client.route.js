module.exports = app => {
  const clients = require("../controllers/client.controller.js");
  const checkAuthToken = require('../middleware/checkAuthToken')
  const authorise = require('../middleware/authorise')

  var router = require("express").Router();

  // Search clients
  router.get("/search/:id", checkAuthToken, clients.search);

  // Create a new client
  router.post("/", checkAuthToken, clients.create);

  // Retrieve all clients from the database
  router.get("/fetch/:id", checkAuthToken, clients.fetchClients);

  // Retrieve a single client with id
  router.get("/:id", checkAuthToken, clients.findOne);

  // Update a client with id
  router.put("/update/:id", checkAuthToken, clients.update);

    // Update a client with id
    router.put("/updateAll/", checkAuthToken, clients.updateAll);


  // ADMIN ENDPOINTS

  // Delete a client with id
  router.delete("/:id", checkAuthToken, authorise, clients.delete);

  app.use('/api/clients', router);
};