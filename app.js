const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const createConnection = require('./server/database/connection');

const app = express();

dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 8080;

// Morgan is used for logging requests
app.use(morgan('tiny'));

// Body-parser is used to parse request
app.use(bodyparser.urlencoded({extended: true}));

createConnection();

// Set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"));

// Load the assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));

app.use("/", require("./server/routes/router"));

app.listen(3000, () => {
    console.log(`Inventory Management System is running on http://localhost:${PORT}`);
});