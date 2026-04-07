const Joi = require("joi");

const signupValidation = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must not exceed 50 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  profile: Joi.string().allow("").optional().default("").messages({
    "string.uri": "Profile must be a valid URI",
    "string.base": "Profile must be a string",
  }),
  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "string.max": "Password must not exceed 20 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one number, and one special character",
      "any.required": "Password is required",
    }),
  confirmPassword: Joi.string()
    .min(6)
    .max(20)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.min": "Confirm password must be at least 6 characters long",
      "string.max": " Confirm Password must not exceed 20 characters",
      "string.pattern.base":
        " Confirm Password must contain at least one uppercase letter, one number, and one special character",
      "any.required": "Confirm Password is required",
    }),
});

const signinValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "string.max": "Password must not exceed 20 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one number, and one special character",
      "any.required": "Password is required",
    }),
});

const shortUrlValidation = Joi.object({
  baseUrl: Joi.string().required().messages({
    "any.required": "baseUrl is required",
  }),
  userId: Joi.string().allow("").optional().default(""),
  longUrl: Joi.string().required().messages({
    "any.required": "long url is required",
  }),
  customName: Joi.string().allow("").optional().default(""),
});

module.exports = {
  signupValidation,
  signinValidation,
  shortUrlValidation,
};
