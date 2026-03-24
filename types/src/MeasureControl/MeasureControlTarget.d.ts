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
}
import { MeasureControlMoveable } from "./MeasureControlMoveable";
import { MeasureControlCondition } from "./MeasureControlCondition";
