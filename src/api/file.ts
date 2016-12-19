import * as express from "express";
import * as IInterface from "../interface";
import * as IHelper from "../helper";

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, IInterface.resolvePath(req.myOption, req.body.destination));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var uploader = multer({ storage: storage , limits:{ fileSize: 2*1000000}});

export interface IRequest extends IInterface.IMyRequest {
    body: {
        action?: string,
        item?: string,
        newItemPath: string
    }
}

export interface ICopyRequest extends IInterface.IMyRequest {
    body: {
        action?: string,
        items?: string[],
        newPath: string,
        singleFilename: string
    }
}

export interface IMoveRequest extends IInterface.IMyRequest {
    body: {
        action?: string,
        items?: string[],
        newPath: string
    }
}

export interface IRemoveRequest extends IInterface.IMyRequest {
    body: {
        action?: string,
        items?: string[],
    }
}

export interface IEditRequest extends IInterface.IMyRequest {
    body: {
        action?: string,
        item?: string,
        content?: string
    }
}

export interface IContentRequest extends IInterface.IMyRequest {
    body: {
        action?: string,
        item?: string
    }
}
export interface IUploadRequest extends IInterface.IMyRequest {
    files?: any
}

export interface IDownloadRequest extends IInterface.IMyRequest {
    query: {
        action?: string,
        path?: string,
    },
    params: {
        action?: string,
        path?: string,
    }
}
export async function rename(req: IRequest, res: express.Response) {
    var oldpath = IInterface.resolvePath(req.myOption, req.body.item);
    var newpath = IInterface.resolvePath(req.myOption, req.body.newItemPath);
    var result = await IHelper.renameUrl(oldpath, newpath);

    res.json({ "result": result });
}

export async function copy(req: ICopyRequest, res: express.Response) {
    let newpath = IInterface.resolvePath(req.myOption, req.body.newPath);
    var result = await IHelper.copyUrl(req.body.items, newpath, req.myOption);

    res.json({ "result": result });
}

export async function move(req: IMoveRequest, res: express.Response) {
    let newpath = IInterface.resolvePath(req.myOption, req.body.newPath);
    var result = await IHelper.moveUrl(req.body.items, newpath, req.myOption);

    res.json({ "result": result });
}

export async function remove(req: IRemoveRequest, res: express.Response) {
    var result = await IHelper.removeUrl(req.body.items, req.myOption);

    res.json({ "result": result });
}

export async function edit(req: IEditRequest, res: express.Response) {
    let fullpath = IInterface.resolvePath(req.myOption, req.body.item);
    var result = await IHelper.editUrl(fullpath, req.body.content);

    res.json({ "result": result });
}

export async function getContent(req: IContentRequest, res: express.Response) {
    let fullpath = IInterface.resolvePath(req.myOption, req.body.item);
    var result = await IHelper.getContent(fullpath);
    res.json({ "result": result.toString() });
}

export async function upload(req: IUploadRequest, res: express.Response) {
    uploader.any()(req, res, err => {
        if (err) {
            res.json({ "result": { success: false, error: err } });
        }
        else {
            res.json({ "result": { success: true, error: null } });
        }
    });
}
export async function download(req: IDownloadRequest, res: express.Response) {
    let fullpath = IInterface.resolvePath(req.myOption, req.query.path);
    res.sendFile(fullpath);
}