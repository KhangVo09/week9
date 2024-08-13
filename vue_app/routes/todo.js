var express = require('express');
var router = express.Router();
const request = require('request');
var Todo = require('../models/Todo');

// This function creates a timestamp
function create_timestamp() {
    return parseInt(new Date().getTime() / 1000);
}

// Render the page without getting data from MongoDB
router.get('/list', function (req, res, next) {
    res.render('todo/list');
});

// API to query the list
router.get('/read_list', function (req, res, next) {
    var todo = new Todo();
    todo.find(
        {},
        { limit: req.query.limit ? req.query.limit : 10 }, // Default is 10 items
        '',
        { created_time: -1 }, // Latest come first
        function (results) {
            res.json(results);
        }
    );
});

// POST request to create a new todo item



// PUT request to update an existing todo item
router.put('/update_me', function (req, res, next) {
    var todo = new Todo();
    todo.update(
        { _id: req.body['_id'] },
        { $set: { title: req.body['title'] } },
        function (results) {
            res.json(results);
        }
    );
});

// DELETE request to mark a todo item as inactive
router.delete('/delete/:id', function (req, res, next) {
    var todo = new Todo();
    todo.update(
        { _id: req.params.id },
        { is_active: false },
        function (results) {
            res.json(results);
        }
    );
});

module.exports = router;
