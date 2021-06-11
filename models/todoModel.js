const Schema = require("mongoose").Schema;

const todoSchema = new Schema({
    title: String,
    content: String,
    completed: {
        type: Boolean,
        default: false
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
});

module.exports = todoSchema;
