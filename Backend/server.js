import express from "express";
import dotenv from "dotenv";

dotenv.config();
import emploiRoute from "./routes/emploiRoute.js";



const port = process.env.PORT || 5000;

const app = express();

app.use('/api/emploi', emploiRoute);

app.listen(port, () => console.log(`Server started on port ${port}`));
