import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT;

app.use("/home", (req, res) => {
  res.render("home");
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/landingpage", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "landingpage.html"));
});

//Auth Routes
import authRoutes from "./routes/authRoutes.js";
app.use("/auth", authRoutes);

//Call Routes
import callRoutes from "./routes/callRoutes.js";
app.use("/call", callRoutes);

//User Routes
import userRoutes from "./routes/userRoutes.js";
app.use("/user", userRoutes);

// app.get("/test-cookie", (req, res) => {
//   console.log("Cookies:", req.cookies); // 🔍 This should log your JWT token
//   res.send("Check your console for cookies.");
// });

app.listen(PORT);
