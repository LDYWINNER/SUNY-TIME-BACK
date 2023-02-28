import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors";

import path from "path";

import errorHandlerMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";
import authenticateUser from "./middleware/auth";

import authRouter from "./routers/authRouter";
import bulletinPostRouter from "./routers/bulletinPostRouter";

const app: Application = express();
const logger = morgan("dev");

//middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(logger);
}
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bulletin", authenticateUser, bulletinPostRouter);

//using frontend routes from build folder
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
