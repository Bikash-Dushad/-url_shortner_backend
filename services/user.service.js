const UserModel = require("../models/user.schema");
const ShortUrlModel = require("../models/shortUrl.schema");
const {
  signupValidation,
  shortUrlValidation,
} = require("../validators/user.validator");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/token.handler");

const signupService = async (payload) => {
  const { name, email, profile, password, confirmPassword } = payload;
  const { error } = signupValidation.validate(payload);
  if (error) {
    throw new Error(error.details[0].message);
  }
  const user = await UserModel.findOne({
    email: email,
    isActive: true,
    isDeleted: false,
  });
  if (user) {
    throw new Error("email already exists");
  }
  if (password !== confirmPassword) {
    throw new Error("Password and confirm password should be same");
  }
  const hashedPassowrd = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    name,
    email,
    password: hashedPassowrd,
    profile,
  });
  await newUser.save();

  const tokenPayload = {
    id: newUser._id,
  };
  let token = createToken(tokenPayload);

  return token;
};

const shortUrlService = async (payload) => {
  let { baseUrl, userId, longUrl, customName } = payload;

  const { error } = shortUrlValidation.validate(payload);
  if (error) {
    throw new Error(error.details[0].message);
  }
  let shortUrl;
  if (customName) {
    if (!userId) {
      throw new Error("Login first to provide custom name");
    }
    const findCustomNamedUrl = await ShortUrlModel.findOne({
      customName,
      isActive: true,
      isDeleted: false,
    });
    if (findCustomNamedUrl) {
      throw new Error("Url name already exists");
    }
    shortUrl = customName;
  }
  const nanoId = nanoid(16);

  const newUrl = new ShortUrlModel({
    user: userId || null,
    longUrl,
    shortUrl: shortUrl || nanoId,
    customName,
  });
  await newUrl.save();
  baseUrl = `/${shortUrl || nanoId}`;
  const data = {
    longUrl,
    shortUrl: baseUrl,
  };
  return data;
};

const decodeUrlService = async (shortUrl) => {
  if (!shortUrl) {
    throw new Error("short url is required");
  }
  const url = await ShortUrlModel.findOne({
    shortUrl,
    isActive: true,
    isDeleted: false,
  });
  if (!url) {
    throw new Error("url not found");
  }
  const longUrl = url.longUrl;
  return longUrl;
};

module.exports = {
  signupService,
  shortUrlService,
  decodeUrlService,
};
