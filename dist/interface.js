"use strict";
const path_1 = require("path");
function resolvePath(option, path) {
    return path_1.join(option.rootDir, path);
}
exports.resolvePath = resolvePath;
function renameFile(option, item, newItemPath) {
    return item;
}
exports.renameFile = renameFile;
