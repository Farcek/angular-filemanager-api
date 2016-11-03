import * as express from "express";
export interface IOption {
    rootDir: string;
}
export interface IMyRequest extends express.Request {
    myOption: IOption;
}
export declare function resolvePath(option: IOption, path: string): string;
export declare function renameFile(option: IOption, item: string, newItemPath: string): string;
