class MeasureControlAssets {
  /**
   * @param {{[assetId:string]:string}} rawjson
   * @param {import("./MeasureControlSystem.js").MeasureControlSystem} mcSystem
   * */
  constructor(rawjson, mcSystem) {
    this.mcSystem = mcSystem;
    /**@type {[key:string,url:string][]} */
    this.assets = Object.entries(rawjson);
  }
  /**
   * @param {string} assetName
   */
  getURL(assetName) {
    const asset = this.assets.find(([k]) => assetName === k);
    return asset && `https://api.lifeistech-lesson.jp${asset[1]}`;
  }
}

module.exports = { MeasureControlAssets };
