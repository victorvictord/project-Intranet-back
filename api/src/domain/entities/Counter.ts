export class Counter {
  private messages = 0;
  private notifications = 0;

  incrementMessages() {
    this.messages++;
  }

  incrementNotifications() {
    this.notifications++;
  }

  getState() {
    return {
      messages: this.messages,
      notifications: this.notifications
    };
  }
}
