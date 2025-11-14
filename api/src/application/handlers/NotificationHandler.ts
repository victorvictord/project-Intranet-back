import { CounterService } from "../../domain/services/CounterService";
import { NotificationReceivedEvent } from "../../domain/event/NotificationRecievedEvent";

export class NotificationHandler {
  constructor(private counterService: CounterService) {}

  handle(event: NotificationReceivedEvent) {
    return this.counterService.handleNotification();
  }
}