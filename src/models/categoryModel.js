const { Schema, model } = require("mongoose");

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

module.exports = Category;
