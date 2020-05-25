var express = require('express');
var router = express.Router();

var verify = require('../functions/verifyFunc');
var validate = require('../functions/validateFunc');

var profile = require('../controllers/profileCtrl')

router.get('/get', verify.user, profile.getProfile)

module.exports = router