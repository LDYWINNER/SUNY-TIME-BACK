const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const cors = require("cors");
const path = require('path');
// const mysql = require("mysql2");
// const db = require("./models/db");

app.use(cors(corsOptions));

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(express.json());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use(express.static(path.join(__dirname, 'frontend/build')));

// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'Dannie1102!*',
//     database: 'courseman',
//     // port: 8080,
//     socketPath: '/tmp/mysql.sock',
// });

// db.getConnection(err => {
//     if (err) {
//         console.log(err);
//     }
// });

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

port = process.env.PORT || 8080;
app.listen(port, () => { console.log(`listening to port ${port}`) });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});