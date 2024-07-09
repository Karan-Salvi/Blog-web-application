const express = require("express");
const { uploadOnCloudinary } = require("../services/cloudinary");
const Blog = require("../models/blog.model");
const upload = require("../middlewares/multer.js");
const {
  checkForAuthenticationCookies,
} = require("../middlewares/authentication.js");

const router = express.Router();

router.post("/addPost", upload.single("image"), async (req, res) => {
  console.log("body data are hear ::::::", req.body);

  console.log("SO the coooookies are ::::", req.cookies);

  const { title, body } = req.body;

  const imageUrl = await uploadOnCloudinary(req.file.path);

  console.log(" User is :;::::", req.user);

  const coverImageURL = imageUrl.url;

  Blog.create({
    title,
    body,
    coverImageURL,
    createdBy: req.user._id,
  });
  return res.status(201).json({
    message: "Blog is uploaded successfully",
  });
});

router.get("/posts", async (req, res) => {
  const blogs = await Blog.find();
  console.log("So the blogs are : ", blogs);
  return res.status(201).json({
    message: "Blog are fetched successfully",
    data: blogs,
    status: "1",
  });
});

module.exports = router;
