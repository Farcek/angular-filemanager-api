import * as express from "express";
import * as IInterface from "../interface";
import * as IHelper from "../helper";

export interface ICreateRequest extends IInterface.IMyRequest {
    body: {
        action?: string,
        newPath?: string
    }
}

export async function create(req: ICreateRequest, res: express.Response) {
    var newpath = IInterface.resolvePath(req.myOption, req.body.newPath);
    var result = await IHelper.createFolder(newpath);

    res.json({ "result": result });
}