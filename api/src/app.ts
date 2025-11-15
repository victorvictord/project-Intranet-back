import express from 'express';
import authRoutes from './domain/auth/routes';
import { verifyToken } from './middleware/JWTMiddleware';

// RabbitMQ Add

import { httpServer } from "./infrastructure/web/httpServer";
import { startRabbitConsumer } from "./infrastructure/rabbit/RabbitConsumer";
import { Counter } from "./domain/entities/Counter";
import { CounterService } from "./domain/services/CounterService";
import { MessageHandler } from "./application/handlers/MessageHandler";
import { NotificationHandler } from "./application/handlers/NotificationHandler";

const app = express();
app.use(express.json());

const counter = new Counter();
const counterService = new CounterService(counter);

const messageHandler = new MessageHandler(counterService);
const notificationHandler = new NotificationHandler(counterService);

startRabbitConsumer(messageHandler, notificationHandler);


app.use('/auth', authRoutes);
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user?.email}`, userId: req.user?.id });
});

app.listen(4000, () => {
  console.log("Backend DDD y Rabbit escuchando en 4000");
});

export default app;
