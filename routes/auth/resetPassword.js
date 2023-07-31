const express = require("express");
const { resetPassword } = require("../../controllers/auth/resetPassword");

const router = express.Router();

router.get("/:userId", resetPassword);

module.exports = router;
