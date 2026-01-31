export type UserBase = import("./user").UserBase;
/**@typedef {import("./user").UserBase} UserBase */
export class LessonGroup {
    /**
     * @param {UserBase} user
     * @param {any} rawjson
     */
    constructor(rawjson: any, user: UserBase);
    /**@type {number} レッスングループのID。 */
    id: number;
    /**@type {string} レッスングループの名前。*/
    name: string;
    /**@type {Date} レッスングループの作成日。*/
    createdAt: Date;
    /**@type {Date} レッスングループの更新日。*/
    updatedAt: Date;
    /**@type {number} 学校ID。*/
    schoolId: number;
    /**@type {number} グループの年度。*/
    year: number;
    /**@type {number} */
    lessonPatternId: number;
    /**@type {number} グループの学年。*/
    grade: number;
    /**@type {number} レッスンコースのID。*/
    lessonCourseId: number;
    /**@type {boolean} ドリルが有効か。*/
    drillAvailable: boolean;
    /**@type {boolean} 試験が有効か。*/
    examAvailable: boolean;
    /**@type {UserBase} 取得元のユーザー。*/
    user: UserBase;
}
/**@deprecated LessonGroupBaseと全く同じ。*/
export class Classroom extends LessonGroup {
}
