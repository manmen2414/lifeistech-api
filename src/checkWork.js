class CheckWork {
  /**
   * @param {any} rawjson
   * @param {import("./lesson").LessonBase} lesson
   */
  constructor(rawjson, lesson) {
    /**@type {number} */
    this.id = rawjson.id;
    this.lesson = lesson;
  }
  getAnswerer() {}
}
module.exports = { CheckWork };
