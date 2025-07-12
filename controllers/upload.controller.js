const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../config/cloudinary.config");

exports.uploadMultipleImages = async (req, res) => {
  try {
    const projectName = req.body.projectName || "project";
    const getPublicId = (originalname, label) => {
      const ext = path.extname(originalname);
      return `${projectName}_${label}_${uuidv4()}${ext}`;
    };

    const thumbnailFile = req.files?.thumbnail?.[0];
    const galleryFiles = req.files?.gallery || [];

    if (!thumbnailFile && galleryFiles.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    // Upload thumbnail
    let thumbnailUrl = null;
    if (thumbnailFile) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              upload_preset: "portfolio_images",
              public_id: getPublicId(thumbnailFile.originalname, "thumbnail"),
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(thumbnailFile.buffer);
      });

      thumbnailUrl = result.secure_url;
    }

    // Upload gallery
    const galleryUploadPromises = galleryFiles.map((file, i) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              upload_preset: "portfolio_images",
              public_id: getPublicId(thumbnailFile.originalname, "thumbnail"),
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          )
          .end(file.buffer);
      });
    });

    const galleryUrls = await Promise.all(galleryUploadPromises);

    res.status(200).json({
      success: true,
      thumbnailUrl,
      galleryUrls,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
