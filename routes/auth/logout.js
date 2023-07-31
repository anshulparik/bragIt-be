const express = require("express");
const { logout } = require("../../controllers/auth/logout");
const router = express.Router();

router.get("/", logout);

module.exports = router;
