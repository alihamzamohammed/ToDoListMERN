const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/todolist", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(_ => {
  console.log("Connected")
  console.log(mongoose.connection.readyState);
})
  .catch((error) => console.log(`An error occured: ${error}`));


app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const todoRoutes = require('./routes/todoRoutes');

app.use("/todo", todoRoutes);

app.get("/testing", (req, res) => res.json({testing: "testing new"}))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.listen(5050);