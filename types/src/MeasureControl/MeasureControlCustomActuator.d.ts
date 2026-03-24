export class MeasureControlCustomActuator {
    /**
     *
     * @param {any} rawjson
     * @param {import("./MeasureControlSystem").MeasureControlSystem} mcSystem
     */
    constructor(rawjson: any, mcSystem: import("./MeasureControlSystem").MeasureControlSystem);
    /**@type {string} */
    id: string;
    /**@type {"custom"} */
    type: "custom";
    /**@type {string} */
    name: string;
    /**@type {string} */
    offImageAsset: string;
    /**@type {string} */
    onImageAsset: string;
    /**@type {any[]} */
    effects: any[];
    mcSystem: import("./MeasureControlSystem").MeasureControlSystem;
    toJSON(): {
        id: string;
        type: "custom";
        name: string;
        imagePath: {
            off: string;
            on: string;
        };
        effects: any[];
    };
    getActuator(): import("./MeasureControlActuator").MeasureControlActuator | undefined;
}
