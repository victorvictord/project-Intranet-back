import { Message } from "../domain/entities/Message";
import { v4 as uuid } from "uuid";

export class CreateMessageUseCase {
  constructor(private repo: any, private eventBus: any) {}
  async execute({ authorId, content }: {authorId:string, content:string}) {
    const msg = new Message(uuid(), authorId, content);
    await this.repo.save(msg);
    await this.eventBus.publish("messages.created", msg);
    return msg;
  }
}