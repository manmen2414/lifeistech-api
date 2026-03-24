class Material {
  /**
   * @param {any} rawjson
   * @param {boolean} isWorksheetMaterial
   * @param {import("./lesson.js").Lesson} lesson
   */
  constructor(rawjson, isWorksheetMaterial, lesson) {
    /**@type {number} 教材ID。 */
    this.id = rawjson.id;
    /**@type {string} 教材の名前。 */
    this.label = rawjson.label;
    /**@type {string} 教材へアクセスするリンク。 */
    this.link = rawjson.link;
    /**この教材がワークシートであるか。 */
    this.isWorksheetMaterial = isWorksheetMaterial;

    this.lesson = lesson;
  }
}
module.exports = { Material };
