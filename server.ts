import express, { Application } from "express";
import morgan from "morgan";
import errorHandlerMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";
import authRouter from "./routers/authRouter";
import bulletinPostRouter from "./routers/bulletinPostRouter";

const app: Application = express();
const logger = morgan("dev");

//middlewares
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//routers
app.get("/", (req, res) => {
  res.send("welcome");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bulletin", bulletinPostRouter);

export default app;
