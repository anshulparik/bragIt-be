const path = require("path");
const jwt = require("jsonwebtoken");

const Profile = require("../../models/Profile");
const { createError } = require("../../errors/Error");
const { handleProfileUpload } = require("../../uploads/profilePic");
const { TOKEN_TYPE } = require("../../utils/constant");
const { generateToken } = require("../../utils/token");
const { unlink } = require("fs/promises");

const addProfilePic = async (req, res, next) => {
  try {
    const { userId } = req?.params;
    if (!userId) {
      const err = createError(400, "UserId is required!");
      next(err);
      return;
    }

    const foundProfile = await Profile.findOne({ user: userId });
    if (!foundProfile) {
      const err = createError(404, "User doesn't exist!");
      next(err);
      return;
    }

    const uploadedFile = await handleProfileUpload(req, res);

    if (!uploadedFile?.file) {
      const err = createError(400, "Please select an image!");
      next(err);
      return;
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      foundProfile?._id,
      { profilePic: uploadedFile?.file?.filename },
      { new: true }
    );

    res.status(201).send(updatedProfile);
  } catch (error) {
    let err;
    if (typeof error === "string") {
      err = createError(400, error);
    } else {
      err = createError(500, error.message);
    }
    next(err);
  }
};

const generateProfilePicLink = (req, res, next) => {
  try {
    const { userId } = req?.params;
    const action = req?.query?.action;
    const user = { id: userId };
    if (!userId) {
      const err = createError(400, "UserId is required!");
      next(err);
      return;
    }
    const token = generateToken(
      user,
      TOKEN_TYPE.LINK,
      process.env.LINK_TOKEN_SECRET,
      process.env.LINK_TOKEN_EXPIRY
    );

    const url = `${req.protocol}://${req.hostname}:${process.env.PORT}/profilePic/view-file?token=${token}&action=${action}`;
    res.status(200).send({ url });
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

const viewProfilePic = async (req, res, next) => {
  try {
    const { action, token } = req.query;

    jwt.verify(token, process.env.LINK_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        const error = createError(403, "Forbidden!");
        next(error);
        return;
      }
      if (decoded) {
        const { user } = decoded;
        const foundProfile = await Profile.findOne({ user: user?.id });
        if (!foundProfile) {
          const error = createError(404, "User not found!");
          next(error);
          return;
        }

        const filePath = path.resolve(
          __dirname,
          "../public/profilePics",
          foundProfile?.profilePic
        );

        if (action === "view") {
          res.sendFile(filePath);
          return;
        } else if (action === "download") {
          res.download(filePath);
          return;
        } else {
          const err = createError(400, "Invalid action type!");
          next(err);
          return;
        }
      }
    });
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

const deleteProfilePic = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      const err = createError(400, "UserId is required!");
      next(err);
      return;
    }

    const foundProfile = await Profile.findOne({ user: userId });
    if (!foundProfile) {
      const error = createError(404, "User doesn't exist!");
      next(error);
      return;
    }

    const filePath = path.resolve(
      __dirname,
      "../public/profilePics",
      foundProfile?.profilePic
    );

    const updatedProfile = await Profile.findByIdAndUpdate(
      foundProfile?._id,
      { profilePic: "" },
      { new: true }
    );

    await unlink(filePath);
    res.status(200).send(updatedProfile);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

module.exports = {
  addProfilePic,
  generateProfilePicLink,
  viewProfilePic,
  deleteProfilePic,
};
