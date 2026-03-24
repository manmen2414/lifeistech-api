class MeasureControlCustomActuator {
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
    /**@type {string} */
    this.offImageAsset = rawjson.imagePath.off;
    /**@type {string} */
    this.onImageAsset = rawjson.imagePath.on;
    /**@type {any[]} */
    this.effects = rawjson.effects;

    this.mcSystem = mcSystem;
  }
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      imagePath: {
        off: this.offImageAsset,
        on: this.onImageAsset,
      },
      effects: this.effects,
    };
  }
  getActuator() {
    return this.mcSystem.actuatorPlacements.find(
      (v) => v.customDefinitionId === this.id,
    );
  }
}

module.exports = { MeasureControlCustomActuator };
