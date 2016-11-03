export interface IGetListResult {
    name: string;
    rights: string;
    size: number;
    date: Date;
    type: "dir" | "file";
}
export interface IBaseResult {
    success: boolean;
    error: any;
}
export declare function getList(path: string): Promise<IGetListResult[]>;
export declare function renameUrl(item: string, newItemPath: string): Promise<IBaseResult>;
export declare function copyUrl(oldpaths: string[], target: string, rootUrl: any): Promise<IBaseResult>;
export declare function moveUrl(oldpaths: string[], target: string, rootUrl: any): Promise<IBaseResult>;
export declare function removeUrl(oldpaths: string[], rootUrl: any): Promise<IBaseResult>;
export declare function createFolder(newpath: string): Promise<IBaseResult>;
export declare function editUrl(path: string, content: string): Promise<IBaseResult>;
export declare function getContent(path: string): Promise<string>;
export declare function download(path: string, filename: string): Promise<any>;
