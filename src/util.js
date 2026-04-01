const { AccountNotAvailableError } = require("./errors");
const z = require("lizod");

const API_URL = "https://api.lifeistech-lesson.jp/api/players";
const API_CH5_URL = API_URL + "/chapters/36/web_sites/1/player_web_sites";
/**
 * キャラクター6人の画像を取得する。
 * おそらく没になった男子3と女子3のアナザーバージョンも取得できる。
 *
 * **最新版のLITでは仕様が変更された為、この関数でキャラクターを取得できません。**
 * @deprecated `getCharactorsSvgWithScraping`を用いてください。
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
 * 非常に無理やりキャラクター6人のsvg htmlを取得する。\
 * プロフィール変更ページのiframeを呼び出しブラウザを用いたスクレイピングで強制的に取得する。\
 * (life is tech外で利用不能)
 * @returns {Promise<{hero1_conv:string,hero2_conv:string,hero3_conv:string,heroine1_conv:string,heroine2_conv:string,heroine3_conv:string}>}
 */
function getCharactorsSvgWithScraping() {
  return new Promise((r, j) => {
    const profileIframe = document.createElement("iframe");
    profileIframe.width = "0";
    profileIframe.height = "0";
    profileIframe.src = "https://member.lifeistech-lesson.jp/profile";
    profileIframe.onload = () => {
      let ifDocs =
        profileIframe.contentDocument || profileIframe.contentWindow?.document;
      if (!ifDocs) {
        profileIframe.remove();
        j(new Error("Parent page is not member.lifeistech-lesson.jp"));
        return;
      }
      const observer = new MutationObserver(() => {
        ifDocs =
          profileIframe.contentDocument ||
          profileIframe.contentWindow?.document;
        if (!ifDocs) {
          profileIframe.remove();
          j(
            new Error(
              "Page redirected on getCharactorsSvgWithScraping iframe (Did you logged in?)",
            ),
          );
          return;
        }
        const svgWrappers = ifDocs.getElementsByClassName("css-pv0x30");
        if (svgWrappers.length !== 6) return;
        observer.disconnect();
        profileIframe.remove();
        r({
          hero1_conv: svgWrappers[0].innerHTML,
          hero2_conv: svgWrappers[1].innerHTML,
          hero3_conv: svgWrappers[2].innerHTML,
          heroine1_conv: svgWrappers[3].innerHTML,
          heroine2_conv: svgWrappers[4].innerHTML,
          heroine3_conv: svgWrappers[5].innerHTML,
        });
      });
      observer.observe(ifDocs.body, {
        attributes: false,
        childList: true,
        subtree: true,
      });
    };
    document.body.appendChild(profileIframe);
  });
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

/**
 * 環境変数"MOZERMOVIE"またはCookie"mozermovie"から取得を試みる。
 */
const tryGetMozermovie = async () => {
  /**@type {string?} */
  let tryToken = null;
  //@ts-ignore
  if (typeof process !== "undefined" && typeof process.env !== "undefined") {
    //@ts-ignore
    tryToken = process.env.MOZERMOVIE ?? null;
  }
  if (!tryToken && typeof cookieStore !== "undefined") {
    const tokenStore = await cookieStore.get("mozermovie");
    tryToken = tokenStore?.value ?? null;
  }
  return tryToken;
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
  getCharactorsSvgWithScraping,
  tryGetMozermovie,
};
