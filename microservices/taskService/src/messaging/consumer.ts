import { getChannel } from "./rabbit";

export const startConsumer = async () => {

  const channel = getChannel();

  const queue = await channel.assertQueue("", { exclusive: true });

  await channel.bindQueue(
    queue.queue,
    process.env.RABBITMQ_EXCHANGE!,
    ""
  );

  console.log("Esperando por los eventos...");

  channel.consume(queue.queue, (msg) => {

    if (!msg) return;

    const event = JSON.parse(msg.content.toString());

    console.log("Evento recibido:", event);

    channel.ack(msg);

  });

};