export type Loadable<T> = import("../types/util.js").Loadable<T>;
/**
 * @implements {Loadable<MeasureControlSystem>}
 * Chapter8で作成できるオリジナル計測制御システムのベース。
 * idと元ユーザーのみを保有する。
 */
export class MeasureControlSystemBase implements Loadable<MeasureControlSystem> {
    /**
     * @param {number} id
     * @param {import("../user.js").UserBase} user
     */
    constructor(id: number, user: import("../user.js").UserBase);
    /**
     * システムのid。
     */
    id: number;
    user: import("../user.js").UserBase;
    loaded: MeasureControlSystem | null;
    /**
     * リクエストを行い、全ての情報を取得する。
     */
    load(): Promise<MeasureControlSystem>;
    /**
     * リクエスト済みの場合はそのオブジェクトを、\
     * でなければリクエストを行ってオブジェクトを取得する。
     */
    getLoaded(): Promise<MeasureControlSystem>;
}
export class MeasureControlSystem extends MeasureControlSystemBase {
    /**@param {MeasureControlSystemBase} base  */
    constructor(base: MeasureControlSystemBase);
    loaded: this;
    /**@type {string} スプリクト。*/
    programCode: string;
    /**@type {MeasureControlAssets} ユーザーがアップロードしたアセット。 */
    customAssetUrls: MeasureControlAssets;
    /**@type {MeasureControlSensor[]} */
    sensorPlacements: MeasureControlSensor[];
    /**@type {MeasureControlActuator[]} */
    actuatorPlacements: MeasureControlActuator[];
    /**@type {MeasureControlCustomSensor[]} */
    customSensorDefinitions: MeasureControlCustomSensor[];
    /**@type {MeasureControlCustomActuator[]} */
    customActuatorDefinitions: MeasureControlCustomActuator[];
    /**@type {any} */
    distanceTarget: any;
    /**@type {MeasureControlTarget} */
    target: MeasureControlTarget;
    /**@type {string} */
    backgroundId: string;
    /**@type {any} */
    backgroundImageUrl: any;
    /**@type {{cropArea: { width: number, height: number, x: number, y: number },  id: string,  name: string,  environment: string,  imageKey: string,}?} */
    customBackground: {
        cropArea: {
            width: number;
            height: number;
            x: number;
            y: number;
        };
        id: string;
        name: string;
        environment: string;
        imageKey: string;
    } | null;
    /**@type {"indoor"|"outdoor"} */
    environmentType: "indoor" | "outdoor";
    load(): Promise<this>;
}
import { MeasureControlAssets } from "./MeasureControlAssets.js";
import { MeasureControlSensor } from "./MeasureControlSensor.js";
import { MeasureControlActuator } from "./MeasureControlActuator.js";
import { MeasureControlCustomSensor } from "./MeasureControlCustomSensor.js";
import { MeasureControlCustomActuator } from "./MeasureControlCustomActuator.js";
import { MeasureControlTarget } from "./MeasureControlTarget.js";
