import amqplib from "amqplib";
export class RabbitEventBus {
  private channel: any;
  constructor(channel: any){ this.channel = channel; }
  async publish(eventName: string, payload: any){
    const exchange = "domain_events";
    await this.channel.assertExchange(exchange, "topic", { durable: true });
    this.channel.publish(exchange, eventName, Buffer.from(JSON.stringify(payload)), { persistent: true });
  }
}
