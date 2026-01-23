/**@type {import("../dist/types/src/index")} */
var LifeIsTechAPI = LifeIsTechAPI;

async function main() {
  const token = "hogehogefugafuga";
  const userBase = new LifeIsTechAPI.UserBase(token);
  // AccountNotAvailableError: Token is invaild
  userBase.load().catch(console.error);
  // AccountNotAvailableError: Account is not available
  userBase.getPages().catch(console.error);
}

main();
