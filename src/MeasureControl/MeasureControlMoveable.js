class MeasureControlMoveable {
  /**
   * @param {any} rawjson
   */
  constructor(rawjson) {
    /**@type {number} X座標。 */
    this.x = rawjson.position.x;
    /**@type {number} Y座標。 */
    this.y = rawjson.position.y;
  }
  /**
   * @param {MeasureControlMoveable} toMoveable
   */
  moveTo(toMoveable) {
    this.x = toMoveable.x;
    this.y = toMoveable.y;
  }
  /**
   * @param {MeasureControlMoveable} targetMoveable
   */
  moveTarget(targetMoveable) {
    targetMoveable.moveTo(this);
  }
  get position() {
    return { x: this.x, y: this.y };
  }
  set position(val) {
    this.x = val.x;
    this.y = val.y;
  }
  /**
   * @param {MeasureControlMoveable} moveable
   */
  isPositionEqual(moveable) {
    return moveable.x === this.x && moveable.y === this.y;
  }
}
module.exports = { MeasureControlMoveable };
