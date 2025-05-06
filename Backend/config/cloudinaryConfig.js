const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadBufferToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        console.error("Cloudinary Upload Error:", error); 
        return reject(error);
      }
      resolve(result);
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};