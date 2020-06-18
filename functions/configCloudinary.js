const config = require('../config/config').cloudinary
const cloudinary = require('cloudinary');

module.exports = (req,res,next)=>{
    cloudinary.config(config);
    next();
}