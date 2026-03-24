export class MeasureControlMoveable {
    /**
     * @param {any} rawjson
     */
    constructor(rawjson: any);
    /**@type {number} X座標。 */
    x: number;
    /**@type {number} Y座標。 */
    y: number;
    /**
     * @param {MeasureControlMoveable} toMoveable
     */
    moveTo(toMoveable: MeasureControlMoveable): void;
    /**
     * @param {MeasureControlMoveable} targetMoveable
     */
    moveTarget(targetMoveable: MeasureControlMoveable): void;
    set position(val: {
        x: number;
        y: number;
    });
    get position(): {
        x: number;
        y: number;
    };
    /**
     * @param {MeasureControlMoveable} moveable
     */
    isPositionEqual(moveable: MeasureControlMoveable): boolean;
}
