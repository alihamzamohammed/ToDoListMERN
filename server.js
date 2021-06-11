const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/todolist", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

var db = mongoose.connection;
db.on('error', err => {
  console.error(`An error occured in connecting: ${err}`);
  process.exit(1);
})

db.once('open', _ => {
  console.log("Connection established to database!");
  app.use(express.static(path.join(__dirname, 'build')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const todoRoutes = require('./routes/todoRoutes');
  const categoryRoutes = require('./routes/categoryRoutes');

  app.use("/todo", todoRoutes);
  app.use("/category", categoryRoutes);

  app.get("/testing", (req, res) => res.json({testing: "testing new"}))

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  });

  app.listen(5050);
})


