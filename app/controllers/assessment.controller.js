const db = require("../models");
const Assessment = db.assessments;
const Client = db.clients;
const Spreadsheet = db.spreadsheets;
const pdf = require('html-pdf')
const async = require('async');
const e = require("cors");
let ejs = require("ejs");
let path = require("path");
const fs = require('fs')
const AWS = require('aws-sdk');
const fileType = require('file-type');
const multiparty = require('multiparty');


//Create assessment
//Once created - check if client exists
//If client does not exists, create new client with assessment id in assessments array
//Else append assessment id to assessments array
let questionnaire = require('../shared/quesionnaire');
const { checkIfDefined, getErrors } = require("../shared/validation");

exports.start = (req, res) => {
  // Create an Assessment
  let list = req.body
  let currentSpreadsheet = {}

  const firstTimestamp = list[0].Timestamp
  let currentRowNumber = 0

  // find spreadsheet in database where timestamp of first row matches
  // if not found - new spreadsheet - start from row 1
  Spreadsheet.findOne({ "spreadsheet.processed_rows.1": firstTimestamp })
    .then(async data => {
      if (data === null) {
        // const spreadsheet = new Spreadsheet({ spreadsheet: { processed_rows: { "1": firstTimestamp }, row_number: 1 } });
        const spreadsheet = new Spreadsheet({ spreadsheet: {} });
        currentSpreadsheet = spreadsheet
        await spreadsheet.save(spreadsheet)
        processQuestionnaires(list, currentSpreadsheet, currentRowNumber).then(result => {
          res.send({ status: 200, error: null, response: result });
        }).catch(error => {
          console.log(error)
          if (error.status === 500) res.status(500).send(error);
          else res.status(400).send(error);
        })
      }
      else {
        // if found - retrieve row number from existing spreadsheet and start from there
        console.log("check")
        currentSpreadsheet = data
        currentRowNumber = data.spreadsheet.row_number
        list.splice(0, (currentRowNumber))
        processQuestionnaires(list, currentSpreadsheet, currentRowNumber).then(result => {
          res.send({ status: 200, error: null, response: result });
        }).catch(error => {
          console.log(error)
          if (error.status === 500) res.status(500).send(error);
          else res.status(400).send(error);
        })
      }
    })
}

// Function to loop through the questonnaire list and create clients and assesments for each row
// Does it asynchronously - one row at a time so if one fails, it stops there and logs the row number
const processQuestionnaires = (list, currentSpreadsheet, currentRowNumber) => {

  return new Promise((resolve, reject) => {

    let numClientsCreated = 0
    let numAssessmentsStarted = 0
    let failedAt = ""

    async.eachSeries(list, function (item, callback) {
      console.log("loop")
      const quesionnaireData = questionnaire.convert(item)

      const date_time = require('../shared/date_time')

      const assessment = new Assessment({
        date: date_time.current_date(new Date(Date.now())),
        status: 1,
        questionnaire_phase: quesionnaireData
      })

      //check if client exists
      Client.find({ id_number: quesionnaireData.client_details.id_number })
        .then(clientData => {
          if (clientData.length > 0) {
            console.log("client found")
            let assessmentList = clientData[0].assessments
            //append assessment id to assessments array
            assessmentList.push(assessment._id)
            //update client with new assessment list
            Client.findByIdAndUpdate(clientData[0]._id, { ...clientData[0], assessments: assessmentList, assessment_status: "New" }, { useFindAndModify: false, new: true })
              .then(data => {
                //Save assessment in DB
                assessment
                  .save(assessment)
                  .then(async assessmentData => {
                    numAssessmentsStarted += 1
                    //update spreadsheet
                    updateSpreadsheet(currentRowNumber, currentSpreadsheet, assessment).then(result => {
                      currentRowNumber = result.updatedRowNumber
                      currentSpreadsheet = result.updatedSpreadsheet
                      callback()
                    }).catch(err => {
                      var error = new Error(err);
                      error.break = true;
                      failedAt = "Timestamp: " + quesionnaireData.general.timestamp + ", Full name: " + quesionnaireData.client_details.fullname + ", ID Number: " + quesionnaireData.client_details.id_number
                      return callback(err);
                    });
                  })
                  .catch(err => {
                    var error = new Error(err);
                    error.break = true;
                    failedAt = "Timestamp: " + quesionnaireData.general.timestamp + ", Full name: " + quesionnaireData.client_details.fullname + ", ID Number: " + quesionnaireData.client_details.id_number
                    return callback(err);
                  });
              })
              .catch(err => {
                var error = new Error(err);
                error.break = true;
                failedAt = "Timestamp: " + quesionnaireData.general.timestamp + ", Full name: " + quesionnaireData.client_details.fullname + ", ID Number: " + quesionnaireData.client_details.id_number
                return callback(err);
              });
          }
          else {
            console.log("client not found")
            //client does not exists - create client
            const client = new Client({ ...quesionnaireData.client_details, assessments: [assessment._id], archived: false, new_client: true, assessment_status: "New" });
            // Save Client in the database
            client
              .save(client)
              .then(clientData => {
                numClientsCreated += 1
                // Save assessment in DB
                assessment
                  .save(assessment)
                  .then(async assessmentData => {
                    numAssessmentsStarted += 1
                    //update spreadsheet
                    updateSpreadsheet(currentRowNumber, currentSpreadsheet, assessment).then(result => {
                      currentRowNumber = result.updatedRowNumber
                      currentSpreadsheet = result.updatedSpreadsheet
                      callback()
                    }).catch(err => {
                      var error = new Error(err);
                      error.break = true;
                      failedAt = "Timestamp: " + quesionnaireData.general.timestamp + ", Full name: " + quesionnaireData.client_details.fullname + ", ID Number: " + quesionnaireData.client_details.id_number
                      return callback(err);
                    });
                  })
                  .catch(err => {
                    var error = new Error(err);
                    error.break = true;
                    failedAt = "Timestamp: " + quesionnaireData.general.timestamp + ", Full name: " + quesionnaireData.client_details.fullname + ", ID Number: " + quesionnaireData.client_details.id_number
                    return callback(err);
                  });
              })
              .catch(err => {
                var error = new Error(err);
                error.break = true;
                failedAt = "Timestamp: " + quesionnaireData.general.timestamp + ", Full name: " + quesionnaireData.client_details.fullname + ", ID Number: " + quesionnaireData.client_details.id_number
                return callback(err);
              });
          }
        })
        .catch(err => {
          var error = new Error(err);
          error.break = true;
          failedAt = "Timestamp: " + quesionnaireData.timestamp + ", Full name: " + quesionnaireData.fullname + ", ID Number: " + quesionnaireData.id_number
          return callback(err);
        });
    }, function (err, result) {
      if (!err) {
        resolve({ total_clients: numClientsCreated, total_assessments: numAssessmentsStarted })
      }
      else {
        if (err.name === "ValidationError") {
          reject({ status: 400, error: getErrors(err.errors), failed_at: failedAt, total_clients: numClientsCreated, total_assessments: numAssessmentsStarted })
        }
        else if (err.code === 11000 || err.code === 11001) {
          reject({ status: 400, error: "Client with ID number already exists", failed_at: failedAt, total_clients: numClientsCreated, total_assessments: numAssessmentsStarted })
        }
        reject({ status: 500, error: "System Error - code:" + err.code, failed_at: failedAt, total_clients: numClientsCreated, total_assessments: numAssessmentsStarted })
      }
    })
  })
}

// Function to update the respective spreadsheet document
const updateSpreadsheet = (currentRowNumber, currentSpreadsheet, assessment) => {
  return new Promise((resolve, reject) => {
    currentRowNumber += 1
    const updatedRows = currentSpreadsheet.spreadsheet.processed_rows !== undefined ? { ...currentSpreadsheet.spreadsheet.processed_rows, [currentRowNumber]: assessment.questionnaire_phase.general.timestamp } : { [currentRowNumber]: assessment.questionnaire_phase.general.timestamp }
    const updatedSpreadsheet = { spreadsheet: { processed_rows: updatedRows, row_number: currentRowNumber } }
    Spreadsheet.findByIdAndUpdate(currentSpreadsheet._id, updatedSpreadsheet, { new: true, useFindAndModify: false },).then(newSpreadsheet => {
      resolve({ updatedRowNumber: currentRowNumber, updatedSpreadsheet: newSpreadsheet })
    }).catch(err => {
      reject(err)
    });
  })
}

// Update data in assessment - updates according to name of object send in the request body
// Phase management takes place here
// Called upon clicking save and continue button
exports.update = (req, res) => {
  const id = req.params.id;
  const number = req.query.number;

  Assessment.findById(id)
    .then(assessmentData => {
      let updatedData = {}
      if (+number === +assessmentData.status) {
        updatedData = { ...req.body, status: assessmentData.status + 1 }
      }
      else {
        if ((assessmentData.status === 5 || assessmentData.status === 6) && (+number === 1 || +number === 3)) updatedData = { ...req.body, status: 4 }
        else updatedData = { ...req.body, status: assessmentData.status }
      }

      Assessment.findByIdAndUpdate(id, updatedData, { useFindAndModify: false, new: true })
        .then(async newAssessmentData => {
          if (!newAssessmentData) {
            res.status(404).send({
              error: `Cannot update Assessment with id=${id}. Maybe Assessment was not found!`
            });
          } else {

            const assessmentStatus = newAssessmentData.status === 1 ? "Questionnaire" : newAssessmentData.status === 2 ? "Consult" : newAssessmentData.status === 3 ? "Actigraphy" : newAssessmentData.status === 4 ? "Data Analysis" : newAssessmentData.status === 5 ? "Generate report" : "Complete"

            await Client.findOneAndUpdate({ "assessments": id }, { "$set": { "assessment_status": assessmentStatus } }, { useFindAndModify: false, new: true })

            // await Client.findOneAndUpdate({ "id_number": newAssessmentData.questionnaire_phase.client_details.id_number }, { "$set": { "assessment_status": assessmentStatus } }, { useFindAndModify: false, new: true })
            if (+number === 1 || +number === 3) {
              const calculations = require('../shared/calculations')
              // need assessment to be updated prior to computing calculations
              // update calculations and return updated phase data and updated analysis phase data
              assessmentData[Object.keys(req.body)[0]] = req.body[Object.keys(req.body)[0]]
              const calculationObject = +number === 1 ? calculations.computeQuestionnaireCalculations(assessmentData) : calculations.computeActigraphyCalculations(assessmentData)
              const updatedAnalysis = { analysis_phase: { ...calculationObject, interpretation: assessmentData.analysis_phase.interpretation } }
              Assessment.findByIdAndUpdate(id, updatedAnalysis, { useFindAndModify: false, new: true })
                .then(data => {
                  // update the client with new assessment status
                  res.send({ status: 200, error: null, response: { ...updatedData, ...updatedAnalysis } });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).send({ error: 'Internal Server Error' });
                });
            }
            else {
              // return updated phase data
              res.send({ status: 200, error: null, response: updatedData });
            }
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).send({ error: 'Internal Server Error' });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: "Error retrieving Assessment with id=" + id });
    });
}

exports.updateSummaryReport = (req, res) => {
  const id = req.params.id;
  const remove = req.query.isRemove
  let status = req.query.status
  if (remove) status = 3
  Assessment.findByIdAndUpdate(id, { "$set": { "actigraphy_phase.report": req.body, "status": status } }, { useFindAndModify: false, new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          error: `Cannot update Assessment with id=${id}. Maybe Assessment was not found!`
        });
      } else {
        res.send({ status: 200, error: null, response: "Summary report updated" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: 'Internal Server Error' });
    });

}

// Find assessment based on id
exports.findOne = (req, res) => {
  const assesmentId = req.params.id;
  const clientId = req.query.client_id
  Assessment.findById(assesmentId)
    .then(assessmentData => {
      if (!assessmentData) res.status(404).send({ error: "No assessment found with id " + assesmentId });
      else {
        let assessmentStatus = ""
        Client.findById(clientId).then((data) => {
          data.assessment_status === "New" ? assessmentStatus = "Questionnaire" : assessmentStatus = data.assessment_status
          Client.findByIdAndUpdate(clientId, { "$set": { "new_client": false, "assessment_status": assessmentStatus} }, { useFindAndModify: false, new: true }).then(clientData => {
            res.send({ status: 200, error: null, response: assessmentData });
          }).catch(err => {
            console.log(err);
            res.status(500).send({ error: "Error retrieving Assessment with id=" + assesmentId });
          });
        })
          .catch((err) => {
            res.status(500).send({ error: "Error retrieving Client with id=" + clientId });
          })

      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: "Error retrieving Assessment with id=" + assesmentId });
    });
};

const determineColour = (colour) => {
  if (colour === "Green") return "#4DAA59"
  else if (colour === "Amber") return "#F5C142"
  else if (colour === "Red") return "Red"
  else return "White"
}

const formatHeadings = (key) => {
  let temp = key.replace(/_/g, " ").toLowerCase()
  return temp.charAt(0).toUpperCase() + temp.slice(1) + ":";
}

exports.generatePDF = (req, res) => {
  console.log("start")

  const assesmentId = req.params.id;

  Assessment.findById(assesmentId)
    .then(assessmentData => {
      let values = []
      const sleepProfile = assessmentData.analysis_phase.calculations.sleep_profile
      var objectKeysArray = Object.keys(sleepProfile.toJSON())
      objectKeysArray.forEach((objKey) => {
        const item = sleepProfile[objKey]
        values.push({ [formatHeadings(objKey)]: { value: item.value * 30, colour: determineColour(item.colour), width: ((item.value * 30) + "px") } })
      })

      let columns = assessmentData.actigraphy_phase.report.summary_raw.columns
      let summary = assessmentData.actigraphy_phase.report.summary
      let headingsDaily = assessmentData.actigraphy_phase.report.daily_raw.columns
      let daily = assessmentData.actigraphy_phase.report.daily

      let interpretations = {
        "Time-in-bed:": "As indicated by your markers (Actiwatch) and sleep diary. Recommended for adults: 7-9h.",
        "Total sleep time:": "Actual time asleep as estimated by the Actiwatch based on your movements.",
        "Onset latency:": "Time difference between “lights out” – i.e. you actively deciding to start to sleep and the time at which the Actiwatch estimates that you fall asleep. Normal is >5 but <20min.",
        "Sleep efficiency:": "The ratio of your “total sleep time” and “time-in-bed” – i.e. the time you were actually asleep while in bed trying to sleep. Normal is >85%. Very good is >95%.",
        "WASO:": "Time awake during sleep phase: The number of minutes the Actiwatch calculated that you were awake during your sleep period. Ideally this should be as low as possible.",
        "No. of arousals:": "The number of times the Actiwatch estimates you wake up (or your sleep lightens) during the night. Ideally this should be as low as possible.",
        "": "In general, healthy sleeping patterns are considered to have consistent wake-up times, bedtimes and sleep durations, and minimal disturbances from night to night."
      }

      const sleepQuestionnaires = assessmentData.analysis_phase.calculations.sleep_questionnaires
      let calculations = {}
      calculations["ESS"] = { value: sleepQuestionnaires.ess, margin: ((sleepQuestionnaires.ess / 24) * 483) + "px" }
      calculations["FSS"] = { value: sleepQuestionnaires.fss, margin: ((sleepQuestionnaires.fss / 7) * 483) + "px" }
      calculations["ISI"] = { value: sleepQuestionnaires.isi, margin: ((sleepQuestionnaires.isi / 28) * 479) + "px" }

      ejs.renderFile(path.join(__dirname, '../documents/', "report-template.ejs"), { values: values, columns: columns, summary: summary.toJSON(), headingsDaily: headingsDaily, interpretations: interpretations, daily: daily, calculations: calculations }, (err, data) => {
        if (err) {
          console.log(err)
          res.send(err);
        } else {

          let options = {
            "width": "21cm",
            "height": "29.7cm",
            "header": {
              "height": "16mm"
            },
            "footer": {
              "height": "16mm",
            },
          };

          pdf.create(data, options).toFile("report.pdf", async function (err, data) {
            if (err) {
              console.log(err)
              res.send(err);
            } else {
              console.log("done")
              //Store created report in database

              let reportBuffer = fs.readFileSync(data.filename);

              const s3 = new AWS.S3();

              const type = await fileType.fromBuffer(reportBuffer);
              const name = `report/${assesmentId}`;

              const params = {
                Body: reportBuffer,
                Bucket: process.env.UPLOAD_ACCESS_POINT,
                ContentType: type.mime,
                Key: `${name}.${type.ext}`,
              };

              s3.upload(params, function (err, uploadedFileData) {
                const fileURL = "https://sleepscience.s3.af-south-1.amazonaws.com/" + uploadedFileData.Key
                Assessment.findByIdAndUpdate(assesmentId, { "$set": { "files.final_report": { file: fileURL, key: uploadedFileData.Key }, "status": 6 } }, { useFindAndModify: false, new: true })
                  .then(updatedData => {
                    res.send({ status: 200, error: null, response: updatedData.files });
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).send({ error: 'Internal Server Error' });
                  });
              });
            }
          });
        }
      });

    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: "Error retrieving Assessment with id=" + assesmentId });
    });
}

// Update file in assessment - used for upload and remove
exports.uploadFile = (req, res) => {
  const assesmentId = req.params.id;
  const fileContext = req.query.fileContext
  const fileName = req.query.fileName

  const s3 = new AWS.S3();

  const uploadFileToS3 = (buffer, name, type) => {
    const params = {
      Body: buffer,
      Bucket: process.env.UPLOAD_ACCESS_POINT,
      ContentType: type.mime,
      Key: `${name}.${type.ext}`,
    };
    return s3.upload(params).promise();
  };

  const form = new multiparty.Form();

  form.parse(req, async (error, fields, files) => {
    if (error) {
      console.log(error)
      return res.status(500).send(error);
    };
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = await fileType.fromBuffer(buffer);
      const name = `${fileContext}/${assesmentId}`;
      const uploadedFileData = await uploadFileToS3(buffer, name, type);

      const fileURL = "https://sleepscience.s3.af-south-1.amazonaws.com/" + uploadedFileData.Key

      let updateDatabase = new Promise((resolve, reject) => {
        if (fileContext === "actigram") Assessment.findByIdAndUpdate(assesmentId, { "$set": { "files.actigram": { file: fileURL, key: uploadedFileData.Key, file_name: fileName } } }, { useFindAndModify: false, new: true }).then(data => { resolve(data) }).catch(err => { reject(err) })
        else if (fileContext === "consult_phase") Assessment.findByIdAndUpdate(assesmentId, { "$set": { "files.consult_notes": { file: fileURL, key: uploadedFileData.Key, file_name: fileName } } }, { useFindAndModify: false, new: true }).then(data => { resolve(data) }).catch(err => { reject(err) })
      })
      updateDatabase.then(assessmentData => {
        console.log(fileURL)
        res.send({ status: 200, error: null, response: assessmentData.files });
      }).catch(err => {
        console.log(err);
        res.status(500).send({ error: 'Internal Server Error' });
      });
    } catch (err) {
      console.log(err)
      return res.status(500).send(err);
    }
  });
};

exports.removeFile = (req, res) => {
  //remove file
  const assesmentId = req.params.id;
  const fileName = req.query.fileName
  const fileKey = req.query.fileKey

  const s3 = new AWS.S3();

  const params = {
    Bucket: process.env.REMOVE_ACCESS_POINT,
    Key: fileKey,
  };

  s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
    else {
      let updateDatabase = new Promise((resolve, reject) => {
        if (fileName === "actigram") Assessment.findByIdAndUpdate(assesmentId, { "$set": { "files.actigram": null, "status": 3 } }, { useFindAndModify: false, new: true }).then(data => { resolve(data) }).catch(err => { reject(err) })
        else if (fileName === "consult_phase") Assessment.findByIdAndUpdate(assesmentId, { "$set": { "files.consult_notes": null } }, { useFindAndModify: false, new: true }).then(data => { resolve(data) }).catch(err => { reject(err) })
      })
      updateDatabase.then(assessmentData => {
        res.send({ status: 200, error: null, response: assessmentData.files });
      }).catch(err => {
        console.log(err);
        res.status(500).send({ error: 'Internal Server Error' });
      });
    }
  });
}

exports.emailReport = (req, res) => {
  const assessmentId = req.params.id
  const emailAddress = req.query.emailAdress
  const message = req.body.message

  const email = require('../shared/email')

  Assessment.findById(assessmentId).then(assessmentData => {
    const reportURL = assessmentData.files.final_report.file

    email.send_email(message + "\n" + reportURL, emailAddress).then(data => {
      res.send({ status: 200, error: null, response: "Email sent successfully" });
    }).catch(err => {
      console.log(err);
      res.status(500).send({ error: "Error sending email" });
    });
  }).catch(err => {
    console.log(err);
    res.status(500).send({ error: "Error retrieving Assessment with id=" + assesmentId });
  });
}