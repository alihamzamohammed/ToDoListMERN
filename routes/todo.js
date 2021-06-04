const express = require('express');
const db = require('../config/db');

const router = express.Router();


router.get('/read', (req, res) => {
    db.Todo.find((err, todoAll) => {
        if (err) {
            console.error(`No todos in database, error: ${err}`);
            res.status(404).send(false);
        } else {
            console.log(`Todos found!`);
            res.status(200).send(todoAll);
        }
    })
});

router.get("/read/:id", (req, res) => {
    db.Todo.findById(req.id, (err, todoRead) => {
        if (err) {
            console.error(`Todo ${req.id} wasn't found, error: ${err}`);
            res.status(404).send(false);
        } else {
            console.log(`Todo ${req.id} found!`);
            req.status(200).send(todoRead);
        }
    })
});

router.post("/create", (req, res) => {
    let newTodo = new db.Todo({
        title: req.title,
        content: req.content
    });
    newTodo.save().then(_ => {
        console.log("Todo item saved");
        res.status(200).send(true);
    });
});

router.put("/update/:id", (req, res) => {

});

router.delete("/delete/:id", (req, res) => {

});

module.exports = router;
