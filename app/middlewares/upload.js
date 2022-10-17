const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}` + file.originalname.slice(-4));
  },
});

const upload = multer({ storage: fileStorageEngine }).single('image');

module.exports = upload;
