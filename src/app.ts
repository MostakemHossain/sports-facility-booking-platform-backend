import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

// express
const app = express();

// parsers
app.use(express.json());
app.use(cors());

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
