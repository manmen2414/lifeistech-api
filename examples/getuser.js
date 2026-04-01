// WebJSでは下行を削除してdist/lit-api.jsを読み込むことで実行が可能
const LifeIsTechAPI = require("../src");

async function main() {
  const token = await LifeIsTechAPI.tryGetMozermovie();
  if (!token) throw new Error("no token");
  const userBase = new LifeIsTechAPI.UserBase(token);
  const user = await userBase.load();
  console.log(user);
}

main();
