var express = require("express");
var fs = require("fs");
var app = express();
app.get("/", function (req, res) {
    res.json('{"name": "John Zhu"}');
    res.end();
});
app.get("/login", function (req, res) {
    res.download("./test.txt");
});
app.listen(3000, function () {
    console.log("Server is running at localhost:3000");
});
