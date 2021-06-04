const express = require('express');
const path = require('path');
const propertiesReader = require('properties-reader');


const app = express();
const properties = propertiesReader('settings.ini');

app.use(express.static(path.join(__dirname, 'build')));

var devicesRoute = require('./routes/todo');

app.use("devices", devicesRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.listen(5050);