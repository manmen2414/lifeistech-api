/**@typedef {import("./page").Page} Page*/
/**@typedef {import("./types/page").FileMinetypes} FileMinetypes*/
const { API_CH5_URL, checkAuthParseJSON } = require("./util");

class PageFile {
  /**
   * @param {any} rawjson
   * @param {Page} page
   */
  constructor(rawjson, page) {
    /**@type {number} ファイルのID。*/
    this.id = rawjson.id;
    /**@type {string} ファイル名。拡張子を含む。*/
    this.name = rawjson.name;
    /**@type {FileMinetypes} MINEタイプ。*/
    this.mineType = rawjson.content_type;
    /**@type {string} ファイルの内容。*/
    this.content = rawjson.content;
    /**@type {string} ファイルへアクセスするURL。*/
    this.url = rawjson.preview_url;
    /**ファイルが存在するページ。 */
    this.page = page;
  }
  /**
   * このファイルを削除する。
   */
  async delete() {
    const res = await fetch(`${API_CH5_URL}/${this.page.id}/files`, {
      headers: {
        authorization: `Bearer ${this.page.user.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ filename: this.name }),
      method: "DELETE",
      mode: "cors",
    });
    return res.ok;
  }
  /**
   * ファイルを書き換え、ページを保存する。\
   * ページ保存時は他のファイルも保存する。
   * @param {string} content
   */
  editAndSave(content) {
    this.content = content;
    return this.page.save();
  }
}
class PageImage {
  /**
   * @param {Page} page
   * @param {boolean} isPreset
   * @param {any} rawjson
   */
  constructor(isPreset, rawjson, page) {
    /**プリセット画像であるか。 */
    this.isPreset = isPreset;
    /**@type {number} 画像のID。*/
    this.id = rawjson.id;
    /**@type {string} 画像のファイル名。*/
    this.name = rawjson.name;
    /**@type {string} 画像へのアクセスURL。*/
    this.url = rawjson.url;
    /**画像が登録されているページ。 */
    this.page = page;
  }
  /**
   * 画像を削除する。\
   * プリセット画像は削除不能。
   */
  async delete() {
    const body = {
      filename: this.name,
    };

    const res = await fetch(`${API_CH5_URL}/${this.page.id}/images`, {
      headers: {
        authorization: `Bearer ${this.page.user.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
      method: "DELETE",
      mode: "cors",
    });
    //TODO: レスポンスの確認
    const json = await checkAuthParseJSON(res);
  }
}
class PageDataTable {
  /**
   * @param {any} rawjson
   * @param {Page} page
   */
  constructor(rawjson, page) {
    /**データベースが存在するページ。 */
    this.page = page;
    /**@type {number} データベースのID。*/
    this.id = rawjson.id;
    /**@type {string} データベースの表示上のラベル。*/
    this.label = rawjson.label;
    /**@type {Object[]} データベースの値。*/
    this.value = rawjson.value;
    /**@type {string[]} デフォルトで設定されていたデータベースのヘッダーリスト。*/
    this.defaultHeader = rawjson.default_header;
    /**@type {string[]} 現在設定されているヘッダーリスト。*/
    this.header = rawjson.header;
    /**@type {boolean} 値を変更可能か。*/
    this.valueEditable = rawjson.valueEditable;
    /**@type {number} 最小のデータ数。*/
    this.minDataCount = rawjson.min_data_count;
  }
  /**
   * データベースを書き換える。
   * 編集不能なデータベースの場合、エラーが発生する。
   * @param {Object[]} value
   */
  async save(value = this.value) {
    const body = {
      value_json: JSON.stringify(value),
    };
    const res = await fetch(
      `${API_CH5_URL}/${this.page.id}/data_tables/${this.id}`,
      {
        headers: {
          authorization: `Bearer ${this.page.user.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
        method: "POST",
        mode: "cors",
      },
    );
    //TODO: レスポンスの確認
    const json = await checkAuthParseJSON(res);
    this.value = value;
  }
}

module.exports = {
  PageFile,
  PageImage,
  PageDataTable,
};
