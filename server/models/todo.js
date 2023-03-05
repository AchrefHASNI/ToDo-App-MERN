//import mongoose  and  create  schema

const mongoose = require('mongoose');

const toDoItems = new mongoose.Schema({

    item: {
        type: String,

        required: true
    },
    statue: {
        type: ["todo", "doing", "done"],
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('ToDo', toDoItems);