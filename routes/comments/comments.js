const express = require("express");

const { createComment, updateComment } = require("../../controllers/comments/comment");
const { verifyRoles } = require("../../middlewares/verifyRoles");
const { ROLES } = require("../../utils/constant");

const router = express.Router();

router.post("/:postId", createComment);
router.patch("/:commentId", updateComment);

module.exports = router;
