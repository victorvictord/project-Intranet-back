import amqplib from "amqplib";
export class RabbitEventBus {
  private channel: any;
  constructor(channel: any){ this.channel = channel; }
  async publish(eventName: string, payload: any){
    const exchange = "domain_events";
    const queue = "messages.queue";
    const routingKeyMsg = "message.created";
    await this.channel.assertExchange(exchange, "topic", { durable: true });
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, exchange, routingKeyMsg);
    const ok = this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
    await this.channel.publish(exchange, eventName, Buffer.from(JSON.stringify(payload)), { persistent: true });
  }
}
