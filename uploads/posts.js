const multer = require("multer");
const { checkFileType } = require("./helpers");

const postStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/posts");
  },
  filename: (req, file, cb) => {
    const newFile = `${Date.now()}-${file.originalname}`;
    cb(null, newFile);
  },
});

const postUpload = multer({
  storage: postStorage,
  limits: { fieldSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|png|jpg|mp4/;
    checkFileType(filetypes, file, cb);
  },
}).array("posts", 5);

const handlePostUpload = async (req, res) => {
  return new Promise((resolve, reject) => {
    postUpload(req, res, (error) => {
      if (error) {
        reject(error);
      }
      resolve({ file: req.files });
    });
  });
};

module.exports = {
    handlePostUpload,
};
