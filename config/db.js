const mongoose = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;

function connect(url) {
    mongoose.connect(url).then(_ => {
        console.log(`Connected to mongodb instance ${url}`);
        return true;
    }, (err) => {
        console.log(`Connection to mongodb instance ${url} failed, error: ${err}`);
        return false;
    });
}

const todoSchema = new Schema({
    title: String,
    content: String,
    completed: Boolean,
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

const categorySchema = new Schema({
    title: String
});

const Todo = mongoose.model("Todo", todoSchema);
const Category = mongoose.model("Category", categorySchema);