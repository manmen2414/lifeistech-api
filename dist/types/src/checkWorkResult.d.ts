export class CheckWorkResult {
    /**
     * @param {any} rawjson
     * @param {import("./chapter").ChapterBase} chapter
     */
    constructor(rawjson: any, chapter: import("./chapter").ChapterBase);
    /**@type {number} */
    id: number;
    /**@type {Date} */
    submittedAt: Date;
    /**@type {number} */
    score: number;
    /**@type {number} */
    checkworkId: number;
    chapter: import("./chapter").ChapterBase;
}
