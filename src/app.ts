import express from "express";
import path from "path";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import authRoutes from "./routes/auth.route.ts";
import userRoutes from "./routes/user.route.ts";
import chatRoutes from "./routes/chat.route.ts";
import messageRoutes from "./routes/message.route.ts";
import { errorHandler } from "./middleware/errorHandler.ts";

const app = express();

const allowedOrigins = [
  "http://localhost:8081", 
  "http://localhost:5173", 
  process.env.FRONTEND_URL!, 
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => {
    res.send('API is running...');
})

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

export default app;