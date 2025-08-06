import express from 'express';
import authRoutes from './domains/auth/routes';
import { verifyToken } from './middleware/JWTMiddleware';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user?.email}`, userId: req.user?.id });
});


export default app;
