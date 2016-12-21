"use strict";
const fs = require('fs');
const $Promise = require('bluebird');
const path_1 = require("path");
const IInterface = require("./interface");
function getList(path) {
    return new Promise((resolve, reject) => {
        var list_arr = [];
        var fileObject = {};
        fs.readdir(path, (err, files) => {
            files.forEach(file => {
                var filepath = path + '/' + file;
                var stats = fs.statSync(filepath);
                fileObject = {
                    name: file,
                    rights: "drwxr-xr-x",
                    size: stats["size"],
                    date: stats["ctime"],
                    type: stats.isFile() ? 'file' : stats.isDirectory() ? 'dir' : ''
                };
                list_arr.push(fileObject);
            });
            resolve(list_arr);
        });
    });
}
exports.getList = getList;
function renameUrl(item, newItemPath) {
    return new Promise((resolve, reject) => {
        fs.rename(item, newItemPath, function (err) {
            if (err) {
                resolve({
                    success: false,
                    error: err
                });
            }
            else {
                resolve({
                    success: true,
                    error: null
                });
            }
        });
    });
}
exports.renameUrl = renameUrl;
function copyUrl(oldpaths, target, rootUrl) {
    return $Promise.map(oldpaths, item => {
        let fromPath = IInterface.resolvePath(rootUrl, item);
        var item = item.substring(item.lastIndexOf("/") + 1, item.length);
        let newPath = path_1.join(target, item);
        return new $Promise((resolve, reject) => {
            var fr = fs.createReadStream(fromPath);
            fr.on("error", function (err) {
                reject(err);
            });
            var to = fs.createWriteStream(newPath);
            to.on("error", function (err) {
                reject(err);
                to.end();
            });
            to.on("finish", function (exit) {
                resolve();
            });
            fr.pipe(to);
        });
    })
        .then(() => {
        return {
            success: true,
            error: null
        };
    })
        .catch(err => {
        return {
            success: false,
            error: err
        };
    });
}
exports.copyUrl = copyUrl;
function moveUrl(oldpaths, target, rootUrl) {
    return $Promise.map(oldpaths, item => {
        let path = IInterface.resolvePath(rootUrl, item);
        var item = item.substring(item.lastIndexOf("/") + 1, item.length);
        let newpath = path_1.join(target, item);
        return new $Promise((resolve, reject) => {
            fs.rename(path, newpath, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    })
        .then(() => {
        return {
            success: true,
            error: null
        };
    })
        .catch(err => {
        return {
            success: false,
            error: err
        };
    });
}
exports.moveUrl = moveUrl;
function removeUrl(oldpaths, rootUrl) {
    return $Promise.map(oldpaths, item => {
        let path = IInterface.resolvePath(rootUrl, item);
        return new $Promise((resolve, reject) => {
            var deleteFolderRecursive = function (path) {
                if (fs.existsSync(path)) {
                    fs.readdirSync(path).forEach(function (file, index) {
                        var curPath = path + "/" + file;
                        if (fs.lstatSync(curPath).isDirectory()) {
                            deleteFolderRecursive(curPath);
                        }
                        else {
                            fs.unlinkSync(curPath);
                        }
                    });
                    fs.rmdir(path, (err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve();
                        }
                    });
                }
            };
            if (fs.lstatSync(path).isDirectory()) {
                deleteFolderRecursive(path);
            }
            else {
                fs.unlink(path, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    })
        .then(() => {
        return {
            success: true,
            error: null
        };
    })
        .catch(err => {
        return {
            success: false,
            error: err
        };
    });
}
exports.removeUrl = removeUrl;
function createFolder(newpath) {
    return new $Promise((resolve, reject) => {
        fs.mkdir(newpath, err => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    })
        .then(() => {
        return {
            success: true,
            error: null
        };
    })
        .catch(err => {
        return {
            success: false,
            error: err
        };
    });
}
exports.createFolder = createFolder;
function editUrl(path, content) {
    return new $Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                return reject(err);
            }
            fs.writeFile(path, content, 'utf8', function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    })
        .then(() => {
        return {
            success: true,
            error: null
        };
    })
        .catch(err => {
        return {
            success: false,
            error: err
        };
    });
}
exports.editUrl = editUrl;
function getContent(path) {
    var content;
    return new $Promise((resolve, reject) => {
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                content = data;
                resolve();
            }
        });
    })
        .then(() => {
        return content;
    });
}
exports.getContent = getContent;
