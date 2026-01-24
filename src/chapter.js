/**
 * @typedef {import("./types/util.d.ts").Loadable<T>} Loadable
 * @template T
 */
/**@typedef {import("./course").Course} Course */

const { UnexpectedResponseError } = require("./errors.js");
const { API_URL, checkAuthParseJSON } = require("./util.js");
const { LessonBase } = require("./lesson.js");
const { CheckWorkResult } = require("./checkWorkResult.js");

/**
 * @implements {Loadable<Chapter>}
 */
class ChapterBase {
  /**
   * @param {Course} course
   * @param {any} rawjson
   */
  constructor(rawjson, course) {
    /**
     * リクエストを行った結果のオブジェクト。
     */
    this.loaded = null;
    /**@type {number} チャプターID。 */
    this.id = rawjson.id;
    /**@type {string} チャプター名。*/
    this.name = rawjson.title;
    /**@type {string} チャプターの表示上の番号。*/
    this.showNo = rawjson.no;
    /**@type {string} チャプターのメイン色。*/
    this.color = rawjson.color;
    /**@type {string[]} チャプターのトピック。*/
    this.themes = rawjson.themes;
    /**@type {boolean} クラスの対象か？*/
    this.classTarget = rawjson.class_target;
    /**@type {number} レッスングループのID。*/
    this.lessonGroupId = rawjson.lesson_group_id;
    /**@type {number?} チャプターがオリジナルWebサイト制作の場合、ウェブサイトのID。*/
    this.websiteId = rawjson.web_site_id;
    /**@type {LessonBase[]} チャプター内のレッスン。*/
    this.lessons = rawjson.lessons.map(
      /**@param {any} l*/ (l) => new LessonBase(l, this),
    );

    /**@type {Course} 取得元のユーザー。*/
    this.course = course;
  }
  /**
   * リクエストを行い、全ての情報を取得する。
   */
  async load() {
    const chapter = new Chapter(this);
    await chapter.load();
    this.loaded = chapter;
    return chapter;
  }
  /**
   * リクエスト済みの場合はそのオブジェクトを、\
   * でなければリクエストを行ってオブジェクトを取得する。
   */
  async getLoaded() {
    if (!this.loaded) return await this.load();
    return this.loaded;
  }
}

class Chapter extends ChapterBase {
  /**
   * @param {number} id
   * @param {Course} user
   */
  static async Load(id, user) {
    const base = new ChapterBase(
      {
        id,
      },
      user,
    );
    const loaded = new this(base);
    await loaded.load();
    return loaded;
  }
  /**@param {ChapterBase} chapterBase */
  constructor(chapterBase) {
    super(
      {
        id: chapterBase.id,
        title: chapterBase.name,
        no: chapterBase.showNo,
        color: chapterBase.color,
        themes: chapterBase.themes,
        class_target: chapterBase.classTarget,
        lesson_group_id: chapterBase.lessonGroupId,
        web_site_id: chapterBase.websiteId,
        lessons: [],
      },
      chapterBase.course,
    );
    this.loaded = this;
    this.lessons = chapterBase.lessons;
    /**@type {string} */
    this.subtitle = "";
    /**@type {string} */
    this.iconUrl = "";
    /**@type {string} */
    this.colorGradientFrom = "";
    /**@type {string} */
    this.colorGradientTo = "";
    /**@type {string} */
    this.purpose = "";
    /**@type {string} */
    this.goal = "";
  }
  async load() {
    const res = await fetch(`${API_URL}/chapters/${this.id}`, {
      headers: {
        authorization: `Bearer ${this.course.user.token}`,
      },
      method: "GET",
      mode: "cors",
    });
    const rawjson = await checkAuthParseJSON(res);
    this.isLogining = rawjson.login_status === "yes";
    if (rawjson.id !== this.id)
      throw new UnexpectedResponseError(`Unexpect ID: ${rawjson.id}`);
    this.name = rawjson.title;
    this.showNo = rawjson.no;
    this.color = rawjson.color;
    this.themes = rawjson.themes;
    this.classTarget = rawjson.class_target;
    this.websiteId = rawjson.web_site_id;
    this.subtitle = rawjson.subtitle;
    this.iconUrl = rawjson.icon_url;
    this.colorGradientFrom = rawjson.color_gradient_from;
    this.colorGradientTo = rawjson.color_gradient_to;
    this.purpose = rawjson.purpose;
    this.goal = rawjson.goal;
    this.lessons = rawjson.lessons.map(
      /**@param {any} l*/ (l) => new LessonBase(l, this),
    );
    return this;
  }
  async getCheckworkScores() {
    const res = await fetch(
      `${API_URL}/chapters/${this.id}/player_checkwork_scores`,
      {
        headers: {
          authorization: `Bearer ${this.course.user.token}`,
        },
        method: "GET",
        mode: "cors",
      },
    );
    /**@type {any[]} */
    const rawjson = await checkAuthParseJSON(res);
    return rawjson.map((j) => new CheckWorkResult());
  }
}

module.exports = { ChapterBase, Chapter };
