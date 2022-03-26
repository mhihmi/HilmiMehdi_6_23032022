// import de Multer
const multer = require('multer');

const MIME_TYPES = { // File Ext Dictionary
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({ // multer storage setup
    destination: (req, file, callback) => { // save folder dest
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // replace space by underscore
        const extension = MIME_TYPES[file.mimetype]; // possible extensions
        callback(null, name + Date.now() + '.' + extension); // unique file with timestamp
    }
});

// Export Multer Middleware - single() => unique file
module.exports = multer({ storage }).single('image');