// WebJSでは下行を削除してdist/lit-api.jsを読み込むことで実行が可能
const LifeIsTechAPI = require("../src");

async function main() {
  const token = await LifeIsTechAPI.tryGetMozermovie();
  if (!token) throw new Error("no token");

  const userBase = new LifeIsTechAPI.UserBase(token);

  // 失敗パターン1: 無名ページ
  await userBase.createPage("", []).then(console.log);
  // 失敗パターン2: 不明なページコンポーネント
  await userBase.createPage("test", ["hoge"]).then(console.log);
  // 失敗パターン3: 1と2の混合
  await userBase.createPage("", ["hoge"]).then(console.log);
  // 成功パターン: LifeisTechAPI-Developページの制作
  await userBase.createPage("LifeisTechAPI-Develop", []).then(console.log);
}

main();
