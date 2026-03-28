import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbit = async () => {
  const connection = await amqp.connect("amqp://rabbitmqs");
  channel = await connection.createChannel();

  await channel.assertExchange("task_events", "fanout", {
    durable: false,
  });

  console.log("RabbitMQ conectado");
};

export const publishEvent = (event: string, payload: any) => {
  connectRabbit();
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }
  channel.publish(
    "task_events",
    "",
    Buffer.from(JSON.stringify({ event, payload }))
  );
};

export const getChannel = () => channel;
