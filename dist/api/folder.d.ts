import * as express from "express";
import * as IInterface from "../interface";
export interface ICreateRequest extends IInterface.IMyRequest {
    body: {
        action?: string;
        newPath?: string;
    };
}
export declare function create(req: ICreateRequest, res: express.Response): Promise<void>;
