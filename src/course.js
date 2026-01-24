/**@typedef {import("./user").UserBase} UserBase */

const { ChapterBase } = require("./chapter");

class Course {
  /**
   * @param {UserBase} user
   * @param {any} rawjson
   */
  constructor(rawjson, user) {
    /**@type {number} コースのID。 */
    this.id = rawjson.id;
    /**@type {string} コース名。*/
    this.name = rawjson.title;
    /**@type {ChapterBase} */
    this.chapters = rawjson.chapters.map(
      /**@param {any} c  */
      (c) => new ChapterBase(c, this),
    );
    /**@type {UserBase} 取得元のユーザー。*/
    this.user = user;
  }
}
module.exports = { Course };
