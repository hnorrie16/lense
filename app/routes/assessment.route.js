module.exports = app => {
  const assessments = require("../controllers/assessment.controller.js");
  const checkAuthToken = require('../middleware/checkAuthToken')
  const authorise = require('../middleware/authorise')
  var router = require("express").Router();

  // Create a new Assessment
  router.post("/start", checkAuthToken, assessments.start);

  //Update phase
  router.put("/update/:id", checkAuthToken, assessments.update);

  //Update summary report
  router.put("/updateSummaryReport/:id", checkAuthToken, assessments.updateSummaryReport);

  //Upload file in assessment
  router.post("/uploadFile/:id", checkAuthToken, assessments.uploadFile);

  //Remove file in assessment
  router.delete("/removeFile/:id", checkAuthToken, assessments.removeFile);

  // Retrieve a single assessment based off id
  router.get("/:id", checkAuthToken, assessments.findOne);

  // Generate the report
  router.put("/generateReport/:id", checkAuthToken, assessments.generatePDF)

  // Email the report
  router.put("/emailReport/:id", checkAuthToken, assessments.emailReport)

  app.use('/api/assessments', checkAuthToken, router);
};