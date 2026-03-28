import { timeStamp } from "node:console";
import { getChannel } from "./rabbit";

export const publishEvent = async (event: string, payload: any) => {
    const channel = getChannel();

    const message = {
        event,
        payload,
        timestamp: new Date(),
    };

    channel.publish(
        process.env.RABBITMQ_EXCHANGE!,
        "",
        Buffer.from(JSON.stringify(message))
    );

    console.log("Event published:", event);
};