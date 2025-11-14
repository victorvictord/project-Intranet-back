import amqp from "amqplib";
import { QueueMessageDTO } from "../../application/dto/QueueMessageDTO";
import { MessageReceivedEvent } from "../../domain/event/MessageRecievedEvents";
import { NotificationReceivedEvent } from "../../domain/event/NotificationRecievedEvent";
import { MessageHandler } from "../../application/handlers/MessageHandler";
import { NotificationHandler } from "../../application/handlers/NotificationHandler";
import { io } from "../web/socketServer";

export const startRabbitConsumer = async (
  messageHandler: MessageHandler,
  notificationHandler: NotificationHandler
) => {
  const conn = await amqp.connect("amqp://rabbitmq:5672");
  const channel = await conn.createChannel();

  const queues = ["messages_queue", "notifications_queue"];

  for (const q of queues) await channel.assertQueue(q);

  channel.consume("messages_queue", msg => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString()) as QueueMessageDTO;

    const result = messageHandler.handle(
      new MessageReceivedEvent(data)
    );

    io.emit("counter_update", result);
    channel.ack(msg);
  });

  channel.consume("notifications_queue", msg => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString()) as QueueMessageDTO;

    const result = notificationHandler.handle(
      new NotificationReceivedEvent(data)
    );

    io.emit("counter_update", result);
    channel.ack(msg);
  });

  console.log("RabbitMQ Consumers running...");
};