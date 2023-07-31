const express = require("express");

const {
  addProfilePic,
  generateProfilePicLink,
  viewProfilePic,
  deleteProfilePic,
} = require("../../controllers/profiles/profilePic");

const router = express.Router();

// add pic
router.post("/:userId", addProfilePic);
// generate-link
router.get("/generate-link/:userId", generateProfilePicLink);
// view pic
router.get("/view-file", viewProfilePic);
// delete pic
router.delete("/:userId", deleteProfilePic);

module.exports = router;
