var express = require('express');
var router = express.Router();

var verify = require('../functions/verifyFunc');
var validate = require('../functions/validateFunc');

var timetable = require('../controllers/timetableCtrl')

router.get('/get', verify.user, timetable.getClasses);
router.post('/add', verify.user, validate.classValidation, timetable.createClass)
router.delete('/delete', verify.user, timetable.deleteClass)

module.exports = router