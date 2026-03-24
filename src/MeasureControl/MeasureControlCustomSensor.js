class MeasureControlCustomSensor {
  /**
   *
   * @param {any} rawjson
   * @param {import("./MeasureControlSystem").MeasureControlSystem} mcSystem
   */
  constructor(rawjson, mcSystem) {
    /**@type {string} */
    this.id = rawjson.id;
    /**@type {"custom"} */
    this.type = rawjson.type;
    /**@type {string} */
    this.name = rawjson.name;
    /**@type {"button"|"slider"} */
    this.inputType = rawjson.inputType;
    /**@type {number} */
    this.min = rawjson.min;
    /**@type {number} */
    this.max = rawjson.min;
    /**@type {number} */
    this.baseValue = rawjson.baseValue;
    /**@type {number} */
    this.displayDecimals = rawjson.displayDecimals;
    /**@type {string} */
    this.unit = rawjson.unit;
    /**@type {number} */
    this.noise = rawjson.noise;

    this.mcSystem = mcSystem;
  }
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      inputType: this.inputType,
      min: this.min,
      max: this.max,
      baseValue: this.baseValue,
      displayDecimals: this.displayDecimals,
      unit: this.unit,
      noise: this.noise,
    };
  }
  getSensor() {
    return this.mcSystem.sensorPlacements.find(
      (v) => v.customDefinitionId === this.id,
    );
  }
}

module.exports = { MeasureControlCustomSensor };
