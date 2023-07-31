const express = require("express");
require("dotenv").config();

// const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dbConnect = require("./db/db");
const {
  errorHandler,
  notFoundHandler,
} = require("./middlewares/errorHandlers");

const registerRoutes = require("./routes/auth/register");
const loginRoutes = require("./routes/auth/login");
const refreshRoutes = require("./routes/auth/refreshToken");
const logoutRoutes = require("./routes/auth/logout");
const userRoutes = require("./routes/users/users");
const postRoutes = require("./routes/posts/posts");
const commentRoutes = require("./routes/comments/comments");
const profileRoutes = require("./routes/profiles/profiles");
const profilePicRoutes = require("./routes/profiles/profilePic");
const resetPasswordRoutes = require("./routes/auth/resetPassword");

const { corsOptions } = require("./utils/corsOption");
const { credentials } = require("./middlewares/credentials");
const { verifyToken } = require("./middlewares/verifyToken");

const app = express();

const PORT = process.env.PORT || 8000;
const DB_STRING = process.env.MONGO_URI;

// middlewares

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
app.use(cors(corsOptions));

// parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for cookies
app.use(cookieParser());

// serve static files
// app.use('/', express.static(path.join(__dirname, '/public/profilePics')));

// routes
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/refresh", refreshRoutes);
app.use("/resetPassword", resetPasswordRoutes);

app.use(verifyToken);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/profiles", profileRoutes);
app.use("/profilePic", profilePicRoutes);
app.use("/logout", logoutRoutes);

// errors
app.all("*", notFoundHandler);
app.use(errorHandler);

const bootStrap = async () => {
  try {
    await dbConnect(DB_STRING);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("Couldn't start the server!", error);
    process.exit();
  }
};

bootStrap();
