const nodemailer = require("nodemailer");

const User = require("../../models/User");
const resetPasswordTemplate = require("../../mail/resetPassword");
const { createError } = require("../../errors/Error");

const resetPassword = async (req, res, next) => {
  try {
    const { userId } = req?.params;
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      const err = createError(404, "User not found!");
      next(err);
      return;
    }

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "anshul.parikh@tru.agency",
        pass: "dnjsbrbypqbbirtb",
      },
    });

    const mail = {
      from: "anshul.parikh@tru.agency",
      to: "poonam@tru.agency",
      subject: "Here is the subject!",
      text: "Hello from the other side!",
      html: resetPasswordTemplate,
    };

    await transport.sendMail(mail);
    res.status(200).send("Mail send!");
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

module.exports = { resetPassword };
