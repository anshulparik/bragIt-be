const multer = require("multer");
const { checkFileType } = require("./helpers");

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/profilePics");
  },
  filename: (req, file, cb) => {
    const newFile = `${Date.now()}-${file.originalname}`;
    cb(null, newFile);
  },
});

const profileUpload = multer({
  storage: profileStorage,
  limits: { fieldSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|png|jpg/;
    checkFileType(filetypes, file, cb);
  },
}).single("profilePic");

const handleProfileUpload = async (req, res) => {
  return new Promise((resolve, reject) => {
    profileUpload(req, res, (error) => {
      if (error) {
        reject(error);
      }
      resolve({ file: req.file });
    });
  });
};

module.exports = {
  handleProfileUpload,
};
