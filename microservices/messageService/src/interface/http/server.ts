import express from "express";
import bodyParser from "body-parser";
import { EventPublisher } from "../../infrastructure/eventPublisher";
import { CreateMessageUseCase } from "../../application/CreateMessageUserCase";
import { InMemoryMessageRepository } from "../../infrastructure/InMemoryMessageRepository";
import { RabbitEventBus } from "../../infrastructure/RabbitEventBus";

export default function createServer(channel:any){

  const publisher = new EventPublisher(channel);
  publisher.init();
  const repo = new InMemoryMessageRepository();
  const eventBus = new RabbitEventBus(channel);
  const useCase = new CreateMessageUseCase(repo, eventBus);

  const app = express();
  app.use(bodyParser.json());

  app.post("/messages", async (req,res) => {
    const { authorId, content } = req.body;
    const msg = await useCase.execute({ authorId, content });
    res.json(msg);
  });

  app.get("/messages", async (_req,res) => {
    res.json(await repo.list());
  });

  return app;
}