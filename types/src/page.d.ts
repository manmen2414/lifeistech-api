export type Loadable<T> = import("./types/util.d.ts").Loadable<T>;
export type UserBase = import("./user.js").UserBase;
/**
 * @implements {Loadable<Page>}
 */
export class PageBase implements Loadable<Page> {
    /**
     * @param {number} id
     * @param {string} name
     * @param {UserBase} user
     */
    constructor(id: number, name: string, user: UserBase);
    /**@type {Page|null} */
    loaded: Page | null;
    id: number;
    name: string;
    user: import("./user.js").UserBase;
    load(): Promise<Page>;
    getLoaded(): Promise<Page>;
    /**
     * ページのファイルを保存する。
     * @param {PageFile[]} files
     */
    save(files: PageFile[]): Promise<{
        successed: boolean;
        errorAt: {
            /**@type {PageFile?} */
            file: PageFile | null;
            /**@type {string?} */
            property: string | null;
        };
    }>;
    /**
     * ページのファイルを保存する。
     * @param {PageFile[]} files
     */
    applyFiles(files: PageFile[]): Promise<{
        successed: boolean;
        errorAt: {
            /**@type {PageFile?} */
            file: PageFile | null;
            /**@type {string?} */
            property: string | null;
        };
    }>;
    /**
     * ページにファイルを追加する。
     * @param {string} name
     * @param {"html"|"css"|"js"} extension
     * @returns {import("./types/page.js").AddFileReturns}
     */
    addFile(name: string, extension: "html" | "css" | "js"): import("./types/page.js").AddFileReturns;
    /**
     * ページをzipファイルのBase64形式でダウンロードする。
     * @param {boolean} formatToDataUrl
     */
    getZipB64(formatToDataUrl: boolean): Promise<string>;
    /**
     * 画像をBase64形式からアップロードする。
     * @param {string} base64
     * @param {string} name
     * @returns {import("./types/page.js").UploadImageReturns}
     */
    uploadImage(name: string, base64: string): import("./types/page.js").UploadImageReturns;
    /**
     * ページを改名する。
     * @param {string} newName
     * @returns {import("./types/page.js").RenameReturns}
     */
    rename(newName: string): import("./types/page.js").RenameReturns;
}
export class Page extends PageBase {
    /**
     * @param {number} id
     * @param {UserBase} user
     */
    static Load(id: number, user: UserBase): Promise<Page>;
    /**@param {PageBase} pageBase  */
    constructor(pageBase: PageBase);
    loaded: this;
    /**
     * @type {string}
     * index.htmlへのアクセスリンク。
     */
    previewUrl: string;
    /**@type {PageDataTable[]} データベースのリスト。*/
    dataTables: PageDataTable[];
    /**@type {PageFile[]} ファイルリスト。画像は含まれない。*/
    files: PageFile[];
    /**@type {PageImage[]} ユーザーが追加した画像リスト。プリセットの画像は含まれない。*/
    images: PageImage[];
    /**@type {PageImage[]} テンプレートに存在している画像リスト。ユーザー画像は含まれない。*/
    presetImages: PageImage[];
    load(): Promise<this>;
    save(files?: PageFile[]): Promise<{
        successed: boolean;
        errorAt: {
            /**@type {PageFile?} */
            file: PageFile | null;
            /**@type {string?} */
            property: string | null;
        };
    }>;
}
export const PAGE_API_SCHEMA: z.ZodObject<{
    id: z.ZodNumber;
    player_id: z.ZodNumber;
    title: z.ZodString;
    preview_url: z.ZodString;
    is_read: z.ZodBoolean;
    data_tables: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        label: z.ZodString;
        value: z.ZodArray<z.ZodAny>;
        default_header: z.ZodArray<z.ZodString>;
        header: z.ZodArray<z.ZodString>;
        value_editable: z.ZodBoolean;
        min_data_count: z.ZodNumber;
    }, z.z.core.$strip>>;
    files: z.ZodArray<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        content_type: z.ZodString;
        content: z.ZodString;
        preview_url: z.ZodString;
    }, z.z.core.$strip>>>;
    images: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        url: z.ZodString;
        thumbnail_url: z.ZodOptional<z.ZodString>;
    }, z.z.core.$strip>>;
    preset_images: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        url: z.ZodString;
        thumbnail_url: z.ZodOptional<z.ZodString>;
    }, z.z.core.$strip>>;
}, z.z.core.$strip>;
import { PageFile } from "./pageComponents.js";
import { PageDataTable } from "./pageComponents.js";
import { PageImage } from "./pageComponents.js";
import z = require("zod");
