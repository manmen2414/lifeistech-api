export type Loadable<T> = import("./types/util.d.ts").Loadable<T>;
export type CharactorAvatars = import("./types/util.d.ts").CharactorAvatars;
/**
 * @implements {Loadable<User>}
 * ユーザーのAPI GET前のクラス。
 * Tokenのみを保持している。
 */
export class UserBase implements Loadable<User> {
    /**
     * @param {string} token
     */
    constructor(token: string);
    /**
     * 認証に用いる一時的なトークン。\
     * 一定期間後に失効する。
     */
    token: string;
    /**
     * リクエストを行った結果のオブジェクト。
     */
    loaded: User | null;
    /**
     * リクエストを行い、全ての情報を取得する。
     */
    load(): Promise<User>;
    /**
     * リクエスト済みの場合はそのオブジェクトを、\
     * でなければリクエストを行ってオブジェクトを取得する。
     */
    getLoaded(): Promise<User>;
    /**
     * ユーザーの保有しているページを取得する。取得したページは更に情報を取得する必要がある。
     * @returns {Promise<PageBase[]>}
     */
    getPages(): Promise<PageBase[]>;
    /**
     * ユーザーの名前とキャラクター画像を更新する。
     * @param {string} nickname 空の場合は更新しない。
     * @param {CharactorAvatars | "none" | ""} avatarFileName noneの場合アイコンが消滅する。空の場合は更新しない。
     */
    updateNameChara(nickname?: string, avatarFileName?: CharactorAvatars | "none" | ""): Promise<{
        nicknameChanged: boolean;
        avaterChanged: boolean;
    }>;
    /**
     * ユーザーのアクセス可能なコース一覧を取得する。取得したコースについてさらに情報を取得する必要はない。
     * @returns {Promise<Course[]>}
     */
    getCourses(): Promise<Course[]>;
    /**
     * ページを作成する。\
     * pageComponentsは、(TODO:)PageComponentListの値を参照。
     *
     * @param {string} name
     * @param {number[]} pageComponents
     * @returns {import("./types/user.d.ts").CreatePageReturns}
     */
    createPage(name: string, pageComponents: number[]): import("./types/user.d.ts").CreatePageReturns;
    /**
     * ユーザーのCloud9にアクセスするリンクを取得する。
     * @returns {Promise<string|false>} リンク、またはCloud9のリンクが存在しない場合false
     */
    getCloud9Link(): Promise<string | false>;
}
/**
 * ユーザーの情報を保持するクラス。
 */
export class User extends UserBase {
    /**
     * tokenから全ての情報を持ったクラスを返す。
     * @param {string} token
     */
    static Load(token: string): Promise<User>;
    /**
     * @param {UserBase} base
     */
    constructor(base: UserBase);
    loaded: this;
    /**@type {boolean}アカウントにログイン中かを示す。 */
    isLogining: boolean;
    /**@type {string} ユーザーの利用言語。 */
    language: string;
    /**@type {string} ユーザーのニックネーム。*/
    nickname: string;
    /**@type {string} ユーザーの内部の表示名。*/
    backendName: string;
    /**@type {string?} ユーザーのチャット上の名前？*/
    chatroomNickname: string | null;
    /**@type {CharactorAvatars} ユーザーの設定しているキャラクターの名前。*/
    avatarFileName: CharactorAvatars;
    /**@type {number} ユーザーのID。*/
    playerId: number;
    /**@type {boolean} デモアカウントかどうか。*/
    demo: boolean;
    /**@type {string} 学校種別*/
    currentSchoolKind: string;
    /**@type {boolean} レッスンが利用可能か。*/
    lessonAvailable: boolean;
    /**@type {boolean} ドリルが利用可能か。*/
    drillAvailable: boolean;
    /**@type {boolean} 試験が利用可能か。*/
    examAvailable: boolean;
    /**@type {boolean} アカウントが有効であるか。*/
    accountAvailable: boolean;
    /**@type {LessonGroup[]} ユーザーの所属するレッスングループのリスト。*/
    lessonGroups: LessonGroup[];
    /**
     * @deprecated lessonGroupを代理で利用する。
     * @type {Classroom[]}
     */
    classrooms: Classroom[];
    /**
     * リクエストを行い、全ての情報を更新する。
     */
    load(): Promise<this>;
}
import { PageBase } from "./page";
import { Course } from "./course";
import { LessonGroup } from "./lessongroup";
import { Classroom } from "./lessongroup";
