import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors";
import errorHandlerMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";
import authRouter from "./routers/authRouter";
import bulletinPostRouter from "./routers/bulletinPostRouter";

const app: Application = express();
const logger = morgan("dev");

//middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(logger);
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bulletin", bulletinPostRouter);

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
