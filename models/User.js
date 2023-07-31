const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "E-mail is required!"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Password is required!"],
      // select: false,
    },
    role: {
      type: String,
      enum: ["editor", "admin", "user"],
      default: "user",
    },
    refreshToken: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
