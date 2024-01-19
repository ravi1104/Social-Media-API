import multer from 'multer';
import path from 'path';

import { customErrorHandler } from './errorHandler.js';

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("public", "images"));
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    },
});

const uploadFile = multer({
    storage: storageConfig,
});

const handleFileUpload = (req, res, next) => {
    uploadFile.single('image')(req, res, (err) => {
        if (err) {
            // Handle custom error 
            console.error('File upload error:', err);
            throw new customErrorHandler(500,"file upload failed");
        } else {
            // File upload succeeded, continue to the next middleware
            next();
        }
    });
};

export default handleFileUpload ;
