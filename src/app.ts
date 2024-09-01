import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

// express
const app = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: "https://sports-edge.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
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
