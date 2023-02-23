const express = require("express");
const { userSignup, userLogin } = require("../controllers/userController");
const router = express.Router();

// signup
router.post("/signup",userSignup);
// login

router.post("/login",userLogin);

module.exports = router;