var express = require('express');
var router = express.Router();

var verify = require('../functions/verifyFunc');
var validate = require('../functions/validateFunc');

var assignments = require('../controllers/assignmentsCtrl')

router.get('/get', verify.user, assignments.getAssignments);
router.post('/add', verify.user, validate.assignmentValidation, assignments.createAssignment)

module.exports = router