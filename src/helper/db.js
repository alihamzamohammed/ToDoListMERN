const mongoose = require("mongoose");

const envConfigs = require("./config");
const env = process.env.NODE_ENV || "development";

const config = envConfigs[env];

let connect = (onConnection) => {
  mongoose.Promise = global.Promise;

  mongoose.connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.set("debug", (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
  });

  var db = mongoose.connection;

  db.on("error", (err) => {
    console.error(`An error occured in connecting: ${err}`);
    process.exit(1);
  });

  if (onConnection) {
    db.once("open", onConnection);
  }
};

let disconnect = (onDisconnect) => {
  mongoose.disconnect();
  if (onDisconnect) {
    mongoose.connection.on("disconnected", onDisconnect);
  }
};

module.exports = { connect, disconnect };
