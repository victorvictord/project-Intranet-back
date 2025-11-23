import { Request, Response } from "express";
import { UsersService } from "../services/users.service";

export const UsersController = {
  async getById(req: Request, res: Response) {
    try {
      const result = await UsersService.getById(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(_req: Request, res: Response) {
    try {
      const result = await UsersService.getAll();
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
};
