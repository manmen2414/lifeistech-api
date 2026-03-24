/**
 * @template {boolean} _isToggleCondition
 */
class MeasureControlCondition {
  /**
   * @param {any} rawjson
   * @param {import("./MeasureControlTarget").MeasureControlTarget} mcTarget
   */
  constructor(rawjson, mcTarget) {
    this.mcTarget = mcTarget;

    /**@type {"actuator"|"sensor"} */
    this.kind = rawjson.kind;
    /**@type {string} */
    this.placementId = rawjson.placementId;
    /**@type {_isToggleCondition extends true ? null : number} */
    this.value = rawjson.value ?? null;
    /**@type {_isToggleCondition extends true ? null : "gt"|"eq"|"lt"} gt:より大きい eq:等しい lt:より小さい*/
    this.comparisonOperator = rawjson.comparisonOperator ?? null;
    /**@type {_isToggleCondition extends true ? "ON"|"OFF" : null} */
    this.state = rawjson.state ?? null;
  }
  /**
   * @returns {this is MeasureControlCondition<true>}
   */
  isToggleCondition() {
    return (
      this.value === null &&
      this.comparisonOperator === null &&
      this.state !== null
    );
  }
  toJSON() {
    const base = {
      kind: this.kind,
      placementId: this.placementId,
    };
    if (this.isToggleCondition()) {
      Object.assign(base, { state: this.state });
    } else {
      Object.assign(base, {
        value: this.value,
        comparisonOperator: this.comparisonOperator,
      });
    }
    return base;
  }
}

module.exports = { MeasureControlCondition };
