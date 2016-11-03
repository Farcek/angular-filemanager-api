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
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var newpath = IInterface.resolvePath(req.myOption, req.body.newPath);
        var result = yield IHelper.createFolder(newpath);
        res.json({ "result": result });
    });
}
exports.create = create;
