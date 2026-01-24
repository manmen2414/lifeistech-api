/**
 * @typedef {import("./types/util.d.ts").Loadable<T>} Loadable
 * @template T
 */
/** @typedef {import("./user.js").UserBase} UserBase*/

const {
  AccountNotAvailableError,
  UnexpectedResponseError,
} = require("./errors.js");
const { PageDataTable, PageFile, PageImage } = require("./pageComponents.js");
const { API_URL, API_CH5_URL, checkAuthParseJSON } = require("./util.js");

/**
 * @implements {Loadable<Page>}
 */
class PageBase {
  /**@type {Page|null} */
  loaded = null;
  /**
   * @param {number} id
   * @param {string} name
   * @param {UserBase} user
   */
  constructor(id, name, user) {
    this.id = id;
    this.name = name;
    this.user = user;
  }
  async load() {
    const page = new Page(this);
    await page.load();
    this.loaded = page;
    this.name = page.name;
    return page;
  }
  async getLoaded() {
    if (!this.loaded) return await this.load();
    return this.loaded;
  }
  /**
   * ページのファイルを保存する。
   * @param {PageFile[]} files
   */
  async save(files) {
    const body = {
      files: files.map((f) => ({ content: f.content, filename: f.name })),
    };
    const res = await fetch(`${API_CH5_URL}/${this.id}/files`, {
      headers: {
        authorization: `Bearer ${this.user.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
      method: "POST",
      mode: "cors",
    });
    //TODO: レスポンス(ry
    const json = await checkAuthParseJSON(res);
    if (!!this.loaded) this.loaded.load();
    const ret = {
      successed: true,
      errorAt: {
        /**@type {PageFile?} */
        file: null,
        /**@type {string?} */
        property: null,
      },
    };
    if (!!json.error) {
      ret.successed = false;
      const reg = /files\[(0-9)+\]\[([a-zA-Z0-9_\-]+)\]/.exec(json.error);
      if (!reg)
        throw new UnexpectedResponseError(
          `Recieved Response on save files: ${JSON.stringify(json)}`,
        );
      const file = files[parseInt(reg[1])];
      const property = reg[2];
      ret.errorAt.file = file;
      ret.errorAt.property = property;
    }
    return ret;
  }
  /**
   * @deprecated saveを利用してください。
   * @type {typeof PageBase.prototype.save}
   */
  applyFiles(...args) {
    return this.save(...args);
  }
  /**
   * ページにファイルを追加する。
   * @param {string} name
   * @param {"html"|"css"|"js"} extension
   * @returns {Promise<boolean|{error:string}>}
   */
  async addFile(name, extension) {
    const body = {
      file: {
        basename: name,
        extension,
      },
    };
    const res = await fetch(`${API_CH5_URL}/${this.id}/file`, {
      headers: {
        authorization: `Bearer ${this.user.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
      method: "POST",
      mode: "cors",
    });
    //TODO: レスポ(ry
    const json = await checkAuthParseJSON(res);
    if (!!this.loaded) this.loaded.load();
    return json;
  }
  /**
   * ページをzipファイルのBase64形式でダウンロードする。
   * @param {boolean} formatToDataUrl
   */
  async getZipB64(formatToDataUrl) {
    const res = await fetch(`${API_CH5_URL}/${this.id}/archive`, {
      headers: {
        authorization: `Bearer ${this.user.token}`,
      },
      method: "GET",
      mode: "cors",
    });
    if (res.status === 401)
      throw new AccountNotAvailableError("Account is not available");
    const b64 = await res.text();
    if (formatToDataUrl) return "data:application/zip," + b64;
    return b64;
  }
  /**
   * 画像をBase64形式からアップロードする。
   * @param {string} base64
   * @param {string} name
   */
  async uploadImage(name, base64) {
    const blob = atob(base64.replace(/^.*,/, ""));
    let buffer = new Uint8Array(blob.length);
    for (let i = 0; i < blob.length; i++) {
      buffer[i] = blob.charCodeAt(i);
    }
    const imgFile = new File([buffer.buffer], name);
    const fd = new FormData();
    fd.append("file", imgFile);
    const res = await fetch(`${API_CH5_URL}/${this.id}/images`, {
      headers: {
        authorization: `Bearer ${this.user.token}`,
      },
      body: fd,
      method: "POST",
      mode: "cors",
    });
    //TODO: レ(ry
    const json = await checkAuthParseJSON(res);
    if (!!this.loaded) this.loaded.load();
  }
  /**
   * ページを改名する。
   * @param {string} newName
   * @returns {import("./types/page.js").RenameReturns}
   */
  async rename(newName) {
    const res = await fetch(`${API_CH5_URL}/${this.id}`, {
      headers: {
        authorization: `Bearer ${this.user.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ title: newName }),
      method: "POST",
      mode: "cors",
    });
    const json = await checkAuthParseJSON(res);
    if (!!json.error) {
      return {
        successed: false,
        error: {
          emptyTitle: json.error.includes("サイト名を入力してください"),
        },
      };
    }
    return { successed: true };
  }
}

class Page extends PageBase {
  /**
   * @param {number} id
   * @param {UserBase} user
   */
  static async Load(id, user) {
    const base = new PageBase(id, "", user);
    const loaded = new this(base);
    await loaded.load();
    return loaded;
  }
  /**@param {PageBase} pageBase  */
  constructor(pageBase) {
    super(pageBase.id, pageBase.name, pageBase.user);
    this.loaded = this;
    /**
     * @type {string}
     * index.htmlへのアクセスリンク。
     */
    this.previewUrl = "";
    /**@type {PageDataTable[]} データベースのリスト。*/
    this.dataTables = [];
    /**@type {PageFile[]} ファイルリスト。画像は含まれない。*/
    this.files = [];
    /**@type {PageImage[]} ユーザーが追加した画像リスト。プリセットの画像は含まれない。*/
    this.images = [];
    /**@type {PageImage[]} テンプレートに存在している画像リスト。ユーザー画像は含まれない。*/
    this.presetImages = [];
  }
  async load() {
    const res = await fetch(`${API_CH5_URL}/${this.id}`, {
      headers: {
        authorization: `Bearer ${this.user.token}`,
      },
      method: "GET",
      mode: "cors",
    });
    const rawjson = await checkAuthParseJSON(res);
    this.isLogining = rawjson.login_status === "yes";
    if (rawjson.id !== this.id)
      throw new UnexpectedResponseError(`Unexpect ID: ${rawjson.id}`);
    this.name = rawjson.title;
    this.previewUrl = rawjson.preview_url;
    this.dataTables = rawjson.data_tables.map(
      /**@param {any} j*/ (j) => new PageDataTable(j, this),
    );
    this.files = rawjson.files.map(
      /**@param {any} j*/ (j) => new PageFile(j, this),
    );
    this.images = rawjson.images.map(
      /**@param {any} j*/ (j) => new PageImage(false, j, this),
    );
    this.presetImages = rawjson.preset_images.map(
      /**@param {any} j*/ (j) => new PageImage(true, j, this),
    );
    return this;
  }
  save(files = this.files) {
    return super.save(files);
  }
}

module.exports = { PageBase, Page };
