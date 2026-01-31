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
  const [_, course] = await userBase.getCourses();
  const [chapter1] = course.chapters;
  const [result] = await chapter1.getCheckworkScores();
  console.log(result);
  const [lesson1] = chapter1.lessons;
  const [checkwork] = (await lesson1.load()).checkworks;
  const answerer = await checkwork.getAnswerer();
  console.log(answerer);
  window.answerer = answerer;
}

main();
