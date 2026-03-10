import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./infrastructure/db";

import commandRoutes from "./commands/routes/projectCommandRoutes";
import queryRoutes from "./queries/routes/projectQueryRoutes";

dotenv.config();

const start = async() => {

await connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/commands", commandRoutes);
app.use("/queries", queryRoutes);

app.listen(4004, () => {
  console.log("CQRS Task Service running");
});

};

start();