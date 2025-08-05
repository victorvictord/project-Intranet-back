import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token+ '', JWT_SECRET) as any;
    req.user = { id: decoded.sub, email: decoded.email };
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}