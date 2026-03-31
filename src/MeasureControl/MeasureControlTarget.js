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
    this.conditions = rawjson.conditions.map(
      /**@param {any} c */
      (c) => new MeasureControlCondition(c, this),
    );
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
  /**
   * 名前を変更する。
   * @param {string} newName
   */
  rename(newName) {
    this.name = newName;
    return this;
  }
  /**
   * 複数条件への対応ルールを設定するか、切り替える。
   * @param {"all"|"any"|null} newLogic
   */
  changeConditionLogic(newLogic = null) {
    if (!newLogic)
      this.conditionLogic = this.conditionLogic === "all" ? "any" : "all";
    else this.conditionLogic = this.conditionLogic;
    return this;
  }

  /**
   * @overload
   * 数値比較を行う条件を追加する。
   * @param {import("./MeasureControlActuator").MeasureControlActuator|import("./MeasureControlSensor").MeasureControlSensor} targetObject
   * @param {number} value
   * @param {"gt"|"eq"|"lt"} comparisonOperator
   * @returns {this}
   */
  /**
   * @overload
   * ON/OFF比較を行う条件を追加する。
   * @param {import("./MeasureControlActuator").MeasureControlActuator|import("./MeasureControlSensor").MeasureControlSensor} targetObject
   * @param {"ON"|"OFF"} value
   * @param {null} comparisonOperator
   * @returns {this}
   */
  /**
   * 条件を追加する。
   * @param {import("./MeasureControlActuator").MeasureControlActuator|import("./MeasureControlSensor").MeasureControlSensor} targetObject
   * @param {number|"ON"|"OFF"} value
   * @param {"gt"|"eq"|"lt"|null} comparisonOperator
   * @returns {this}
   */
  addCondition(targetObject, value, comparisonOperator = null) {
    const objectKind = targetObject.getKind();
    this.conditions.push(
      new MeasureControlCondition(
        {
          kind: objectKind,
          placementId: targetObject.id,
          value: typeof value === "number" ? value : null,
          comparisonOperator,
          state: typeof value === "string" ? value : null,
        },
        this,
      ),
    );
    return this;
  }
}
module.exports = { MeasureControlTarget };
