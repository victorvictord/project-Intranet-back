import amqplib, { Channel, Connection } from "amqplib";

export async function connectAmqpWithRetry(url = "amqp://guest:guest@rabbitmq:5672", retries = 10, delay = 2000) {
  let lastErr: any = null;
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await amqplib.connect(url);
      const ch: Channel = await conn.createChannel();
      return { conn, ch };
    } catch (err) {
      lastErr = err;
      console.log(`AMQP connect failed, retrying (${i + 1}/${retries})...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw lastErr;
}
