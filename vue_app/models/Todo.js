const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Constant = require("../common/constant.js");

const todoSchema = new Schema({
    id: String,
    title: String,
    category: String,
    is_active: { type: Boolean, default: true },
    created_time: { type: Number } // millisecond
});

const Todo = mongoose.model("khang1", todoSchema);

// Method to find and create
Todo.prototype.findAndCreate = function (condition, data, resp_func) {
    Todo.find(condition).exec(function (err, res) {
        if (err) {
            var resp = {
                result: Constant.FAILED_CODE,
                message: Constant.SERVER_ERR,
                err: err,
            };
            resp_func(resp);
        } else if (res.length === 0) {
            var document = new Todo(data);
            document.save(function (err, result) {
                if (err) {
                    var resp = {
                        result: Constant.FAILED_CODE,
                        message: Constant.SERVER_ERR,
                        err: err,
                    };
                    resp_func(resp);
                } else {
                    var resp = { result: Constant.OK_CODE, _id: result["_id"] };
                    resp_func(resp);
                }
            });
        } else {
            var resp = {
                result: Constant.FAILED_CODE,
                message: "Title already exists",
            };
            resp_func(resp);
        }
    });
};

// Export the Todo model
module.exports = Todo;
