"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const IInterface = require("../interface");
const IHelper = require("../helper");
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, IInterface.resolvePath(req.myOption, req.body.destination));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploader = multer({ storage: storage, limits: { fileSize: 2 * 1000000 } });
function rename(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var oldpath = IInterface.resolvePath(req.myOption, req.body.item);
        var newpath = IInterface.resolvePath(req.myOption, req.body.newItemPath);
        var result = yield IHelper.renameUrl(oldpath, newpath);
        res.json({ "result": result });
    });
}
exports.rename = rename;
function copy(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let newpath = IInterface.resolvePath(req.myOption, req.body.newPath);
        var result = yield IHelper.copyUrl(req.body.items, newpath, req.myOption);
        res.json({ "result": result });
    });
}
exports.copy = copy;
function move(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let newpath = IInterface.resolvePath(req.myOption, req.body.newPath);
        var result = yield IHelper.moveUrl(req.body.items, newpath, req.myOption);
        res.json({ "result": result });
    });
}
exports.move = move;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield IHelper.removeUrl(req.body.items, req.myOption);
        res.json({ "result": result });
    });
}
exports.remove = remove;
function edit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let fullpath = IInterface.resolvePath(req.myOption, req.body.item);
        var result = yield IHelper.editUrl(fullpath, req.body.content);
        res.json({ "result": result });
    });
}
exports.edit = edit;
function getContent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let fullpath = IInterface.resolvePath(req.myOption, req.body.item);
        var result = yield IHelper.getContent(fullpath);
        res.json({ "result": result.toString() });
    });
}
exports.getContent = getContent;
function upload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        uploader.any()(req, res, err => {
            if (err) {
                res.json({ "result": { success: false, error: err } });
            }
            else {
                res.json({ "result": { success: true, error: null } });
            }
        });
    });
}
exports.upload = upload;
function download(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let fullpath = IInterface.resolvePath(req.myOption, req.query.path);
        var result = yield IHelper.download(fullpath, req.query.path);
        res.json(result);
    });
}
exports.download = download;
