export class MeasureControlCustomSensor {
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
    /**@type {"button"|"slider"} */
    inputType: "button" | "slider";
    /**@type {number} */
    min: number;
    /**@type {number} */
    max: number;
    /**@type {number} */
    baseValue: number;
    /**@type {number} */
    displayDecimals: number;
    /**@type {string} */
    unit: string;
    /**@type {number} */
    noise: number;
    mcSystem: import("./MeasureControlSystem").MeasureControlSystem;
    toJSON(): {
        id: string;
        type: "custom";
        name: string;
        inputType: "button" | "slider";
        min: number;
        max: number;
        baseValue: number;
        displayDecimals: number;
        unit: string;
        noise: number;
    };
    getSensor(): import("./MeasureControlSensor").MeasureControlSensor | undefined;
}
