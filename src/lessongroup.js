/**@typedef {import("./user").UserBase} UserBase */

class LessonGroup {
  /**
   * @param {UserBase} user
   * @param {any} rawjson
   */
  constructor(rawjson, user) {
    /**@type {number} レッスングループのID。 */
    this.id = rawjson.id;
    /**@type {string} レッスングループの名前。*/
    this.name = rawjson.name;
    /**@type {Date} レッスングループの作成日。*/
    this.createdAt = new Date(rawjson.created_at);
    /**@type {Date} レッスングループの更新日。*/
    this.updatedAt = new Date(rawjson.updated_at);
    /**@type {number} 学校ID。*/
    this.schoolId = rawjson.school_id;
    /**@type {number} グループの年度。*/
    this.year = rawjson.year;
    /**@type {number} */
    this.lessonPatternId = rawjson.lesson_pattern_id;
    /**@type {number} グループの学年。*/
    this.grade = rawjson.grade;
    /**@type {number} レッスンコースのID。*/
    this.lessonCourseId = rawjson.lesson_course_id;
    /**@type {boolean} ドリルが有効か。*/
    this.drillAvailable = rawjson.drill_available;
    /**@type {boolean} 試験が有効か。*/
    this.examAvailable = rawjson.exam_available;
    /**@type {UserBase} 取得元のユーザー。*/
    this.user = user;
  }
}

/**@deprecated LessonGroupBaseと全く同じ。*/
class Classroom extends LessonGroup {}

module.exports = { LessonGroup, Classroom };
