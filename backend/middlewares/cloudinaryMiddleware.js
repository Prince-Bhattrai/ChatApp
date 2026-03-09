import cloudinary from "../auth/cloudinaryAuth.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ChatAppReact",
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export default upload;