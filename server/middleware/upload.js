// middleware/upload.js
// Configures multer for handling PDF uploads 
import multer from 'multer';


const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
    // only allow PDF files to be uploaded, rejects others
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') cb(null, true);
        else cb(new Error('Only PDF files are allowed'));
    },
});

export default upload;