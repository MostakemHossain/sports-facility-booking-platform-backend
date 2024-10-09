import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

// express
const app = express();

// Allowed origins for development and production
const allowedOrigins = [
  "https://sports-edge.vercel.app",
  "http://localhost:5173",
];

// parsers
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// CORS headers for preflight requests
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  next();
});

// Cookie parser middleware
app.use(cookieParser());

// Application routes
app.use("/api", router);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Sports facility Booking platform........",
  });
});

// Global error handler middleware
app.use(globalErrorHandler);

// Not found route handler
app.use(notFound);

export default app;
