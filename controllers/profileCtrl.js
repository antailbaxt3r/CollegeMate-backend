const db = require("../models/db");
const fetch = require('../functions/fetchFunc')

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
      profile: userData, // If null, front-end should show no current compaints
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
}

module.exports.update = async (req, res) => {
    try {
        // console.log(process.env.PORT);
        const id = req.user.id;
        const update = req.body;
        // console.log(update);
        if (!update) {
            return res.status(400).json({
                success: false,
                error: 'Update body missing.'
            })
        }

        const updateduser = await db.public.login.update(update, { where: { id: id}, returning: true });
        return res.status(200).json({
            success: true,
            user: fetch.include(updateduser[1][0], [
                "id",
                "name",
                "email",
                "phone",
                "year_of_study",
                "enrollment_id",
                "new_user",
                "created_at",
                "updated_at"
            ])
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}