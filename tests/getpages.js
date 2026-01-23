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
  pages.forEach((pb) => {
    console.log(`${pb.id}: ${pb.name}`);
  });

  // 最初のページ
  const page = await pages[0].load();
  console.log(page);
}

main();
