import amqplib from "amqplib";
export async function connectRabbit() {
  const conn = await amqplib.connect("amqp://rabbitmq:5672");
  const channel = await conn.createChannel();
  console.log("BFF connected to RabbitMQ");
  return channel;
}
