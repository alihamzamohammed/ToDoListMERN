const express = require("express");
const path = require("path");
const cors = require("cors");
const { connect } = require("./helper/db");
const app = express();

app.use(cors());

/**
 * Connect function called when mongoose establishes a database connection
 * @callback connect
 */
connect(() => {
  console.log("Connection established to database!");
  app.use(express.static(path.join(__dirname, "build")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const todoRoutes = require("./routes/todoRoutes");
  const categoryRoutes = require("./routes/categoryRoutes");

  app.use("/todo", todoRoutes);
  app.use("/category", categoryRoutes);

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
});

module.exports = app;
