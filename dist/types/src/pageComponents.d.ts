export type Page = import("./page").Page;
export type FileMinetypes = import("./types/page").FileMinetypes;
export class PageFile {
    /**
     * @param {any} rawjson
     * @param {Page} page
     */
    constructor(rawjson: any, page: Page);
    /**@type {number} ファイルのID。*/
    id: number;
    /**@type {string} ファイル名。拡張子を含む。*/
    name: string;
    /**@type {FileMinetypes} MINEタイプ。*/
    mineType: FileMinetypes;
    /**@type {string} ファイルの内容。*/
    content: string;
    /**@type {string} ファイルへアクセスするURL。*/
    url: string;
    /**ファイルが存在するページ。 */
    page: import("./page").Page;
    /**
     * このファイルを削除する。
     */
    delete(): Promise<boolean>;
    /**
     * ファイルを書き換え、ページを保存する。\
     * ページ保存時は他のファイルも保存する。
     * @param {string} content
     */
    editAndSave(content: string): Promise<{
        successed: boolean;
        errorAt: {
            file: PageFile | null;
            property: string | null;
        };
    }>;
}
export class PageImage {
    /**
     * @param {Page} page
     * @param {boolean} isPreset
     * @param {any} rawjson
     */
    constructor(isPreset: boolean, rawjson: any, page: Page);
    /**プリセット画像であるか。 */
    isPreset: boolean;
    /**@type {number} 画像のID。*/
    id: number;
    /**@type {string} 画像のファイル名。*/
    name: string;
    /**@type {string} 画像へのアクセスURL。*/
    url: string;
    /**画像が登録されているページ。 */
    page: import("./page").Page;
    /**
     * 画像を削除する。\
     * プリセット画像は削除不能。
     */
    delete(): Promise<void>;
}
export class PageDataTable {
    /**
     * @param {any} rawjson
     * @param {Page} page
     */
    constructor(rawjson: any, page: Page);
    /**データベースが存在するページ。 */
    page: import("./page").Page;
    /**@type {number} データベースのID。*/
    id: number;
    /**@type {string} データベースの表示上のラベル。*/
    label: string;
    /**@type {Object[]} データベースの値。*/
    value: Object[];
    /**@type {string[]} デフォルトで設定されていたデータベースのヘッダーリスト。*/
    defaultHeader: string[];
    /**@type {string[]} 現在設定されているヘッダーリスト。*/
    header: string[];
    /**@type {boolean} 値を変更可能か。*/
    valueEditable: boolean;
    /**@type {number} 最小のデータ数。*/
    minDataCount: number;
    /**
     * データベースを書き換える。
     * 編集不能なデータベースの場合、エラーが発生する。
     * @param {Object[]} value
     */
    save(value?: Object[]): Promise<void>;
}
