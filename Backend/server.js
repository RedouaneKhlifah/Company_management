import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/Db.js";
import UserRoutes from "./routes/UserRoutes.js";
import UserInputField from "./routes/UserInputFieldRoutes.js";
import EmploiRoutes from "./routes/EmploiRoutes.js";
import CompetenceRoutes from "./routes/CompetenceRoutes.js";
import ModuleRoutes from "./routes/ModuleRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS & EJS
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Using the cookie-parser middleware to parse cookies from incoming requests
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", UserRoutes);
app.use("/api/user-input-fields", UserInputField);
app.use("/api/emplois", EmploiRoutes);
app.use("/api/competence", CompetenceRoutes);
app.use("/api/module", ModuleRoutes);

// Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
