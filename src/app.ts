import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

// express
const app = express();

// parsers
app.use(express.json());
app.use(
  cors({
    // origin: "https://sports-edge.vercel.app",
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  // res.header("Access-Control-Allow-Origin", "https://sports-edge.vercel.app");
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
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

app.use(cookieParser());

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Sports facility Booking platform........",
  });
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
