import multer from "multer";
import path from "path";
import slugify from "slugify";

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Ensure this matches your path
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const originalName = path.parse(file.originalname).name;
    const extension = path.extname(file.originalname);
    const slugifiedName = slugify(originalName, { lower: true, strict: true });

    cb(null, `${timestamp}-${slugifiedName}${extension}`);
  },
});

// Configure multer to handle multiple fields
const upload = multer({ storage });

export const salonPicsUpload = upload.fields([
  { name: "coverImage", maxCount: 1 }, // Single cover image
  { name: "images", maxCount: 5 }, // Gallery images
]);


export default salonPicsUpload;
