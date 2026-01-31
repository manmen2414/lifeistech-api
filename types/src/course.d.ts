export type UserBase = import("./user").UserBase;
export class Course {
    /**
     * @param {UserBase} user
     * @param {any} rawjson
     */
    constructor(rawjson: any, user: UserBase);
    /**@type {number} コースのID。 */
    id: number;
    /**@type {string} コース名。*/
    name: string;
    /**@type {ChapterBase[]} */
    chapters: ChapterBase[];
    /**@type {UserBase} 取得元のユーザー。*/
    user: UserBase;
}
import { ChapterBase } from "./chapter";
