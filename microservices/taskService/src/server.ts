import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./infrastructure/db";

import commandRoutes from "./commands/routes/taskCommandRoutes";
import queryRoutes from "./commands/routes/taskQueryRoutes";

import "./events/projections";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/commands", commandRoutes);
app.use("/queries", queryRoutes);

app.listen(4000, () => {
  console.log("CQRS Task Service running");
});
