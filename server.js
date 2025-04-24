import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
dotenv.config();

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

app.listen(PORT);
