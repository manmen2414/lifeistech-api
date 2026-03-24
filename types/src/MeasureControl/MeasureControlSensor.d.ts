export class MeasureControlSensor extends MeasureControlMoveable {
    /**
     * @param {any} rawjson
     * @param {import("./MeasureControlSystem").MeasureControlSystem} mcSystem
     */
    constructor(rawjson: any, mcSystem: import("./MeasureControlSystem").MeasureControlSystem);
    mcSystem: import("./MeasureControlSystem").MeasureControlSystem;
    /**@type {string} センサーのid */
    id: string;
    /**@type {string} センサー種別 */
    type: string;
    /**@type {string} プログラム上の変数名 */
    variableName: string;
    /**@type {{kind:"auto"}?} 情報の提供源？ */
    source: {
        kind: "auto";
    } | null;
    /**@type {string?} ユーザー定義センサーの設定のid。 */
    customDefinitionId: string | null;
    toJSON(): {
        id: string;
        type: string;
        position: {
            x: number;
            y: number;
        };
        variableName: string;
        source: {
            kind: "auto";
        } | null;
        customDefinitionId: string | null;
    };
}
import { MeasureControlMoveable } from "./MeasureControlMoveable";
