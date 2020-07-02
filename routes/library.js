var express = require('express');
var router = express.Router();
const multerUploads = require('../functions/multer').multerUploads;
const configCloudinary = require('../functions/configCloudinary');

var verify = require('../functions/verifyFunc');
var validate = require('../functions/validateFunc');

var library = require('../controllers/libraryCtrl');
const multer = require('multer');

router.get('/get', verify.user, library.getLibrary);
router.post('/add', verify.user, multerUploads, configCloudinary, validate.libraryValidation, library.addFile)
router.delete('/delete',configCloudinary,verify.user,library.deleteFile);

module.exports = router