import amqplib from "amqplib";
import createServer from "./interface/http/server";

async function start(){
    setTimeout(async ()=>{
  const conn = await amqplib.connect("amqp://rabbitmq:5672");
  const ch = await conn.createChannel();
  const app = createServer(ch);
  app.listen(4003, ()=> console.log("messageService on 4003"));
    }, 15000);
}
start().catch(e=>{console.error(e); process.exit(1);});
