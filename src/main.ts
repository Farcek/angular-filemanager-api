import * as express from "express";
import * as IInterface from "./interface";
import * as bodyParser from "body-parser";

import * as IList from "./api/list";
import * as IFile from "./api/file";
import * as IFolder from "./api/folder";

export function factory(option: IInterface.IOption): express.Router {
    var root = express.Router();
    root.use((req: IInterface.IMyRequest, res, next) => {
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