const express = require("express");
const UserRouter = express.Router();
const {
  shortUrl,
  decodeUrl,
  signup,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

UserRouter.post("/signup", signup);
UserRouter.post("/short-url", authMiddleware, shortUrl);
UserRouter.get("/:shortUrl", decodeUrl);

module.exports = UserRouter;
