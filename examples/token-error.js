// WebJSでは下行を削除してdist/lit-api.jsを読み込むことで実行が可能
const LifeIsTechAPI = require("../src");

async function main() {
  const token = "hogehogefugafuga";
  const userBase = new LifeIsTechAPI.UserBase(token);
  // AccountNotAvailableError: Token is invaild
  userBase.load().catch(console.error);
  // AccountNotAvailableError: Account is not available
  userBase.getPages().catch(console.error);
}

main();
