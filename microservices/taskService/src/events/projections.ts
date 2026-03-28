import { getChannel } from "../messaging/rabbit";
import Task from "../commands/models/Task";

export const startTaskProjection = async () => {
  const channel = getChannel();

  const q = await channel.assertQueue("", { exclusive: true });

  channel.bindQueue(q.queue, "task_events", "");

  channel.consume(q.queue, async (msg) => {
    if (!msg) return;

    const { event, payload } = JSON.parse(msg.content.toString());

    if (event === "TASK_CREATED") {
      await Task.create({
        _id: payload._id,
        title: payload.title,
        status: payload.status,
        priority: payload.priority,
      });
    }

    if (event === "TASK_UPDATED") {
      await Task.findOneAndUpdate(
        { _id: payload._id },
        { status: payload.status }
      );
    }

    channel.ack(msg);
  });

  console.log("Projection escuchando eventos...");
};
