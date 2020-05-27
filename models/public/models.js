const db = {};
// Define all your models here
 
//Models/tables
// User Profile
db.login = require('./login.js').Login;

//subjects
db.subjects = require('./subjects').Subjects

//assignments
db.assignments = require('./assignments').Assignments

//timetable
db.classes = require('./classes').Classes

module.exports = db