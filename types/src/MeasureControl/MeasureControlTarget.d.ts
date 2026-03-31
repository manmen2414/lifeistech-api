export class MeasureControlTarget extends MeasureControlMoveable {
    /**
     *
     * @param {any} rawjson
     * @param {import("./MeasureControlSystem").MeasureControlSystem} mcSystem
     */
    constructor(rawjson: any, mcSystem: import("./MeasureControlSystem").MeasureControlSystem);
    mcSystem: import("./MeasureControlSystem").MeasureControlSystem;
    /**@type {string} ターゲットのid */
    id: string;
    /**@type {string} ターゲットの名前。*/
    name: string;
    /**@type {string} ターゲットが変化する前の画像アセットid。*/
    beforeImageAsset: string;
    /**@type {string} ターゲットが変化した後の画像アセットid。*/
    afterImageAsset: string;
    /**@type {MeasureControlCondition<boolean>[]} ターゲットが変化する条件。*/
    conditions: MeasureControlCondition<boolean>[];
    /**@type {"all"|"any"} 条件の全てを満たした際に変化するか、どれかを満たした際に変化するか*/
    conditionLogic: "all" | "any";
    toJSON(): {
        id: string;
        name: string;
        imagePath: {
            before: string;
            after: string;
        };
        conditions: {
            kind: "actuator" | "sensor";
            placementId: string;
        }[];
        conditionLogic: "all" | "any";
        position: {
            x: number;
            y: number;
        };
    };
    /**
     * 名前を変更する。
     * @param {string} newName
     */
    rename(newName: string): this;
    /**
     * 複数条件への対応ルールを設定するか、切り替える。
     * @param {"all"|"any"|null} newLogic
     */
    changeConditionLogic(newLogic?: "all" | "any" | null): this;
    /**
     * @overload
     * 数値比較を行う条件を追加する。
     * @param {import("./MeasureControlActuator").MeasureControlActuator|import("./MeasureControlSensor").MeasureControlSensor} targetObject
     * @param {number} value
     * @param {"gt"|"eq"|"lt"} comparisonOperator
     * @returns {this}
     */
    addCondition(targetObject: import("./MeasureControlActuator").MeasureControlActuator | import("./MeasureControlSensor").MeasureControlSensor, value: number, comparisonOperator: "gt" | "eq" | "lt"): this;
    /**
     * @overload
     * ON/OFF比較を行う条件を追加する。
     * @param {import("./MeasureControlActuator").MeasureControlActuator|import("./MeasureControlSensor").MeasureControlSensor} targetObject
     * @param {"ON"|"OFF"} value
     * @param {null} comparisonOperator
     * @returns {this}
     */
    addCondition(targetObject: import("./MeasureControlActuator").MeasureControlActuator | import("./MeasureControlSensor").MeasureControlSensor, value: "ON" | "OFF", comparisonOperator: null): this;
}
import { MeasureControlMoveable } from "./MeasureControlMoveable";
import { MeasureControlCondition } from "./MeasureControlCondition";
