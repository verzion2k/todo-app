// server/src/app.ts
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { todosRouter } from "./routes/todos";

export const app = express();

// 1) Enable CORS for your front-end origin (or '*' during development)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true, // if you ever need cookies/auth
  })
);

// 2) Body parser
app.use(json());

// 3) Your routes
app.use("/todos", todosRouter);

// 4) Error handler
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
);
