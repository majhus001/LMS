// adapters/storageAdapter.js
const cloudinary = require("cloudinary").v2;

// Configure (use env variables)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// 🔹 Abstract Interface (conceptual)
class StorageAdapter {
  async upload(file) {
    throw new Error("upload() must be implemented");
  }
}

// 🔹 Concrete Adapter
class CloudinaryAdapter extends StorageAdapter {
  async upload(file) {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });

    return result.secure_url;
  }
}

module.exports = new CloudinaryAdapter();