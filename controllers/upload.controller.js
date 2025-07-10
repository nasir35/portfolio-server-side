const { v4: uuidv4 } = require('uuid');
const cloudinary = require("../config/cloudinary.config");


exports.uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const uploadPromises = req.files.map(file =>
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            upload_preset: "product_images",
            public_id: `product_${uuidv4()}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(file.buffer);
      })
    );

    const results = await Promise.all(uploadPromises);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};