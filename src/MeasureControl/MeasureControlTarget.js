const { MeasureControlMoveable } = require("./MeasureControlMoveable");
const { MeasureControlCondition } = require("./MeasureControlCondition");

class MeasureControlTarget extends MeasureControlMoveable {
  /**
   *
   * @param {any} rawjson
   * @param {import("./MeasureControlSystem").MeasureControlSystem} mcSystem
   */
  constructor(rawjson, mcSystem) {
    super(rawjson);
    this.mcSystem = mcSystem;
    /**@type {string} ターゲットのid */
    this.id = rawjson.id;
    /**@type {string} ターゲットの名前。*/
    this.name = rawjson.name;
    /**@type {string} ターゲットが変化する前の画像アセットid。*/
    this.beforeImageAsset = rawjson.imagePath.before;
    /**@type {string} ターゲットが変化した後の画像アセットid。*/
    this.afterImageAsset = rawjson.imagePath.after;
    /**@type {MeasureControlCondition<boolean>[]} ターゲットが変化する条件。*/
    this.conditions = [];
    /**@type {"all"|"any"} 条件の全てを満たした際に変化するか、どれかを満たした際に変化するか*/
    this.conditionLogic = "all";
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      imagePath: {
        before: this.beforeImageAsset,
        after: this.afterImageAsset,
      },
      conditions: this.conditions.map((c) => c.toJSON()),
      conditionLogic: this.conditionLogic,
      position: this.position,
    };
  }
}
module.exports = { MeasureControlTarget };
