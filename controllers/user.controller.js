const {
  shortUrlService,
  decodeUrlService,
  signupService,
  signinService,
  myUrlsService,
  myProfileService,
} = require("../services/user.service");

const signup = async (req, res) => {
  try {
    const payload = req.body;
    const data = await signupService(payload);
    return res.status(200).json({
      responseCode: 200,
      message: "Signup successfull",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      responseCode: 500,
      message: "server error",
      error: error.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const payload = req.body;
    const data = await signinService(payload);
    return res.status(200).json({
      responseCode: 200,
      message: "Signin successfull",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      responseCode: 500,
      message: "server error",
      error: error.message,
    });
  }
};

const shortUrl = async (req, res) => {
  try {
    const payload = req.body;
    const userId = req.user?.id;
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    payload.baseUrl = baseUrl;
    payload.userId = userId;
    const data = await shortUrlService(payload);
    return res.status(200).json({
      responseCode: 200,
      message: "Url shortned successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      responseCode: 500,
      message: "Server error",
      data: error.message,
    });
  }
};

const decodeUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const data = await decodeUrlService(shortUrl);
    return res.redirect(data);
  } catch (error) {
    return res.status(500).json({
      responseCode: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

const myUrls = async (req, res) => {
  try {
    const userId = req.user?.id;
    const data = await myUrlsService(userId);
    return res.status(200).json({
      responseCode: 200,
      message: "Urls fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      responseCode: 500,
      message: "Server error",
      error: error,
    });
  }
};

const myProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await myProfileService(userId);
    return res.status(200).json({
      responseCode: 200,
      message: "Profile fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      responseCode: 500,
      message: "Server error",
      error: error,
    });
  }
};

module.exports = {
  signup,
  signin,
  shortUrl,
  decodeUrl,
  myUrls,
  myProfile,
};
