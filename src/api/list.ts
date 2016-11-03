import * as express from "express";
import * as IInterface from "../interface";
import * as IHelper from "../helper";

export async function router(req: IRequest, res: express.Response) {
    var path = IInterface.resolvePath(req.myOption, req.body.path);
    var list = await IHelper.getList(path)

    res.json({ "result": list });
}

export interface IRequest extends IInterface.IMyRequest {
    body: {
        action?: string,
        path?: string
    }
}