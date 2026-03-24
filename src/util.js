const { AccountNotAvailableError } = require("./errors");
const z = require("lizod");

const API_URL = "https://api.lifeistech-lesson.jp/api/players";
const API_CH5_URL = API_URL + "/chapters/36/web_sites/1/player_web_sites";
/**
 * キャラクター6人の画像を取得する。
 * おそらく没になった男子3と女子3のアナザーバージョンも取得できる。
 */
async function getCharactorsImage() {
  /**@type {string[]} */
  const charaDatas = [];
  const data = await fetch("https://member.lifeistech-lesson.jp/app-bundle.js");
  const text = await data.text();
  let now = text;
  while (1) {
    const regObj = /data:image\/png;base64,[0-9a-zA-Z\+\/=]+/g.exec(now);
    if (!regObj) break;
    charaDatas.push(regObj[0]);
    now = now.substring(regObj.index + regObj[0].length);
  }
  return {
    hero1_conv: charaDatas[1],
    hero2_conv: charaDatas[2],
    hero3_removed: charaDatas[3],
    hero3_conv: charaDatas[4],
    heroine1_conv: charaDatas[5],
    heroine2_conv: charaDatas[6],
    heroine3_removed: charaDatas[7],
    heroine3_conv: charaDatas[8],
  };
}

/**
 * このページがLife is Tech! LessonのオリジナルWebサイト作成講座によって作成されたページであるか判定する。
 */
function checkIsLITPage() {
  if (!location) return false;
  return /^http(s)?:\/\/(www\.)?member.lifeistech-lesson\.jp\/html_preview\/player_web_sites/.test(
    location.href,
  );
}

/**
 * このクライアントがログイン済みか判定する。
 */
async function checkCookieToken() {
  const res = await fetch(
    "https://player.lifeistech-lesson.jp/api/lesson_player/check_token",
    {},
  );
  const rawjson = await res.json();
  /**@type {string} */
  const name = rawjson.name;
  /**@type {boolean} */
  const isAccessible = rawjson.isAccessible;
  /**@type {boolean} */
  const isValid = rawjson.result === "valid";
  /**@type {string} */
  const redirectUrl = rawjson.redirectUrl;
  if (isValid) return { name, isAccessible, isValid };
  else return { isAccessible, isValid, redirectUrl };
}

/**
 * @template T
 * @extends {Array<()=>Promise<T>>}
 */
class DeferedArray extends Array {
  /**
   * 該当キーの値を取得する非同期関数。
   * @param {number} key
   */
  get(key) {
    return this[key]();
  }
  /**
   * すべての値を評価して、純粋な関数にする。
   */
  evaluateAll() {
    return Promise.all(this.map((r) => r()));
  }
}

/**
 * JSON化可能かどうかをReturn[0]に、
 * JSON化できた場合のオブジェクトをReturn[1]に記録する。
 * @param {string} str
 * @returns {[parseable:boolean,parsed?:any]}
 */
function tryJSONParse(str) {
  try {
    return [true, JSON.parse(str)];
  } catch (ex) {
    return [false];
  }
}

/**
 * レスポンスで認証エラーが発生していないか確認し、\
 * 発生しているなら例外をスローし、していないならjson化したものを返します。
 *
 * // TODO:jsonの分離化。案外使いづらかった。
 * @param {Response} res
 */
async function checkAuthParseJSON(res) {
  if (res.status === 401)
    throw new AccountNotAvailableError("Account is not available");
  return await res.json();
}

const CharactorAvatarsEnum = z.$enum([
  "hero1_conv",
  "hero2_conv",
  "hero3_conv",
  "heroine1_conv",
  "heroine2_conv",
  "heroine3_conv",
]);

/**
 * @param {object} obj
 * @param {import("./types/util").lizodValidatorContext} ctx
 */
const reportLizodError = (obj, ctx) => {
  console.log("[Response Check] object: ", obj);
  if (ctx.errors.length === 0) {
    console.log("[Response Check] The object has not enough properties.");
  } else {
    ctx.errors.forEach((error) => {
      console.log(
        `[Response Check] object.${error.join(".")} is wrong type: `,
        z.access(obj, error),
      );
    });
  }
};

module.exports = {
  getCharactorsImage,
  checkIsLITPage,
  checkCookieToken,
  reportLizodError,
  API_URL,
  API_CH5_URL,
  DeferedArray,
  tryJSONParse,
  checkAuthParseJSON,
  CharactorAvatarsEnum,
};
