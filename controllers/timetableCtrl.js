const db = require("../models/db");
const fetch = require("../functions/fetchFunc");

module.exports.getClasses = async (req, res) => {
  try {
    // Extract user id after authenticating
    const id = req.user.id;
    // Find complaint using fk login_id
    const timetableData = await db.public.classes.findAll({
      where: { login_id: id },
      attributes: [
        "class_id",
        "course_code",
        "course_name",
        "faculty",
        "login_id",
        "start",
        "end",
        "day"
      ],
      /*include: [{
                model: db.public.subjects,
                attributes: ['course_code', 'course_name']
            }]  */
    });
    return res.status(200).json({
      success: true,
      subjects: timetableData, // If null, front-end should show no current compaints
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

module.exports.createClass = async function (req, res) {
  try {
    // get request_body
    const newClass = req.body;
    newClass.login_id = req.user.id;
    await db.public.classes
      .create(newClass, { returning: true })
      .then((classData) => {
        const class_data = {
          login_id: classData.login_id,
          course_code: classData.course_code,
          course_name: classData.course_name,
          faculty:classData.faculty,
          start: classData.start,
          end: classData.end,
          day: classData.day
        };
        return res.status(200).json({
          success: true,
          subject: class_data,
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

module.exports.deleteClass = async function (req, res) {
    // get request_body
    const class_id = req.body.class_id;
    const id = req.user.id;
    
    await db.public.classes.destroy({ where: { class_id: class_id, login_id: id } }).then(() => {
      return res.status(200).json({
        success: true,
        msg: "Class deleted successfully.",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        msg: "Internal server error",
        details: err
      });
    })
};
