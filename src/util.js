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

module.exports = {
  getCharactorsImage,
  checkIsLITPage,
  checkCookieToken,
  API_URL,
  API_CH5_URL,
  DeferedArray,
};
