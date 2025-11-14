import { CounterService } from "../../domain/services/CounterService";
import { MessageReceivedEvent } from "../../domain/event/MessageRecievedEvents";

export class MessageHandler {
  constructor(private counterService: CounterService) {}

  handle(event: MessageReceivedEvent) {
    return this.counterService.handleMessage();
  }
}