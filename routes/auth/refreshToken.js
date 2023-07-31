const express = require("express");
const { refreshToken } = require("../../controllers/auth/refreshToken");

const router = express.Router();

router.get("/", refreshToken);

module.exports = router;
