const express = require("express");

const { createPost, updatePost, deletePost } = require("../../controllers/posts/posts");
const { verifyRoles } = require("../../middlewares/verifyRoles");
const { ROLES } = require("../../utils/constant");

const router = express.Router();

router.post('/:userId', createPost)
router.patch('/:postId', updatePost)
router.delete('/:postId', deletePost)

module.exports = router;
