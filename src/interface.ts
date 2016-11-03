import * as express from "express";
import {join} from "path";

export interface IOption {
    rootDir: string
}

export interface IMyRequest extends express.Request {
    myOption: IOption;
}

export function resolvePath(option: IOption, path: string) {
    return join(option.rootDir,path);
}
export function renameFile(option: IOption, item: string , newItemPath: string) {
    return item;
}