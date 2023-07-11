import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/Db.js";
import UserRoutes from "./routes/UserRoutes.js";
import UserInputField from "./routes/UserInputFieldRoutes.js";
import CompetencesRoute from "./routes/CompetencesRoutes.js";
import EmploiRoute from "./routes/EmploiRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

// Using the cookie-parser middleware to parse cookies from incoming requests
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", UserRoutes);
app.use("/api/user-input-fields", UserInputField);
app.use("/api/competences", CompetencesRoute);
app.use("/api/emplois", EmploiRoute);

// Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
