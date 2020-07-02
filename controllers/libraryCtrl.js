const db = require('../models/db')
const uploader = require('cloudinary').uploader;
const dataUri = require('../functions/multer').dataUri;

module.exports.getLibrary = async(req,res)=>{
    try{

        const id = req.user.id;

        const libraryData = await db.public.library.findAll({
            where:{login_id:id},
            attributes:[
                'path',
                'name',
                'description',
                'created_by'
            ]
        });

        return res.status(200).json({
            success:true,
            files: libraryData,
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            msg:"Internal server error"
        })
    }
}

module.exports.addFile = (req,res)=>{

    if(req.file){
        const fileData =req.body;
        fileData.login_id = req.user.id;

        var file = dataUri(req).content;
        var fileURL = ""
        console.log("uploading...");

        return uploader.upload(file).then((result)=>{
            console.log("File Uploaded", result.url);
            fileURL = result.url;
            fileData.path = result.url;
            return db.public.library
            .create(fileData,{returning:true})
        }).then((data)=>{
                return res.status(200).json(data);
        }).catch((err)=>{
            console.log(err);
            return res.status(500).json({
                success:false,
                msg:err
            })
        })
    }else{

    }
}