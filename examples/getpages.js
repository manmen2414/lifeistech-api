// WebJSでは下行を削除してdist/lit-api.jsを読み込むことで実行が可能
const LifeIsTechAPI = require("../src");

async function main() {
  const token = await LifeIsTechAPI.tryGetMozermovie();
  if (!token) throw new Error("no token");
  const userBase = new LifeIsTechAPI.UserBase(token);
  // ページ一覧の取得
  const pages = await userBase.getPages();
  pages.forEach((pb) => {
    // idとページ名の対応
    console.log(`${pb.id}: ${pb.name}`);
  });
  // 最初のページを取得して表示
  const page = await pages[0].load();
  console.log("First:", page);
}

main();
