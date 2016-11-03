import * as express from "express";
import * as IInterface from "../interface";
export declare function router(req: IRequest, res: express.Response): Promise<void>;
export interface IRequest extends IInterface.IMyRequest {
    body: {
        action?: string;
        path?: string;
    };
}
