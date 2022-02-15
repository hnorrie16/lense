/**
 * Main file for the server
 * Creates the Express application
 * Middleman for all requests
*/

//dependencies
const express = require('express');
const app = express(); //creates express application
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors');
const AWS = require('aws-sdk');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const mongoose = require("mongoose");


console.log('Route')
//Initialise middleware
app.use(morgan('dev')) //logger
app.use(helmet())
app.use(express.json({ limit: '20mb', extended: true }));
app.use(express.urlencoded({ limit: '20mb', extended: true, parameterLimit: 10000 }));
app.use(cors())

console.log('Connected to build - 1')
const PORT = process.env.PORT || 8000;




console.log('Connected to build - 2')


require("./app/routes/client.route")(app);
require("./app/routes/user.route")(app);
require("./app/routes/assessment.route")(app);

const db = require("./app/models");
require("./app/models/user.model");
require("./app/models/client.model");


console.log(process.env.MONGODB_URI);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



AWS.config.update({
  accessKeyId: process.env.ACCESS_ID,
  secretAccessKey: process.env.SECRET_KEY
});


app.use(express.static(path.join(__dirname, 'webapp', 'build')));


app.get('*', (req, res) => {
  console.log('Connected to server - 3')
  res.send(path.join(__dirname, 'webapp', 'build', 'index.html'));
});


app.listen(PORT, async () => console.log(`Listening on port ${PORT}`))



