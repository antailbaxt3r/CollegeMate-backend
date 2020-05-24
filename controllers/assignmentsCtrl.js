const db = require("../models/db");
const fetch = require("../functions/fetchFunc");

module.exports.getAssignments = async (req, res) => {
  try {
    // Extract user id after authenticating
    const id = req.user.id;
    // Find complaint using fk login_id
    const assignmentData = await db.public.assignments.findAll({
      where: { login_id: id },
      attributes: [
        "assignment_id",
        "course_name",
        "date_due",
        "updated_at",
        "created_at",
      ],
      /* include: [{
                model: db.public.images,
                attributes: ['image']
            }] */
    });
    return res.status(200).json({
      success: true,
      assignments: assignmentData, // If null, front-end should show no current compaints
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};
