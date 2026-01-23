/**@type {import("../dist/types/src/index")} */
var LifeIsTechAPI = LifeIsTechAPI;

async function getToken() {
  const tokenStore = await cookieStore.get("mozermovie");
  if (!tokenStore || !tokenStore.value) throw new Error("no token");
  return tokenStore.value;
}

async function main() {
  const token = await getToken();
  const userBase = new LifeIsTechAPI.UserBase(token);
  // Baseから直接取得可能
  const pages = await userBase.getPages();
  // Baseから直接名前確認可能
  const devPage = pages.find((b) => b.name === "LifeisTechAPI-Develop");
  if (!devPage) return;
  const created = await devPage.addFile("test", "js");
  console.log("Created", created);
  const notCreated = await devPage.addFile("testa.js", "a");
  // { error: "Unsupported Media Type" }
  console.log("Not Created", notCreated);
  const notCreated2 = await devPage.addFile("test", "js");
  // { error: "Conflict" }
  console.log("Not Created 2", notCreated2);
  if (!created) return;
  // 情報の更新という意味も兼ねる。
  const page = await devPage.load();
  const testFile = page.files.find((n) => n.name === "test.js");
  console.log(testFile);
  if (!testFile) return;
  const saved = await testFile.editAndSave("// BANANA");
  // { successed: true }
  console.log("Saved", saved);
  setTimeout(async () => {
    const deleted = await testFile.delete();
    // true
    console.log("Deleted", deleted);
  }, 500);
}

main();
