const { MeasureControlMoveable } = require("./MeasureControlMoveable");

class MeasureControlSensor extends MeasureControlMoveable {
  /**
   * @param {any} rawjson
   * @param {import("./MeasureControlSystem").MeasureControlSystem} mcSystem
   */
  constructor(rawjson, mcSystem) {
    super(rawjson);
    this.mcSystem = mcSystem;
    /**@type {string} センサーのid */
    this.id = rawjson.id;
    /**@type {string} センサー種別 */
    this.type = rawjson.type;
    /**@type {string} プログラム上の変数名 */
    this.variableName = rawjson.variableName;
    /**@type {{kind:"auto"}?} 情報の提供源？ */
    this.source = rawjson.source ?? null;
    /**@type {string?} ユーザー定義センサーの設定のid。 */
    this.customDefinitionId = rawjson.customDefinitionId ?? null;
  }
  /**@returns {"sensor"} */
  getKind() {
    return "sensor";
  }
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      position: this.position,
      variableName: this.variableName,
      source: this.source,
      customDefinitionId: this.customDefinitionId,
    };
  }
}

module.exports = { MeasureControlSensor };
