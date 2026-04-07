const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: "",
    },
    profile: {
      type: String,
      default: "",
    },
    google: {
      googleId: {
        type: String,
        default: "",
      },
      isLoggedIn: {
        type: Boolean,
        default: false,
      },
    },
    github: {
      githubId: {
        type: String,
        default: "",
      },
      isLoggedIn: {
        type: Boolean,
        default: false,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ "google.googleId": 1 }, { sparse: true });
userSchema.index({ "github.githubId": 1 }, { sparse: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
