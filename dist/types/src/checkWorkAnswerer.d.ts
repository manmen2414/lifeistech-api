/**
 * チェックワークの問題を取得・回答を送信する。
 */
export class CheckWorkAnswerer {
    /**
     * @param {any} rawjson
     * @param {import("./checkWork").CheckWork} checkWork
     */
    constructor(rawjson: any, checkWork: import("./checkWork").CheckWork);
    /**@type {number} 解答するチェックワークのID。*/
    id: number;
    /**@type {number} チェックワークのあるレッスンID。*/
    lessonId: number;
    /**@type {string} チェックワークのあるレッスン名。*/
    lessonName: string;
    /**@type {number} */
    patternNum: number;
    /**@type {number} 何回目の解答をしようとしているか。*/
    tryNum: number;
    /**@type {CheckWorkQuestion[]} */
    questions: CheckWorkQuestion[];
    checkWork: import("./checkWork").CheckWork;
    /**@type {number[]} 解答の**インデックス**。*/
    answers: number[];
    /**
     * @returns {import("./types/checkWorkAnswerer").SendAnswerReturns}
     */
    sendAnswers(): import("./types/checkWorkAnswerer").SendAnswerReturns;
}
/**
 * チェックワーク内の問題。
 */
export class CheckWorkQuestion {
    /**
     * @param {any} rawjson
     * @param {CheckWorkAnswerer} answerer
     */
    constructor(rawjson: any, answerer: CheckWorkAnswerer);
    /**@type {number} 問題のID。*/
    id: number;
    /**@type {string} 問題の本文。*/
    text: string;
    /**@type {string?} 問題のサムネイル。*/
    thumbnail: string | null;
    /**@type {boolean} */
    isTextAnswer: boolean;
    /**@type {string[]} */
    answers: string[];
    /**@type {string?} */
    hint: string | null;
    /**@type {string?} */
    hintPlayerLink: string | null;
    /**@type {number} */
    index: number;
    answerer: CheckWorkAnswerer;
    /**
     * @param {number} answerIndex
     */
    answer(answerIndex: number): void;
}
