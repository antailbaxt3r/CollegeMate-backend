var express = require('express');
var router = express.Router();
const multerUploads = require('../functions/multer').multerUploads;
const configCloudinary = require('../functions/configCloudinary');

var verify = require('../functions/verifyFunc');
var validate = require('../functions/validateFunc');

var assignments = require('../controllers/assignmentsCtrl')

router.get('/get', verify.user,assignments.getAssignments);
router.post('/add', verify.user, validate.assignmentValidation ,assignments.createAssignment)
router.delete('/delete', verify.user, assignments.deleteAssignment)

router.post('/upload',multerUploads,configCloudinary,assignments.uploadImage);

module.exports = router