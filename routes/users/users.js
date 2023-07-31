const express = require("express");

const { findAllUsers, updateUser, findUser, deleteUser } = require("../../controllers/users/users");
const { verifyRoles } = require("../../middlewares/verifyRoles");
const { ROLES } = require("../../utils/constant");

const router = express.Router();

router.get("/", findAllUsers);
router.patch("/:userId", updateUser);
router.get("/:userId", findUser);
router.delete("/:userId", deleteUser);

module.exports = router;
