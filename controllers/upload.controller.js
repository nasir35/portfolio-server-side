const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../config/cloudinary.config");

exports.uploadMultipleImages = async (req, res) => {
  try {
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
              upload_preset: "product_images",
              public_id: `thumbnail_${uuidv4()}`,
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

    // Upload gallery images
    const galleryUploadPromises = galleryFiles.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              upload_preset: "product_images",
              public_id: `gallery_${uuidv4()}`,
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

    // Send response
    res.status(200).json({
      success: true,
      thumbnailUrl,
      galleryUrls,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
