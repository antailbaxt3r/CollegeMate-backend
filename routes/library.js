var express = require('express');
var router = express.Router();
const multerUploads = require('../functions/multer').multerUploads;
const configCloudinary = require('../functions/configCloudinary');

var verify = require('../functions/verifyFunc');
var validate = require('../functions/validateFunc');

var libarary = require('../controllers/libraryCtrl');
const multer = require('multer');

router.get('/get', verify.user, libarary.getLibrary);
router.post('/add', verify.user, multerUploads, configCloudinary, validate.libraryValidation, libarary.addFile)

module.exports = router