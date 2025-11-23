import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/user.routes";
import messagesRoutes from "./routes/message.routes";
import { connectRabbit } from "./infra/rabbit";
import { listenNotifications } from "./events/notificationListener";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/messages", messagesRoutes);

const server = http.createServer(app);
export const io = new SocketServer(server, { cors: { origin: "*" } });

async function start() {
  const channel = await connectRabbit();
  listenNotifications(channel);

  server.listen(4000, () => console.log("BFF Server listening on 4000"));
}

start().catch(err => {
  console.error("Startup error", err);
  process.exit(1);
});
