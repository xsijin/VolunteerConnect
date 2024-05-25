var express = require("express");
var router = express.Router();
var surveyController = require("../controllers/surveyQns");
var securityMiddleware = require("../middlewares/security");

router.post("/", surveyController.createSurvey);

module.exports = router;
