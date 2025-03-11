import express from "express";
import multer from "multer";
import {
  getAbout,
  createAbout,
  updateAbout,
  deleteAbout,
  uploadImage,
} from "../controllers/About.js";

const router = express.Router();

// Multer for Image Upload
const storage = multer.diskStorage({
  destination: "./images/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/", getAbout);
router.post("/", createAbout);
router.put("/:id", updateAbout);
router.delete("/:id", deleteAbout);
router.post("/upload", upload.single("image"), uploadImage);

export default router;
