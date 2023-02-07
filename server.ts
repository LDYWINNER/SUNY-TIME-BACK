import express from "express";
import morgan from "morgan";
import errorHandlerMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";

const app = express();
const logger = morgan("dev");

//middlewares
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
