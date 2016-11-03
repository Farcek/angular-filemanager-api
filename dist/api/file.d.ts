import * as express from "express";
import * as IInterface from "../interface";
export interface IRequest extends IInterface.IMyRequest {
    body: {
        action?: string;
        item?: string;
        newItemPath: string;
    };
}
export interface ICopyRequest extends IInterface.IMyRequest {
    body: {
        action?: string;
        items?: string[];
        newPath: string;
        singleFilename: string;
    };
}
export interface IMoveRequest extends IInterface.IMyRequest {
    body: {
        action?: string;
        items?: string[];
        newPath: string;
    };
}
export interface IRemoveRequest extends IInterface.IMyRequest {
    body: {
        action?: string;
        items?: string[];
    };
}
export interface IEditRequest extends IInterface.IMyRequest {
    body: {
        action?: string;
        item?: string;
        content?: string;
    };
}
export interface IContentRequest extends IInterface.IMyRequest {
    body: {
        action?: string;
        item?: string;
    };
}
export interface IUploadRequest extends IInterface.IMyRequest {
    files?: any;
}
export interface IDownloadRequest extends IInterface.IMyRequest {
    query: {
        action?: string;
        path?: string;
    };
    params: {
        action?: string;
        path?: string;
    };
}
export declare function rename(req: IRequest, res: express.Response): Promise<void>;
export declare function copy(req: ICopyRequest, res: express.Response): Promise<void>;
export declare function move(req: IMoveRequest, res: express.Response): Promise<void>;
export declare function remove(req: IRemoveRequest, res: express.Response): Promise<void>;
export declare function edit(req: IEditRequest, res: express.Response): Promise<void>;
export declare function getContent(req: IContentRequest, res: express.Response): Promise<void>;
export declare function upload(req: IUploadRequest, res: express.Response): Promise<void>;
export declare function download(req: IDownloadRequest, res: express.Response): Promise<void>;
