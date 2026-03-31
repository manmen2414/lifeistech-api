const { MeasureControlMoveable } = require("./MeasureControlMoveable");

class MeasureControlActuator extends MeasureControlMoveable {
  /**
   * @param {any} rawjson
   * @param {import("./MeasureControlSystem").MeasureControlSystem} mcSystem
   */
  constructor(rawjson, mcSystem) {
    super(rawjson);
    this.mcSystem = mcSystem;
    /**@type {string} アクチュエータのid */
    this.id = rawjson.id;
    /**@type {string} アクチュエータ種別 */
    this.type = rawjson.type;
    /**@type {string} プログラム上の変数名 */
    this.variableName = rawjson.variableName;
    /**@type {number} アクチュエータの大きさ */
    this.scale = rawjson.scale ?? 1;
    /**@type {string?} ユーザー定義アクチュエータの設定のid。 */
    this.customDefinitionId = rawjson.customDefinitionId ?? null;
  }
  /**@returns {"actuator"} */
  getKind() {
    return "actuator";
  }
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      position: this.position,
      variableName: this.variableName,
      scale: this.scale,
      customDefinitionId: this.customDefinitionId,
    };
  }
}

module.exports = { MeasureControlActuator };
