import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";

const app = express();
const logger = morgan("dev");
const corsOptions = {
    origin: "http://localhost:4000"
};

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry cant find that!");
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!!");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});


export default app;