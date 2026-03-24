export class Material {
    /**
     * @param {any} rawjson
     * @param {boolean} isWorksheetMaterial
     * @param {import("./lesson.js").Lesson} lesson
     */
    constructor(rawjson: any, isWorksheetMaterial: boolean, lesson: import("./lesson.js").Lesson);
    /**@type {number} 教材ID。 */
    id: number;
    /**@type {string} 教材の名前。 */
    label: string;
    /**@type {string} 教材へアクセスするリンク。 */
    link: string;
    /**この教材がワークシートであるか。 */
    isWorksheetMaterial: boolean;
    lesson: import("./lesson.js").Lesson;
}
