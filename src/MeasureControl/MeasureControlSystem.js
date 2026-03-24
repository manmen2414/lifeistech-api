const { MeasureControlTarget } = require("./MeasureControlTarget.js");

/**
 * @typedef {import("../types/util.js").Loadable<T>} Loadable
 * @template T
 */
const { API_URL, reportLizodError, checkAuthParseJSON } = require("../util.js");
const { MeasureControlAssets } = require("./MeasureControlAssets.js");
const z = require("lizod");
const API_CH8_URL = `${API_URL}/measure_control_original_works/`;
const { MeasureControlActuator } = require("./MeasureControlActuator.js");
const { MeasureControlSensor } = require("./MeasureControlSensor.js");
const {
  MeasureControlCustomSensor,
} = require("./MeasureControlCustomSensor.js");
const {
  MeasureControlCustomActuator,
} = require("./MeasureControlCustomActuator.js");

/**
 * @implements {Loadable<MeasureControlSystem>}
 * Chapter8で作成できるオリジナル計測制御システムのベース。
 * idと元ユーザーのみを保有する。
 */
class MeasureControlSystemBase {
  /**
   * @param {number} id
   * @param {import("../user.js").UserBase} user
   */
  constructor(id, user) {
    /**
     * システムのid。
     */
    this.id = id;
    this.user = user;
    this.loaded = null;
  }
  /**
   * リクエストを行い、全ての情報を取得する。
   */
  async load() {
    const mcsystem = new MeasureControlSystem(this);
    await mcsystem.load();
    this.loaded = mcsystem;
    return mcsystem;
  }
  /**
   * リクエスト済みの場合はそのオブジェクトを、\
   * でなければリクエストを行ってオブジェクトを取得する。
   */
  async getLoaded() {
    if (!this.loaded) return await this.load();
    return this.loaded;
  }
}

class MeasureControlSystem extends MeasureControlSystemBase {
  /**@param {MeasureControlSystemBase} base  */
  constructor(base) {
    super(base.id, base.user);
    this.loaded = this;
    /**@type {string} スプリクト。*/
    this.programCode = "";
    /**@type {MeasureControlAssets} ユーザーがアップロードしたアセット。 */
    this.customAssetUrls = new MeasureControlAssets({}, this);
    /**@type {MeasureControlSensor[]} */
    this.sensorPlacements = [];
    /**@type {MeasureControlActuator[]} */
    this.actuatorPlacements = [];
    /**@type {MeasureControlCustomSensor[]} */
    this.customSensorDefinitions = [];
    /**@type {MeasureControlCustomActuator[]} */
    this.customActuatorDefinitions = [];
    /**@type {any} */
    this.distanceTarget = null;
    /**@type {MeasureControlTarget} */
    this.target = new MeasureControlTarget(
      {
        id: "",
        name: "",
        imagePath: {
          before: "",
          after: "",
        },
        conditions: [],
        conditionLogic: "all",
        position: { x: NaN, y: NaN },
      },
      this,
    );
    /**@type {string} */
    this.backgroundId = "";
    /**@type {any} */
    this.backgroundImageUrl = null;
    /**@type {{cropArea: { width: number, height: number, x: number, y: number },  id: string,  name: string,  environment: string,  imageKey: string,}?} */
    this.customBackground = null;
    /**@type {"indoor"|"outdoor"} */
    this.environmentType = "indoor";
  }
  async load() {
    // API Request
    const res = await fetch(`${API_CH8_URL}/${this.id}`, {
      headers: {
        authorization: `Bearer ${this.user.token}`,
      },
      method: "GET",
      mode: "cors",
    });
    const rawjson = await checkAuthParseJSON(res);

    this.programCode = rawjson.program_code;
    this.customAssetUrls = new MeasureControlAssets(
      rawjson.custom_asset_urls,
      this,
    );
    this.sensorPlacements = rawjson.scene_definition_json.sensorPlacements.map(
      /**@param {any} s  */
      (s) => new MeasureControlSensor(s, this),
    );
    this.actuatorPlacements =
      rawjson.scene_definition_json.actuatorPlacements.map(
        /**@param {any} s  */
        (s) => new MeasureControlActuator(s, this),
      );
    this.customSensorDefinitions =
      rawjson.scene_definition_json.customSensorDefinitions.map(
        /**@param {any} s  */
        (s) => new MeasureControlCustomSensor(s, this),
      );
    this.customActuatorDefinitions =
      rawjson.scene_definition_json.customActuatorDefinitions.map(
        /**@param {any} s  */
        (s) => new MeasureControlCustomActuator(s, this),
      );
    this.distanceTarget = rawjson.scene_definition_json.distanceTarget;
    this.target = new MeasureControlTarget(
      rawjson.scene_definition_json.target,
      this,
    );
    this.backgroundId = rawjson.scene_definition_json.backgroundId;
    this.backgroundImageUrl = rawjson.scene_definition_json.backgroundImageUrl;
    this.customBackground = rawjson.scene_definition_json.customBackground;
    this.environmentType = rawjson.scene_definition_json.environmentType;
    return this;
  }
}

module.exports = { MeasureControlSystemBase, MeasureControlSystem };
