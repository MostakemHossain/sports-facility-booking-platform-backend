import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/routes";

// express
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// global error handler
app.use(globalErrorHandler);

export default app;
