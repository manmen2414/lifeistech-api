// WebJSでは下行を削除してdist/lit-api.jsを読み込むことで実行が可能
const LifeIsTechAPI = require("../src");

async function main() {
  const token = await LifeIsTechAPI.tryGetMozermovie();
  if (!token) throw new Error("no token");
  // ユーザーの取得
  const userBase = new LifeIsTechAPI.UserBase(token);
  // 2番目のコースの取得 (1番目のコースにはchapter0しかないため用いない)
  const [_, course] = await userBase.getCourses();
  // Chapter1の取得
  const [chapter1] = course.chapters;
  // chapter1の1番目のチェックワーク結果
  const [result] = await chapter1.getCheckworkScores();
  // チェックワーク結果の報告
  console.log(result);
}

main();
