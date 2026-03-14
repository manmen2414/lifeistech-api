/**
 * キャラクター6人の画像を取得する。
 * おそらく没になった男子3と女子3のアナザーバージョンも取得できる。
 */
export function getCharactorsImage(): Promise<{
    hero1_conv: string;
    hero2_conv: string;
    hero3_removed: string;
    hero3_conv: string;
    heroine1_conv: string;
    heroine2_conv: string;
    heroine3_removed: string;
    heroine3_conv: string;
}>;
/**
 * このページがLife is Tech! LessonのオリジナルWebサイト作成講座によって作成されたページであるか判定する。
 */
export function checkIsLITPage(): boolean;
/**
 * このクライアントがログイン済みか判定する。
 */
export function checkCookieToken(): Promise<{
    name: string;
    isAccessible: boolean;
    isValid: true;
    redirectUrl?: undefined;
} | {
    isAccessible: boolean;
    isValid: false;
    redirectUrl: string;
    name?: undefined;
}>;
export const API_URL: "https://api.lifeistech-lesson.jp/api/players";
export const API_CH5_URL: string;
/**
 * @template T
 * @extends {Array<()=>Promise<T>>}
 */
export class DeferedArray<T> extends Array<() => Promise<T>> {
    constructor(arrayLength?: number);
    constructor(arrayLength: number);
    constructor(...items: (() => Promise<T>)[]);
    /**
     * 該当キーの値を取得する非同期関数。
     * @param {number} key
     */
    get(key: number): Promise<T>;
    /**
     * すべての値を評価して、純粋な関数にする。
     */
    evaluateAll(): Promise<Awaited<T>[]>;
}
/**
 * JSON化可能かどうかをReturn[0]に、
 * JSON化できた場合のオブジェクトをReturn[1]に記録する。
 * @param {string} str
 * @returns {[parseable:boolean,parsed?:any]}
 */
export function tryJSONParse(str: string): [parseable: boolean, parsed?: any];
/**
 * レスポンスで認証エラーが発生していないか確認し、\
 * 発生しているなら例外をスローし、していないならjson化したものを返します。
 *
 * // TODO:jsonの分離化。案外使いづらかった。
 * @param {Response} res
 */
export function checkAuthParseJSON(res: Response): Promise<any>;
export const CharactorAvatarsEnum: z.ZodEnum<{
    hero1_conv: "hero1_conv";
    hero2_conv: "hero2_conv";
    hero3_conv: "hero3_conv";
    heroine1_conv: "heroine1_conv";
    heroine2_conv: "heroine2_conv";
    heroine3_conv: "heroine3_conv";
}>;
import z = require("zod");
