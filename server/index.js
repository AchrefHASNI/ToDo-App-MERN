const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5500;

app.use(cors())

mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const toDoItemRoute = require('./routes/todo')

app.listen(PORT, () => console.log(`Server successfuly connected on ${PORT}`));

app.use('/', toDoItemRoute);