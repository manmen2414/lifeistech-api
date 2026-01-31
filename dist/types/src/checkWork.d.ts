export class CheckWork {
    /**
     * @param {any} rawjson
     * @param {import("./lesson").LessonBase} lesson
     */
    constructor(rawjson: any, lesson: import("./lesson").LessonBase);
    /**@type {number} */
    id: number;
    lesson: import("./lesson").LessonBase;
    getAnswerer(): Promise<CheckWorkAnswerer>;
}
import { CheckWorkAnswerer } from "./checkWorkAnswerer";
