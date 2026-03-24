export class MeasureControlAssets {
    /**
     * @param {{[assetId:string]:string}} rawjson
     * @param {import("./MeasureControlSystem.js").MeasureControlSystem} mcSystem
     * */
    constructor(rawjson: {
        [assetId: string]: string;
    }, mcSystem: import("./MeasureControlSystem.js").MeasureControlSystem);
    mcSystem: import("./MeasureControlSystem.js").MeasureControlSystem;
    /**@type {[key:string,url:string][]} */
    assets: [key: string, url: string][];
    /**
     * @param {string} assetName
     */
    getURL(assetName: string): string | undefined;
}
