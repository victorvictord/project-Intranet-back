export interface QueueMessageDTO {
  type: "message" | "notification";
  data: any;
}