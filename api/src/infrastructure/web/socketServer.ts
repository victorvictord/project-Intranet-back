import { Server } from "socket.io";
import { httpServer } from "./httpServer";

export const io = new Server(httpServer, {
  cors: { origin: "*" }
});

io.on("connection", () => {
  console.log("Cliente conectado");
});