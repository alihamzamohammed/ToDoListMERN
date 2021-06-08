const mongoose = require('mongoose');
const express = require('express');

function connect(url) {
    mongoose.connect(url).then(_ => {
        console.log(`Connected to mongodb instance ${url}`);
        return true;
    }, (err) => {
        console.log(`Connection to mongodb instance ${url} failed, error: ${err}`);
        return false;
    });
}