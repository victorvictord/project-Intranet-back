import amqplib from "amqplib";
import createServer from "./interface/http/server";
import { connectAmqpWithRetry } from "./infra/amqp";
import mongoose from "mongoose";

const MONGO = process.env.MONGO_URL || 'mongodb://mongo:27017/intranetdb'
async function start(){

  await mongoose.connect(MONGO);

  const { conn, ch } = await connectAmqpWithRetry("amqp://rabbitmq:5672");
  const exchange = process.env.EXCHANGE || "intranet";
  await ch.assertExchange(exchange, "message", { durable: true });

  const app = createServer(ch, exchange)
  app.listen(4003, ()=> console.log("messageService listening on port: 4003"));

}
start().catch(e=>{console.error(e); process.exit(1);});
