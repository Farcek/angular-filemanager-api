"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const IList = require("./api/list");
const IFile = require("./api/file");
const IFolder = require("./api/folder");
function factory(option) {
    var root = express.Router();
    root.use((req, res, next) => {
        req.myOption = option;
        next();
    });
    root.post("/list", bodyParser.json(), IList.router);
    root.post("/rename", bodyParser.json(), IFile.rename);
    root.post("/copy", bodyParser.json(), IFile.copy);
    root.post("/move", bodyParser.json(), IFile.move);
    root.post("/remove", bodyParser.json(), IFile.remove);
    root.post("/create", bodyParser.json(), IFolder.create);
    root.post("/upload", IFile.upload);
    root.get("/download", IFile.download);
    root.post("/content", bodyParser.json(), IFile.getContent);
    root.post("/edit", bodyParser.json(), IFile.edit);
    return root;
}
exports.factory = factory;
