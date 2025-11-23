export class Message {
  constructor(public id: string, public authorId: string, public content: string, public createdAt: string = new Date().toISOString()) {}
}