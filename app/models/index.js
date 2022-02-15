const dbConfig = require("../config/db.config.js");


const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.clients = require("./client.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
db.assessments = require("./assessment.model.js")(mongoose);
db.spreadsheets = require("./spreadsheet.model.js")(mongoose);

module.exports = db;