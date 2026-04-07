const {
  shortUrlService,
  decodeUrlService,
  signupService,
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

module.exports = {
  signup,
  shortUrl,
  decodeUrl,
};
