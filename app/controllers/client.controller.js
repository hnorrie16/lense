const db = require("../models");
const Client = db.clients;
const User = db.users;
const Assessment = db.assessments;
const {checkIfDefined} = require('../shared/validation')
const { reject } = require("async");


// Create and Save a new Client
exports.create = (req, res) => {
 console.log('Creating new user')
console.log(req.body)
  // Create a Client
  const client = new Client({
    LensID: req.body.LensID, //
    Category: req.body.Category, //
    field3: req.body.field3, //
    Sort: req.body.Sort,
    SupplierParent: req.body.SupplierParent,
    SupplierChild: req.body.SupplierChild,
    Abbreviation: req.body.Abbreviation,
    Series_ID: req.body.Series_ID, //
    LenseGroupID: req.body.LenseGroupID, //
    LenseGroup: req.body.LenseGroup, //
    Rule1: req.body.Rule1,
    Rule2: req.body.Rule2, //
    Rule3: req.body.Rule3, //
    RqsHC: req.body.RqsHC, //
    Type: req.body.Type,//
    StartDate: req.body.StartDate,
    EndDate: req.body.EndDate, 
    Active: req.body.Active,//
    Code: req.body.Code,
    Change: req.body.Change, //
    Description: req.body.Description,//
    Pack: req.body.Pack,//
    Stock: req.body.Stock,//
    Index: req.body.Index,//
    UV: req.body.UV,//
    AR: req.body.AR,//
    HC: req.body.HC, //
    PH: req.body.PH,//
    PO: req.body.PO,//
    TL: req.body.TL,//
    TD: req.body.TD,//
    MC: req.body.MC,//
    OAPrint: req.body.OAPrint, //
    MedAidPrint: req.body.MedAidPrint,
    DiscPrint: req.body.DiscPrint,
    Company: req.body.Company, //
    field39: req.body.field39,//
    field40: req.body.field40,//
    field41: req.body.field41,//
    SAOAGroup: req.body.SAOAGroup //

  });

  console.log("Prepping to add to DB")

  // Save Client in the database
  client
    .save(client)
    .then(data => {
      console.log('Success?')
      res.send({ status: 200, error: null, response: data });
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        const validation = require('../shared/validation')
        res.status(400).send({ error: validation.getErrors(err.errors) });
      }
      else if (err.code === 11000 || err.code === 11001) {
        res.status(400).send({ error: "ER_DUP_ENTRY" });
      }
      else res.status(500).send({ error: 'Internal Server Error' });
    });
};

// Find client based on id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Client.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ error: "No Client found with id " + id });
      else res.send({ status: 200, error: null, response: data });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ error: "Error retrieving Client with id=" + id });
    });
};

// Update a client
exports.update = (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      error: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Client.findByIdAndUpdate(id, req.body, { useFindAndModify: true, new: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          error: `Cannot update Client with id=${id}. Maybe Client was not found!`
        });
      } else 
      {
        res.send({ status: 200, error: null, response: "Client successfully updated" });}
    })
    .catch(err => {
  
      if (err.name === "ValidationError") {
        const validation = require('../shared/validation')
        console.log("Data cant be emptyyy")
        res.status(400).send({ error: validation.getErrors(err.errors) });
      }
      else if (err.code === 11000 || err.code === 11001) {
        console.log("Data cant be emptyyy")
        res.status(400).send({ error: "ER_DUP_ENTRY" });
      }
      else{
        console.log("Data cant be emptyyy")
        res.status(500).send({ error: 'Internal Server Error' });
      }
    });
};



// Update a client
exports.updateAll = (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      error: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Client.findByIdAndUpdate(id, req.body, { useFindAndModify: true, new: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          error: `Cannot update Client with id=${id}. Maybe Client was not found!`
        });
      } else 
      {
        res.send({ status: 200, error: null, response: "Client successfully updated" });}
    })
    .catch(err => {
   
      if (err.name === "ValidationError") {
        const validation = require('../shared/validation')

        res.status(400).send({ error: validation.getErrors(err.errors) });
      }
      else if (err.code === 11000 || err.code === 11001) {

        res.status(400).send({ error: "ER_DUP_ENTRY" });
      }
      else{

        res.status(500).send({ error: 'Internal Server Error' });
      }
    });
};


// Retrieve all clients from database -- function dependent on user role
exports.fetchClients = (req, res) => {

  const staffId = req.params.id
  let filter = req.query.filter
  let lenseId = req.query.lenseId

  let comp = req.query.limit
  console.log(comp + ' ROLEEE')
  if (filter === "All") filter = {}
  else if (filter === "Active") filter = { "archived": false }
  else if (filter === "New") filter = { "new_client": true }
  else if (filter === "Archived") filter = { "archived": true }
  else if (filter === "1000") filter = { "series": "1000" }
  else if (filter === "2000") filter = { "series": "2000" }
  else if (filter === "4000") filter = { "series": "4000" }
  else if (filter === "5000") filter = { "series": "5000" }
  else if (filter === "6000") filter = { "series": "6000" }
  else if (filter === "7000") filter = { "series": "7000" }
  else if (filter === "8000") filter = { "series": "8000" }
  else if (filter === "exporttable") filter = { "series": "exporttable" }
  else filter = {}
  console.log("FILTER ---> " + filter.series)
  
  console.log("LENSEIDFILTER ---> " + req.query.lenseId)





  const user = req.user //gets user from checkAuthToken middleware 

  //for pagination
  const page = +req.query.page
  const limit = +req.query.limit
  const lowerRange = ((page - 1) * limit)

  // different fetches for different user roles
  if (user.role === "staff") {
    //fetch signed in staff member's clients - paginated
    User.findById(staffId)
      .then( userData => {
        if (!userData)
          res.status(404).send({ error: "No User found with id " + id });
        else {
          const clientIds = Object.keys(checkIfDefined(userData.clients, {}))
          Client.find(filter).where('_id').in(clientIds).limit(limit).skip(lowerRange).then(async (clientList) => {
            const totalClients = clientIds.length
            const upperRange = totalClients < (lowerRange + limit) ? totalClients : (lowerRange + limit)
            const totals = await getTotals()
            res.send({ status: 200, error: null, response: { clients: clientList, total_clients: totalClients, lower_range: lowerRange + 1, upper_range: upperRange, totals: totals } });
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
  else {
    //admin or super user -- fetch all clients - paginated
    let countClients = new Promise((resolve, reject) => {
      Client.count({ ...filter }).then(data => { resolve(data) }).catch(err => { reject(err) });
    })

    let getClients = new Promise((resolve, reject) => {
      //THIS IS WHERE IT GETS FILTERED!!
       //THIS IS WHERE IT GETS FILTERED!!
        //THIS IS WHERE IT GETS FILTERED!!
         //THIS IS WHERE IT GETS FILTERED!!
         //THIS IS WHERE IT GETS FILTERED!!
          //THIS IS WHERE IT GETS FILTERED!!
           //THIS IS WHERE IT GETS FILTERED!!
            //THIS IS WHERE IT GETS FILTERED!!
             //THIS IS WHERE IT GETS FILTERED!!
              //THIS IS WHERE IT GETS FILTERED!!

              let expr =  {$and: [{ SAOAGroup: filter.series }, {SupplierChild: comp}]};
              console.log("OKOKOKOK")
              if(filter.series === "exporttable"){
                console.log("MNMNMNMN")
                expr =  {$and: [{ $or: [ {SAOAGroup: "7000"},{SAOAGroup: "8000"}]}]};
              } else {
                if(lenseId == 0){
                  console.log("MNMNMNMNaaaa   " + comp)
                  expr =  {$and: [{ $or: [ {SAOAGroup: filter.series}]}, {SupplierChild: comp}]};
                } else{
                  console.log("LENSE ID FILTER   " + comp)
                  expr =  {$and: [{ $or: [ {SAOAGroup: filter.series}]}, {SupplierChild: comp}, {LenseGroupID: lenseId}]};
                }
              }


              console.log("EXPRESSION: " + expr)
             
      Client.find(expr, { createdAt: 0, updatedAt: 0}).skip(lowerRange).limit(limit)
      //Client.find({ SAOAGroup: filter.series }, { createdAt: 0, updatedAt: 0}).skip(lowerRange).limit(limit)
        .then(data => {
          console.log("DATAAAAA")

          console.log(data)
          resolve(data)
        })
        .catch(err => {
          console.log("DATAAAAA SAAAAAD")

          reject(err)
        });
    })

    Promise.all([countClients, getClients]).then(async results => {
      const totalClients = results[0]
      const upperRange = totalClients < (lowerRange + limit) ? totalClients : (lowerRange + limit)
      const totals = await getTotals()
      res.send({ status: 200, error: null, response: { clients: results[1], total_clients: totalClients, lower_range: lowerRange + 1, upper_range: upperRange, totals: totals } });
    }).catch(err => {
      console.log(err);
      res.status(500).send({ error: 'Internal Server Error' });
    })
  }
};

const getTotals = () => {

  return new Promise((resolve, reject) => {
    const getTotalClients = new Promise((resolve, reject) => {
      Client.count().then(data => { resolve(data) }).catch(err => { reject(err) });
    })

    const getTotalAssessments = new Promise((resolve, reject) => {
      Assessment.count().then(data => { resolve(data) }).catch(err => { reject(err) });
    })

    const getTotalNewAssessments = new Promise((resolve, reject) => {
      Client.count({ "assessment_status": "New" }).then(data => { resolve(data) }).catch(err => { reject(err) });
    })

    Promise.all([getTotalClients, getTotalAssessments, getTotalNewAssessments]).then(results => {
      resolve({ total_clients: results[0], total_assessments: results[1], new_assessments: results[2] })
    })
  })

}

exports.search = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      error: "Data to update can not be empty!"
    });
  }

  const search = req.query.search
  let filter = req.query.filter

  if (filter === "All") filter = {}
  else if (filter === "Active") filter = { "archived": false }
  else if (filter === "New") filter = {}
  else if (filter === "Archived") filter = { "archived": true }
  else filter = {}
  const user = req.user

  //different searches for different user roles
  if (user.role === "staff") {
    //general staff user - search signed in users clients
    const staffId = req.params.id
    User.findById(staffId)
      .then(userData => {
        if (!userData)
          res.status(404).send({ error: "No User found with id " + id });
        else {
          const clientIds = Object.keys(userData.clients)
          Client.find({ "fullname": { "$regex": search, "$options": "i" }, ...filter }).where('_id').in(clientIds).then((clientList) => {
            //
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
  else {
    //admin or super user -- search all clients
    Client.find({ "fullname": { "$regex": search, "$options": "i" }, ...filter }, { createdAt: 0, updatedAt: 0 })
      .limit(10)
      .then(data => {
        if (!data)
          res.status(404).send({ error: "No client found with id " + id });
        else res.send({ status: 200, error: null, response: data });
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({ error: 'Internal Server Error' });
      });
  }
};


// ADMIN FUNCTIONS


// Delete a client with the specified ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Client.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          error: `Cannot delete Client with id=${id}. Maybe Client was not found!`
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