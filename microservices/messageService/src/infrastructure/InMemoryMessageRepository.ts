export class InMemoryMessageRepository {
  private items: any[] = [];
  async save(msg: any){ this.items.push(msg); return msg; }
  async list(){ return this.items; }
}