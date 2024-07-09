const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./Database/connectDB.js");
const userRoute = require("./routes/user.route.js");
const blogRoute = require("./routes/blog.route.js");
const cors = require("cors");
const dotenv = require("dotenv");
const {
  checkForAuthenticationCookies,
} = require("./middlewares/authentication.js");
dotenv.config({
  path: "./.env",
});

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(checkForAuthenticationCookies("uid"));

connectDB();

app.use("/api", userRoute);
app.use("/blog", blogRoute);

app.get("/", (req, res) => {
  return res.send("You are on HomePage");
});

app.listen(PORT, () => {
  console.log("Server is running on Port : " + PORT);
});
