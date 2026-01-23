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

  await userBase.createPage("", []).then(console.log);
  await userBase.createPage("test", ["hoge"]).then(console.log);
  await userBase.createPage("", ["hoge"]).then(console.log);
  await userBase.createPage("LifeisTechAPI-Develop", []).then(console.log);
}

main();
