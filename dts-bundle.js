const path = require("path");
const here = path.resolve(__dirname);
const dtsbundle = require("dts-bundle-generator");
const fs = require("fs");

const result = dtsbundle.generateDtsBundle([
  {
    filePath: path.resolve(`${here}/types/src/index.d.ts`),
    output: {
      umdModuleName: "LifeIsTechAPI",
    },
  },
]);
fs.writeFileSync(path.resolve(`${here}/dist/LifeIsTechAPI.d.ts`), result[0]);
