export type Loadable<T> = import("./types/util.d.ts").Loadable<T>;
export type Course = import("./course").Course;
/**
 * @implements {Loadable<Chapter>}
 */
export class ChapterBase implements Loadable<Chapter> {
    /**
     * @param {Course} course
     * @param {any} rawjson
     */
    constructor(rawjson: any, course: Course);
    /**
     * リクエストを行った結果のオブジェクト。
     */
    loaded: Chapter | null;
    /**@type {number} チャプターID。 */
    id: number;
    /**@type {string} チャプター名。*/
    name: string;
    /**@type {string} チャプターの表示上の番号。*/
    showNo: string;
    /**@type {string} チャプターのメイン色。*/
    color: string;
    /**@type {string[]} チャプターのトピック。*/
    themes: string[];
    /**@type {boolean} クラスの対象か？*/
    classTarget: boolean;
    /**@type {number} レッスングループのID。*/
    lessonGroupId: number;
    /**@type {number?} チャプターがオリジナルWebサイト制作の場合、ウェブサイトのID。*/
    websiteId: number | null;
    /**@type {LessonBase[]} チャプター内のレッスン。*/
    lessons: LessonBase[];
    /**@type {Course} 取得元のユーザー。*/
    course: Course;
    /**
     * リクエストを行い、全ての情報を取得する。
     */
    load(): Promise<Chapter>;
    /**
     * リクエスト済みの場合はそのオブジェクトを、\
     * でなければリクエストを行ってオブジェクトを取得する。
     */
    getLoaded(): Promise<Chapter>;
    /**
     * このチャプター下のチェックワークの結果を全て取得する。
     */
    getCheckworkScores(): Promise<CheckWorkResult[]>;
}
export class Chapter extends ChapterBase {
    /**
     * @param {number} id
     * @param {Course} user
     */
    static Load(id: number, user: Course): Promise<Chapter>;
    /**@param {ChapterBase} chapterBase */
    constructor(chapterBase: ChapterBase);
    loaded: this;
    /**@type {string} */
    subtitle: string;
    /**@type {string} */
    iconUrl: string;
    /**@type {string} */
    colorGradientFrom: string;
    /**@type {string} */
    colorGradientTo: string;
    /**@type {string} */
    purpose: string;
    /**@type {string} */
    goal: string;
    load(): Promise<this>;
    isLogining: boolean | undefined;
}
import { LessonBase } from "./lesson.js";
import { CheckWorkResult } from "./checkWorkResult.js";
