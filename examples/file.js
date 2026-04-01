// WebJSでは下行を削除してdist/lit-api.jsを読み込むことで実行が可能
const LifeIsTechAPI = require("../src");

async function main() {
  const token = await LifeIsTechAPI.tryGetMozermovie();
  if (!token) throw new Error("no token");

  const userBase = new LifeIsTechAPI.UserBase(token);
  const pages = await userBase.getPages();
  // LifeisTechAPI-Developというページ名であるページを取得
  const devPage = pages.find((b) => b.name === "LifeisTechAPI-Develop");
  if (!devPage) return;
  // 成功パターン
  const created = await devPage.addFile("test", "js");
  console.log("Created", created);
  // 失敗パターン1: 異常な拡張子 .a
  const notCreated = await devPage.addFile("testa.js", "a");
  console.log("Not Created", notCreated);
  // 失敗パターン2: 重複したファイル
  const notCreated2 = await devPage.addFile("test", "js");
  console.log("Not Created 2", notCreated2);
  if (!created) return;

  // loadを用いてページ内部のファイルを読み込む。
  const page = await devPage.load();
  // さっき作った空のJavaScriptファイルを取得する
  const testFile = page.files.find((n) => n.name === "test.js");
  console.log("test.js: ", testFile);
  if (!testFile) return;
  // ファイルを編集する
  const saved = await testFile.editAndSave("// BANANA");
  console.log("Saved", saved);
  // システムの更新完了を待つ 500msあれば更新できる...はず
  setTimeout(async () => {
    // ファイルの削除
    const deleted = await testFile.delete();
    console.log("Deleted", deleted);
  }, 500);
}

main();
