import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./infrastructure/db";



import commandRoutes from "./commands/routes/taskCommandRoutes";
import queryRoutes from "./commands/routes/taskQueryRoutes";

import "./events/projections";
import { connectRabbit } from "./messaging/rabbit";
import { startConsumer } from "./messaging/consumer";

dotenv.config();

const start = async() => {

await connectRabbit();

await startConsumer();

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