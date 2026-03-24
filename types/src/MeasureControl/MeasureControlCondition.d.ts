/**
 * @template {boolean} _isToggleCondition
 */
export class MeasureControlCondition<_isToggleCondition extends boolean> {
    /**
     * @param {any} rawjson
     * @param {import("./MeasureControlTarget").MeasureControlTarget} mcTarget
     */
    constructor(rawjson: any, mcTarget: import("./MeasureControlTarget").MeasureControlTarget);
    mcTarget: import("./MeasureControlTarget").MeasureControlTarget;
    /**@type {"actuator"|"sensor"} */
    kind: "actuator" | "sensor";
    /**@type {string} */
    placementId: string;
    /**@type {_isToggleCondition extends true ? null : number} */
    value: _isToggleCondition extends true ? null : number;
    /**@type {_isToggleCondition extends true ? null : "gt"|"eq"|"lt"} gt:より大きい eq:等しい lt:より小さい*/
    comparisonOperator: _isToggleCondition extends true ? null : "gt" | "eq" | "lt";
    /**@type {_isToggleCondition extends true ? "ON"|"OFF" : null} */
    state: _isToggleCondition extends true ? "ON" | "OFF" : null;
    /**
     * @returns {this is MeasureControlCondition<true>}
     */
    isToggleCondition(): this is MeasureControlCondition<true>;
    toJSON(): {
        kind: "actuator" | "sensor";
        placementId: string;
    };
}
