import { API_URL, DeferedArray } from "./util";

/**
 * @typedef {import("./types/user").User} User
 */

/**
 * 認証トークンを用いてユーザーを取得する。
 * @param {string} token
 * @returns {Promise<User>}
 */
async function getUser(token) {
  /**@type {User} */
  const user = {
    test: "true",
  };
  return user;
}
