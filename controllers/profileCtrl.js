const db = require("../models/db");

module.exports.getProfile = async (req, res) => {
  try {
    // Extract user id after authenticating
    const id = req.user.id;
    // Find complaint using fk login_id
    const userData = await db.public.login.findAll({
      where: { id: id },
      attributes: [
        "id",
        "name",
        "email",
        "phone",
        "year_of_study",
        "enrollment_id",
        "new_user",
        "created_at",
        "updated_at"
      ],
      /* include: [{
                model: db.public.images,
                attributes: ['image']
            }] */
    });
    return res.status(200).json({
      success: true,
      subjects: userData, // If null, front-end should show no current compaints
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
}