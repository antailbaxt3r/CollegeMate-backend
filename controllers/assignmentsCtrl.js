const db = require("../models/db");
const fetch = require("../functions/fetchFunc");
const uploader = require('cloudinary').uploader;
const dataUri = require('../functions/multer').dataUri;

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
        "assignment_title",
        "assignment_description",
        "image_path",
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

module.exports.createAssignment = async function (req, res) {
  try {
    // get request_body
    const assignment = req.body;
    // const images = req.body.images;
    //change code for user_id
    assignment.login_id = req.user.id;

    
    console.log('1:', assignment.login_id)
    console.log('2:', req.user.id)

    const newAssignment = await db.public.assignments
      .create(assignment, { returning: true })
      .then((assignmentData) => {
        const assignment_data = {
          assignment_title: assignmentData.assignment_title,
          assignment_desciption: assignmentData.assignment_description,
          course_name: assignmentData.course_name,
          assignment_id: assignmentData.assignment_id,
          date_due: assignmentData.date_due,
        };
        console.log("Assignment uploaded",assignment_data);
        return res.status(200).json({
          success: true,
          assignment: assignment_data,
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

module.exports.deleteAssignment = async function (req, res) {
    // get request_body
    const assignment_id = req.body.assignment_id;
    const id = req.user.id;
    // const images = req.body.images;
    //change code for user_id
    
    await db.public.assignments.destroy({ where: { assignment_id: assignment_id, login_id: id } }).then(() => {
      return res.status(200).json({
        msg: "Assignment deleted successfully.",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        msg: "Internal server error",
      });
    })
};

module.exports.uploadImage = (req,res)=>{
  console.log('req.body:', req.file)
  
  if(req.file){
    var file = dataUri(req).content;
    var assignment_id = BigInt(req.body.assignment_id);
    console.log("uploading..");
    return uploader.upload(file).then((result)=>{
      console.log("Image Uploaded:", result.url);

      return db.public.assignments.update({image_path: result.url},{where:{assignment_id:assignment_id}})
      
    }).then(()=>{
      console.log("Updating Image path..");

      return res.status(200).json({
        success:"true",
        msg: "Image received",
      })

    }).then(()=>{
      console.log("Image path updated Successfully!");
    }).catch((error)=>{
        console.log(error);
        return res.status(500).json({
          success:false,
          msg: error
        })
    })
  }
}
