import { Request, Response } from "express";
import { MessagesService } from "../services/messages.service";

export const MessagesController = {
  async list(_req: Request, res: Response) {
    try {
      const result = await MessagesService.list();
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const result = await MessagesService.create(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
};
