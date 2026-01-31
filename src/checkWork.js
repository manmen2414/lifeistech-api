const { CheckWorkAnswerer } = require("./checkWorkAnswerer");
const { API_URL, checkAuthParseJSON } = require("./util");

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
  async getAnswerer() {
    const res = await fetch(
      `${API_URL}/chapters/${this.lesson.chapter.id}/lessons/${this.lesson.id}/checkworks/next`,
      {
        headers: {
          authorization: `Bearer ${this.lesson.chapter.course.user.token}`,
        },
        method: "GET",
        mode: "cors",
      },
    );
    const json = checkAuthParseJSON(res);
    return new CheckWorkAnswerer(json, this);
  }
}
module.exports = { CheckWork };
