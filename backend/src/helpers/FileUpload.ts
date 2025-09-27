import fs from "fs";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileFilter } from "./FileFilter";
import { slugify } from "../utils/slugify";



const uploadDir = path.join(process.cwd(), "uploads");

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// local file storage
export const createStorage = (folder?: string) => {
  const uploadFolder = folder
    ? path.join(process.cwd(), "uploads", folder)
    : path.join(process.cwd(), "uploads");

  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${uuidv4()}-${Date.now()}`;
      const fileExtension = path.extname(file.originalname);

      const slugifiedName = slugify(
        path.basename(file.originalname, fileExtension)
      );

      const fileName = `${slugifiedName}-${uniqueSuffix}${fileExtension}`;

      cb(null, fileName);
    },
  });
};

export const upload = multer({
  storage: createStorage(),
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB in bytes
  },
});


