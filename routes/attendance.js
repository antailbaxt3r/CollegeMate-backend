var express = require('express');
var router = express.Router();

var verify = require('../functions/verifyFunc');
var validate = require('../functions/validateFunc');

//Ctrls
const attendanceCtrl = require('../controllers/attendanceCtrl');


router.get('/get',verify.user, attendanceCtrl.getAttendance);
router.post('/add',verify.user,validate.attendanceValidation, attendanceCtrl.addAttendance);
router.delete('/delete',verify.user, attendanceCtrl.deleteAttendance);



module.exports = router