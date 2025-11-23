import { io } from "../server";
export function listenNotifications(channel: any) {
  const q = "notifications.new";
  channel.assertQueue(q);
  channel.consume(q, (msg: any) => {
    const payload = JSON.parse(msg.content.toString());
    io.emit("notification:new", payload);
    channel.ack(msg);
  });
  console.log("BFF listening notifications.new");
}
