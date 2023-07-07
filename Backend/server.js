import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/Db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

import emploiRoute from "./routes/emploiRoute.js";



connectDB();

const port = process.env.PORT || 5000;
const app = express();


app.use('/api/emploi', emploiRoute);

// Using the cookie-parser middleware to parse cookies from incoming requests
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Routes

// Middlewares
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server started on port ${port}`));
