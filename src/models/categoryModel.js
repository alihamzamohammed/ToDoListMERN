const Schema = require("mongoose").Schema;

const categorySchema = new Schema({
    name: String,
    dateAdded: {
        type: Date,
        default: Date.now
    },
    todos: {
        type: Schema.Types.ObjectId,
        ref: "Todo"
    }
});

module.exports = categorySchema;