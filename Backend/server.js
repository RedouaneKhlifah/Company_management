import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import CompetenceRoutes from "./routes/CompetenceRoutes.js";
import ModuleRoutes from "./routes/ModuleRoutes.js";

dotenv.config();
connectDb();

const port = process.env.PORT || 5000;

const app = express();

// Using the cookie-parser middleware to parse cookies from incoming requests
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/competence", CompetenceRoutes);
app.use("/api/module", ModuleRoutes);

// Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
