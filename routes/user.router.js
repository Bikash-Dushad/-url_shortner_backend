const express = require("express");
const UserRouter = express.Router();
const {
  shortUrl,
  decodeUrl,
  signup,
  signin,
  myUrls,
  myProfile,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

UserRouter.post("/signup", signup);
UserRouter.post("/signin", signin);
UserRouter.post("/short-url", authMiddleware, shortUrl);
UserRouter.get("/myurls", authMiddleware, myUrls);
UserRouter.get("/my-profile", authMiddleware, myProfile);
UserRouter.get("/:shortUrl", decodeUrl);

module.exports = UserRouter;
