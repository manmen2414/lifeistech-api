class CheckWorkResult {
  /**
   * @param {any} rawjson
   * @param {import("./chapter").ChapterBase} chapter
   */
  constructor(rawjson, chapter) {
    /**@type {number} */
    this.id = rawjson.id;
    /**@type {Date} */
    this.submittedAt = new Date(rawjson.submitted_at);
    /**@type {number} */
    this.score = rawjson.score;
    /**@type {number} */
    this.checkworkId = rawjson.checkwork.id;
    this.chapter = chapter;
  }
}
module.exports = { CheckWorkResult };
