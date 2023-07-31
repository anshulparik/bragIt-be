const express = require("express");

const {
  addProfile,
  sendFollowRequest,
  sendUnfollowRequest,
  acceptFollowRequest,
  cancelFollowRequest,
} = require("../../controllers/profiles/profiles");

const router = express.Router();

router.post("/:userId", addProfile);
router.post("/follow/:followerId", sendFollowRequest);
router.post("/unfollow/:followerId", sendUnfollowRequest);
router.post("/accept/:followeeId", acceptFollowRequest);
router.post("/cancel/:followeeId", cancelFollowRequest);

module.exports = router;
