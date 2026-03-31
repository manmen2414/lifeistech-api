export class MeasureControlActuator extends MeasureControlMoveable {
    /**
     * @param {any} rawjson
     * @param {import("./MeasureControlSystem").MeasureControlSystem} mcSystem
     */
    constructor(rawjson: any, mcSystem: import("./MeasureControlSystem").MeasureControlSystem);
    mcSystem: import("./MeasureControlSystem").MeasureControlSystem;
    /**@type {string} アクチュエータのid */
    id: string;
    /**@type {string} アクチュエータ種別 */
    type: string;
    /**@type {string} プログラム上の変数名 */
    variableName: string;
    /**@type {number} アクチュエータの大きさ */
    scale: number;
    /**@type {string?} ユーザー定義アクチュエータの設定のid。 */
    customDefinitionId: string | null;
    /**@returns {"actuator"} */
    getKind(): "actuator";
    toJSON(): {
        id: string;
        type: string;
        position: {
            x: number;
            y: number;
        };
        variableName: string;
        scale: number;
        customDefinitionId: string | null;
    };
}
import { MeasureControlMoveable } from "./MeasureControlMoveable";
