const mongoose = require("mongoose");

const envConfigs = require("./config");
const env = process.env.NODE_ENV || "development";

const config = envConfigs[env];

/**
 * Helper function to connect to MongoDB database
 *
 * @param {connect} onConnection
 * @returns {Promise} Resolved promise to indicate successful database connection
 */
let connect = (onConnection) => {
  mongoose.Promise = global.Promise;

  mongoose.connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  if (env === "development") {
    mongoose.set("debug", (collectionName, method, query, doc) => {
      console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
    });
  }

  var db = mongoose.connection;

  db.on("error", (err) => {
    console.error(`An error occured in connecting: ${err}`);
    process.exit(1);
  });

  if (onConnection) {
    db.once("open", onConnection);
    return Promise.resolve();
  }
};

/**
 * Helper function to disconnect from MongoDB database
 *
 * @param {disconnect} onDisconnect
 * @returns {Promise} Resolved promise to indicate successful database dicsonnection
 */
let disconnect = (onDisconnect) => {
  mongoose.disconnect();
  if (onDisconnect) {
    mongoose.connection.on("disconnected", onDisconnect);
    return Promise.resolve();
  }
};

module.exports = { connect, disconnect };
