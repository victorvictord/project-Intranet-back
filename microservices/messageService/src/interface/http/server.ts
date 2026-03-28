import express from "express";
import bodyParser from "body-parser";
import { EventPublisher } from "../../infrastructure/eventPublisher";
import { CreateMessageUseCase } from "../../application/CreateMessageUserCase";
import { InMemoryMessageRepository } from "../../infrastructure/InMemoryMessageRepository";
import { RabbitEventBus } from "../../infrastructure/RabbitEventBus";
import { Channel } from "amqplib";
import { MessageModel } from "../../infra/mongo/Message";

export default function createServer(channel:Channel, exchange: string){

  const publisher = new EventPublisher(channel);
  publisher.init();
  const repo = new InMemoryMessageRepository();
  const eventBus = new RabbitEventBus(channel);
  const useCase = new CreateMessageUseCase(repo, eventBus);

  const app = express();
  app.use(bodyParser.json());

  app.post("/messages", async (req,res) => {
    const { authorId, content } = req.body;
    const message = new MessageModel({ _id: uuid(), authorId, content, createdAt: new Date() });
    await message.save();
    const payload = {
      id: message._id,
      authorId,
      content,
      createdAt: message.createdAt
    };

    channel.publish(exchange, "messages.created", Buffer.from(JSON.stringify(payload)), { persistent: true });

    res.json(payload);
  });

  app.get("/messages", async (_req,res) => {
    const list = await MessageModel.find().lean();
    res.json(list);
  });

  return app;
}

function uuid() {
  throw new Error("Function not implemented.");
}
