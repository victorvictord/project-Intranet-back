import { Counter } from "../entities/Counter";

export class CounterService {
  constructor(private counter: Counter) {}

  handleMessage() {
    this.counter.incrementMessages();
    return this.counter.getState();
  }

  handleNotification() {
    this.counter.incrementNotifications();
    return this.counter.getState();
  }
}