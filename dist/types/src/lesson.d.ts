export type ChapterBase = import("./chapter").ChapterBase;
export type Loadable<T> = import("./types/util").Loadable<T>;
export class Lesson extends LessonBase {
    /**@param {LessonBase} lessonBase  */
    constructor(lessonBase: LessonBase);
    loaded: this;
    /**@type {boolean} */
    isRange: boolean;
    /**@type {CheckWork[]} レッスンに存在するチェックワーク。*/
    checkworks: CheckWork[];
    /**@type {any[]} */
    algorithmExercises: any[];
    /**@type {string} レッスンの説明。*/
    description: string;
    /**@type {string} レッスンのサムネイル。*/
    thumbnail: string;
    /**@type {string} レッスンで学ぶ内容の説明。*/
    learningContents: string;
    /**@type {boolean} チャットを用いる内容があるか？*/
    hasChatContents: boolean;
    /**@type {import("./types/lesson").LessonStartLink[]} レッスンの開始リンク。*/
    startLinks: import("./types/lesson").LessonStartLink[];
    /**@type {any} レッスンの再開リンク？*/
    continueLink: any;
    /**@type {Material[]} レッスンの「補助教材」リスト。*/
    materials: Material[];
    /**@type {Material[]} レッスンの「ワークシート」リスト。*/
    worksheetMaterials: Material[];
    /**@type {{id:number}?} レッスンのミニワーク。*/
    htmlWork: {
        id: number;
    } | null;
    /**@type {string?} レッスンにCloud9が結び付けられている場合のリンク。*/
    cloud9Link: string | null;
    load(): Promise<this>;
    isInfoLoaded(): boolean;
}
/**
 * @implements {Loadable<Lesson>}
 */
export class LessonBase implements Loadable<Lesson> {
    /**
     * @param {any} rawjson
     * @param {ChapterBase} chapter
     */
    constructor(rawjson: any, chapter: ChapterBase);
    /**@type {number} レッスンのID。*/
    id: number;
    /**@type {string} レッスンの名前。*/
    name: string;
    /**@type {string} レッスンの表示上の番号。*/
    showNo: string;
    /**@type {string} レッスンの達成状況。*/
    status: string;
    /** 大元のチャプター。*/
    chapter: import("./chapter").ChapterBase;
    loaded: Lesson | null;
    load(): Promise<Lesson>;
    getLoaded(): Promise<Lesson>;
}
import { CheckWork } from "./checkWork";
import { Material } from "./material";
