var express = require("express");
var router = express.Router();
var scoreController = require("../controllers/score");
var securityMiddleware = require("../middlewares/security");

// @desc    Get score(by score id)
// @route   GET /score/:id
// @access  Public
router.get("/:id", scoreController.getScore);

// @desc    Create score
// @route   POST /score
// @access  Public
router.post("/", scoreController.createScore);

// @desc    Get all scores(by user id)
// @route   GET /score
// @access  Private (bearer token passed in header)
router.get("/", securityMiddleware.checkLogin, scoreController.getAllByUserId);

module.exports = router;
