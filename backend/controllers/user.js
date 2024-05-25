const modelUsers = require("../models/user");
const modelScores = require("../models/score");
const { sendEmail } = require("../util/sendEmail");

module.exports = {
  getUsers,
  getLoginDetails,
  loginUser,
  logoutUser,
  createUser,
};

async function getUsers(req, res) {
  try {
    const userData = await modelUsers.getUsers(req.query);
    res.json({ users: userData });
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getLoginDetails(req, res) {
  try {
    const loginDetails = await modelUsers.getLoginDetails(req.query);
    if (loginDetails.success != true) {
      res.status(400).json({ errorMsg: loginDetails.error });
      return;
    }
    res.json(loginDetails.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const token = await modelUsers.loginUser(req.body);
    console.log(token);
    if (!token.success) {
      res.status(400).json({ errorMsg: token.error });
      return;
    }
    res.json(token.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function createUser(req, res) {
  try {
    const userBody = { ...req.body };
    delete userBody.score;
    delete userBody.randomNum;
    // Create User
    const userData = await modelUsers.createUser(userBody);
    if (!userData.success) {
      res.status(400).json({ errorMsg: userData.error });
      return;
    }
    console.log(userData);

    // Get Score and Update
    const score = await modelScores.getScoreById(req.body.score);
    if (!score) {
      res.status(400).json({ errorMsg: "missing score" });
      return;
    }
    const updatedScore = await modelScores.updateScore(
      score._id,
      userData.data._id
    );

    // Send Email
    console.log(userData.data.email);
    console.log(`random password: ${req.body.randomNum}`);
    await sendEmail({
      type: "registration",
      payload: {
        userEmail: userData.data.email,
        randomPassword: req.body.randomNum,
      },
    });

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function logoutUser(req, res) {
  try {
    const result = await modelUsers.logoutUser(req.body);
    if (!result.success) {
      res.status(400).json({ errorMsg: result.error });
      return;
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}
