const LifeIsTechAPI = require("../src");
const fs = require("fs");
const { pipeline } = require("node:stream/promises");

async function main() {
  const token = await LifeIsTechAPI.tryGetMozermovie();
  if (!token) throw new Error("no token");
  const userBase = new LifeIsTechAPI.UserBase(token);
  // 最初のページを指定
  const pages = await userBase.getPages();
  const page = await pages[0].load();

  // ダウンロード
  const res = await page.getZipResponse();

  // レスポンスボディを書き込みストリームへ流し込む
  await pipeline(res.body, fs.createWriteStream("./page.zip"));
}

main();
