import { Channel } from "amqplib";

export class EventPublisher {
  constructor(private channel: Channel, private exchange = "domain_events") {}

  async init() {
    await this.channel.assertExchange(this.exchange, "topic", { durable: true });
  }

  async publish(routingKey: string, payload: any) {
    const buffer = Buffer.from(JSON.stringify(payload));
    const exchange = "messages.exchange";
    const queue = "messages.queue";
    const routingKeyMsg = "message.created";
    // persistent para que sobreviva reinicios
    await this.channel.assertExchange(exchange,"topic", {durable: true});
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, exchange, routingKey);
    this.channel.publish(exchange, routingKeyMsg, buffer, { persistent: true });
  }
}
