import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import ProjectController from '../controllers/Project.js';

const router = express.Router();

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads/projects/');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`📁 Created upload directory: ${uploadDir}`);
}

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `project-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Error: Images Only!'));
    }
  }
});

// Get all projects
router.get('/', ProjectController.getAllProjects);

// Get projects by category
router.get('/category/:category', ProjectController.getProjectsByCategory);

// Get a single project by ID
router.get('/:id', ProjectController.getProjectById);

// Create a new project
router.post('/', upload.single('image'), ProjectController.createProject);

// Update a project
router.put('/:id', upload.single('image'), ProjectController.updateProject);

// Delete a project
router.delete('/:id', ProjectController.deleteProject);

export default router;
