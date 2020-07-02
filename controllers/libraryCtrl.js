const db = require('../models/db')
const uploader = require('cloudinary').uploader;
const dataUri = require('../functions/multer').dataUri;

const cloudinary = require('cloudinary');


module.exports.getLibrary = async(req,res)=>{
    try{

        const id = req.user.id;

        const libraryData = await db.public.library.findAll({
            where:{login_id:id},
            attributes:[
                'file_id',
                'public_id',
                'path',
                'name',
                'description',
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

        //Setting name of the file if not provided by the user
        if(fileData.name == null){
            fileData.name = req.file.originalname;
        }

        var file = dataUri(req).content;
        var fileURL = ""
        console.log("uploading...");

        return uploader.upload(file).then((result)=>{
            console.log("File Uploaded", result);
            fileURL = result.url;
            fileData.path = result.url;
            fileData.public_id = result.public_id;
            console.log(fileData);
            return db.public.library
            .create(fileData,{returning:true})
        }).then((data)=>{
                const file_data = {
                    path:data.path,
                    description:data.description,
                    name:data.name,
                }
                return res.status(200).json(file_data);
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

module.exports.deleteFile = async (req,res)=>{
    const id = req.user.id;
    const file_id = req.body.file_id;
    const public_id = req.body.public_id;

    return cloudinary.v2.api.delete_derived_resources([public_id])
    .then(()=>{
        return db.public.library.destroy({where:{file_id:file_id, login_id:id}})
    }).then(()=>{
        return res.status(200).json({
            success:true,
            msg:"Deleted successfully",
        })
    }).catch((err)=>{
        console.log(err);

        return res.json({
            success:false,
            msg:"Internal Server Error",
        })
    })
    
}