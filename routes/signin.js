var express = require('express');
var router = express.Router();

var googleSignin = require("../controllers/googleSignInCtrl");

router.post('/google/signin', googleSignin.checkUserGoogle)

module.exports = router