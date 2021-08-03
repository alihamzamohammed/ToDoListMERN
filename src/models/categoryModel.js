const { Schema, model } = require("mongoose");

/**
 * Mongoose schema for Category object
 */
const categorySchema = new Schema({
  name: String,
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  todos: {
    type: Schema.Types.ObjectId,
    ref: "Todo",
  },
});

let Category = model("Category", categorySchema);

/**
 * Exports Moongoose model for Category schema
 */
module.exports = Category;
