const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();
console.log("Environment Variables:", {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary Configured with Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME); 
console.log("Cloudinary Configured with API Key:", process.env.CLOUDINARY_API_KEY); 
console.log("Cloudinary Configured with API Secret:", process.env.CLOUDINARY_API_SECRET); 

exports.uploadBufferToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        console.error("Cloudinary Upload Error:", error); // Log the error
        return reject(error);
      }
      resolve(result);
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};