/**@typedef {import("./chapter").ChapterBase} ChapterBase */
/**
 * @typedef {import("./types/util").Loadable<T>} Loadable
 * @template T
 * */

const { CheckWork } = require("./checkWork");
const { Material } = require("./material");
const { API_URL, checkAuthParseJSON } = require("./util");

/**
 * @implements {Loadable<Lesson>}
 */
class LessonBase {
  /**
   * @param {any} rawjson
   * @param {ChapterBase} chapter
   */
  constructor(rawjson, chapter) {
    /**@type {number} レッスンのID。*/
    this.id = rawjson.id;
    /**@type {string} レッスンの名前。*/
    this.name = rawjson.title;
    /**@type {string} レッスンの表示上の番号。*/
    this.showNo = rawjson.no;
    /**@type {string} レッスンの達成状況。*/
    this.status = rawjson.status;
    // TODO: 協力者求: statusのとりうる値を知りたい
    // "cleared"|
    /** 大元のチャプター。*/
    this.chapter = chapter;
    this.loaded = null;
  }
  async load() {
    const lesson = new Lesson(this);
    await lesson.load();
    //TODO: load時にこっちの値も同期させる
    this.loaded = lesson;
    return lesson;
  }
  async getLoaded() {
    if (!this.loaded) return await this.load();
    return this.loaded;
  }
}
class Lesson extends LessonBase {
  /**@param {LessonBase} lessonBase  */
  constructor(lessonBase) {
    super(
      {
        id: lessonBase.id,
        title: lessonBase.name,
        no: lessonBase.showNo,
        status: lessonBase.status,
      },
      lessonBase.chapter,
    );
    this.loaded = this;

    /**@type {boolean} */
    this.isRange = false;
    /**@type {CheckWork[]} レッスンに存在するチェックワーク。*/
    this.checkworks = [];
    /**@type {any[]} */
    this.algorithmExercises = [];
    /**@type {string} レッスンの説明。*/
    this.description = "";
    /**@type {string} レッスンのサムネイル。*/
    this.thumbnail = "";
    /**@type {string} レッスンで学ぶ内容の説明。*/
    this.learningContents = "";
    /**@type {boolean} チャットを用いる内容があるか？*/
    this.hasChatContents = false;
    /**@type {import("./types/lesson").LessonStartLink[]} レッスンの開始リンク。*/
    this.startLinks = [];
    /**@type {any} レッスンの再開リンク？*/
    this.continueLink = {};
    /**@type {Material[]} レッスンの「補助教材」リスト。*/
    this.materials = [];
    /**@type {Material[]} レッスンの「ワークシート」リスト。*/
    this.worksheetMaterials = [];
    /**@type {{id:number}?} レッスンのミニワーク。*/
    this.htmlWork = null;
    /**@type {string?} レッスンにCloud9が結び付けられている場合のリンク。*/
    this.cloud9Link = null;
  }
  async load() {
    const res = await fetch(
      // `${BASEAPI}/chapters/${this.chapter.id}/lessons/${this.id}?lesson_group_id=133658`,
      `${API_URL}/chapters/${this.chapter.id}/lessons/${this.id}`,
      {
        headers: {
          authorization: `Bearer ${this.chapter.course.user.token}`,
        },
        method: "GET",
        mode: "cors",
      },
    );
    const rawjson = await checkAuthParseJSON(res);
    this.isRange = rawjson.is_range;
    this.checkworks = rawjson.checkworks.map(
      /**@param {any} j*/ (j) => new CheckWork(),
    );
    this.algorithmExercises = rawjson.algorithm_exercises;
    this.description = rawjson.description;
    this.thumbnail = rawjson.thumbnail;
    this.learningContents = rawjson.learning_contents;
    this.hasChatContents = rawjson.has_chat_contents;
    this.startLinks = rawjson.start_links.map(
      /**@param {any} j*/ (j) => ({
        scenarioId: j.scenario_id,
        type: j.type,
        playerUrl: j.player_url,
      }),
    );
    this.continueLink = rawjson.continue_link;
    this.materials = rawjson.materials.map(
      /**@param {any} j*/ (j) => new Material(/*j, this, false*/),
    );
    this.worksheetMaterials = rawjson.worksheet_materials.map(
      /**@param {any} j*/ (j) => new Material(/*j, this, true*/),
    );
    this.htmlWork = rawjson.html_work;
    this.cloud9Link = rawjson.cloud9_link ?? null;
    return this;
  }
  isInfoLoaded() {
    return typeof this.description === "string";
  }
}

module.exports = { Lesson, LessonBase };
