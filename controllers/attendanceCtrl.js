const db = require("../models/db");
const { attendance } = require("../models/public/models");

module.exports.addAttendance = (req,res)=>{
    try{
        const id = req.user.id;
        const attendance = req.body;
        attendance.login_id = id;
        return db.public.attendance.create(attendance,{returning:true})
        .then((attendanceData)=>{
            const response = {
                date:attendanceData.date,
                is_present:attendanceData.is_present,
                subject_id:attendanceData.subject_id,
            }

            return res.status(500).json({
                success:true,
                attendace:response,
            })
        }).catch((err)=>{
            console.log(err);
            return res.status(500).json({
                success:false,
                msg:"Internal Server Error"
            })
        })

    }
    catch(err){
        console.log(err);
        return req.status(500).json({
            success:false,
            msg:"Internal Server Error",
        })
    }
}

module.exports.deleteAttendance = (req,res)=>{

    const id = req.user.id;
    const attendance_id = req.body.attendance_id;

    return db.public.attendance.destroy({where:{attendance_id:attendance_id, login_id:id}})
    .then(()=>{
        res.status(200).json({
            success:true,
            msg:"Attendance deleted",
        })
    }).catch((err)=>{
        console.log(err);
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error",
        })
    })
}

module.exports.getAttendance = (req, res)=>{
    const id = req.user.id;

    return db.public.attendance.findAll({where:{login_id:id},
    attributes:[
        "date",
        "is_present",
        "subject_id",
    ]})
    .then((attendanceData)=>{
        return res.status(200).json({
            success:true,
            attendace:attendanceData,
        })
    }).catch((err)=>{
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error",
        })
    })
}
    