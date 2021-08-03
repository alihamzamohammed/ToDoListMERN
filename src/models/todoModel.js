const { Schema, model } = require("mongoose");

/**
 * Mongoose Schema for Todo object
 */
const todoSchema = new Schema({
  title: String,
  content: String,
  completed: {
    type: Boolean,
    default: false,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

let Todo = model("Todo", todoSchema);

/**
 * Exports Mongoose model for Todo Schema
 */
module.exports = Todo;
