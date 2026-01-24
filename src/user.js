/**
 * @typedef {import("./types/util.d.ts").Loadable<T>} Loadable
 * @template T
 */
/**@typedef {import("./types/util.d.ts").CharactorAvatars} CharactorAvatars*/

const { ChapterBase } = require("./chapter");
const { Classroom, LessonGroup } = require("./lessongroup");
const { Course } = require("./course");
const {
  AccountNotAvailableError,
  UnexpectedResponseError,
} = require("./errors");
const { PageBase } = require("./page");
const { API_URL, API_CH5_URL, checkAuthParseJSON } = require("./util");

/**
 * @implements {Loadable<User>}
 * ユーザーのAPI GET前のクラス。
 * Tokenのみを保持している。
 */
class UserBase {
  /**
   * @param {string} token
   */
  constructor(token) {
    /**
     * 認証に用いる一時的なトークン。\
     * 一定期間後に失効する。
     */
    this.token = token;
    /**
     * リクエストを行った結果のオブジェクト。
     */
    this.loaded = null;
  }
  /**
   * リクエストを行い、全ての情報を取得する。
   */
  async load() {
    const user = new User(this);
    await user.load();
    this.loaded = user;
    return user;
  }
  /**
   * リクエスト済みの場合はそのオブジェクトを、\
   * でなければリクエストを行ってオブジェクトを取得する。
   */
  async getLoaded() {
    if (!this.loaded) return await this.load();
    return this.loaded;
  }
  /**
   * ユーザーの保有しているページを取得する。取得したページは更に情報を取得する必要がある。
   * @returns {Promise<PageBase[]>}
   */
  async getPages() {
    const res = await fetch(API_CH5_URL, {
      headers: {
        authorization: `Bearer ${this.token}`,
      },
      method: "GET",
      mode: "cors",
    });
    const rawjson = await checkAuthParseJSON(res);
    return rawjson.player_web_sites.map(
      /**@param {{id:number,title:string}} p*/
      (p) => new PageBase(p.id, p.title, this.loaded ?? this),
    );
  }
  /**
   * ユーザーの名前とキャラクター画像を更新する。
   * @param {string} nickname 空の場合は更新しない。
   * @param {CharactorAvatars | "none" | ""} avatarFileName noneの場合アイコンが消滅する。空の場合は更新しない。
   */
  async updateNameChara(nickname = "", avatarFileName = "") {
    const body = {
      nickname,
      avatar_file_name: avatarFileName,
    };
    const res = await fetch(API_URL, {
      headers: {
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
      method: "PUT",
      mode: "cors",
    });
    const rawjson = await checkAuthParseJSON(res);
    const changed = {
      nicknameChanged: false,
      avaterChanged: false,
    };
    changed.nicknameChanged = rawjson.nickname === nickname;
    changed.avaterChanged = rawjson.avatarFileName === avatarFileName;
    return changed;
  }

  /**
   * ユーザーのアクセス可能なコース一覧を取得する。取得したコースについてさらに情報を取得する必要はない。
   * @returns {Promise<Course[]>}
   */
  async getCourses() {
    const res = await fetch(`${API_URL}/courses`, {
      headers: {
        authorization: `Bearer ${this.token}`,
      },
      method: "GET",
      mode: "cors",
    });
    const rawjson = await checkAuthParseJSON(res);
    return rawjson.courses.map(
      /**@param {{id:number,title:string,chapter:ChapterBase[]}} j*/
      (j) => new Course(j, this),
    );
  }

  /**
   * ページを作成する。\
   * pageComponentsは、(TODO:)PageComponentListの値を参照。
   *
   * @param {string} name
   * @param {number[]} pageComponents
   * @returns {import("./types/user.d.ts").CreatePageReturns}
   */
  async createPage(name, pageComponents) {
    const body = {
      title: name,
      component_ids: pageComponents,
    };
    const res = await fetch(API_CH5_URL, {
      headers: {
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
      mode: "cors",
    });
    const json = await checkAuthParseJSON(res);
    if (typeof json === "object") {
      /**@type {string | undefined} */
      const error = json.error;
      if (!!error) {
        const errors = {
          invaildTitle: false,
          invaildComponentIds: false,
          alreadyExistsTitle: false,
          pageLimitReached: false,
        };
        if (error.includes("title is missing")) errors.invaildTitle = true;
        if (error.includes("component_ids is missing"))
          errors.invaildComponentIds = true;
        if (error.includes("title is invalid")) errors.invaildTitle = true;
        if (error.includes("component_ids is invalid"))
          errors.invaildComponentIds = true;
        if (error === "Componentを入力してください")
          errors.invaildComponentIds = true;
        if (error === "サイト名を入力してください") errors.invaildTitle = true;
        if (error === "サイト名はすでに存在します")
          errors.alreadyExistsTitle = true;
        if (error === "最大5件までしか作成できません。")
          errors.pageLimitReached = true;
        return { successed: false, error: errors };
      }
    } else if (typeof json === "number") {
      // return new Page({ json, name }, this);
      return {
        successed: true,
        page: new PageBase(json, name, this.loaded ?? this),
      };
    }
    throw new UnexpectedResponseError(
      `Recieved Response on creating page: ${JSON.stringify(json)}`,
    );
  }
  /**
   * ユーザーのCloud9にアクセスするリンクを取得する。
   * @returns {Promise<string|false>} リンク、またはCloud9のリンクが存在しない場合false
   */
  async getCloud9Link() {
    const res = await fetch(`${API_URL}/chapters/38/lessons/3811`, {
      headers: {
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json",
      },
      method: "GET",
      mode: "cors",
    });
    const { cloud9_link } = await res.json();
    if (!cloud9_link) return false;
    return cloud9_link;
  }
}

/**
 * ユーザーの情報を保持するクラス。
 */
class User extends UserBase {
  /**
   * tokenから全ての情報を持ったクラスを返す。
   * @param {string} token
   */
  static async Load(token) {
    const userBase = new UserBase(token);
    const loaded = new this(userBase);
    await loaded.load();
    return loaded;
  }
  /**
   * @param {UserBase} base
   */
  constructor(base) {
    super(base.token);
    this.loaded = this;
    /**@type {boolean}アカウントにログイン中かを示す。 */
    this.isLogining = false;
    /**@type {string} ユーザーの利用言語。 */
    this.language = "";
    /**@type {string} ユーザーのニックネーム。*/
    this.nickname = "";
    /**@type {string} ユーザーの内部の表示名。*/
    this.backendName = "";
    /**@type {string?} ユーザーのチャット上の名前？*/
    this.chatroomNickname = null;
    /**@type {CharactorAvatars} ユーザーの設定しているキャラクターの名前。*/
    this.avatarFileName = "hero1_conv";
    /**@type {number} ユーザーのID。*/
    this.playerId = NaN;
    /**@type {boolean} デモアカウントかどうか。*/
    this.demo = false;
    /**@type {string} 学校種別*/
    this.currentSchoolKind = "";
    /**@type {boolean} レッスンが利用可能か。*/
    this.lessonAvailable = false;
    /**@type {boolean} ドリルが利用可能か。*/
    this.drillAvailable = false;
    /**@type {boolean} 試験が利用可能か。*/
    this.examAvailable = false;
    /**@type {boolean} アカウントが有効であるか。*/
    this.accountAvailable = false;
    /**@type {LessonGroup[]} ユーザーの所属するレッスングループのリスト。*/
    this.lessonGroups = [];

    /**
     * @deprecated lessonGroupを代理で利用する。
     * @type {Classroom[]}
     */
    this.classrooms = this.lessonGroups;
  }

  /**
   * リクエストを行い、全ての情報を更新する。
   */
  async load() {
    // API Request
    const res = await fetch(`${API_URL}/setting`, {
      headers: {
        authorization: `Bearer ${this.token}`,
      },
      method: "GET",
      mode: "cors",
    });
    const rawjson = await res.json();
    this.isLogining = rawjson.login_status === "yes";
    if (res.status === 401 || !this.isLogining)
      throw new AccountNotAvailableError("Token is invaild");
    this.language = rawjson.language;
    this.nickname = rawjson.nickname;
    this.backendName = rawjson.player_name;
    this.chatroomNickname = rawjson.chatroom_nickname;
    this.avatarFileName = rawjson.avatarFileName;
    this.playerId = rawjson.id;
    this.demo = rawjson.demoAccount;
    this.currentSchoolKind = rawjson.currentSchoolKind;
    this.lessonAvailable = rawjson.lessonAvailable;
    this.drillAvailable = rawjson.drillAvailable;
    this.examAvailable = rawjson.examAvailable;
    this.accountAvailable = rawjson.accountAvailable;
    this.lessonGroups = rawjson.lessonGroups.map(
      /**@param {any} j  */
      (j) => new LessonGroup(j, this),
    );
    return this;
  }
}

module.exports = {
  UserBase,
  User,
};
