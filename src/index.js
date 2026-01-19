//TODO: API結果系のコードの返り値を一定にする
const BASEAPI = "https://api.lifeistech-lesson.jp/api/players";
const CH5_BASEAPI = BASEAPI + "/chapters/36/web_sites/1/player_web_sites";
const pageId = (() => {
  const pagePath = location.pathname;
  const idraw = /player_web_sites\/([0-9]+)\//.exec(pagePath);
  if (!idraw) {
    return -1;
  }
  return parseInt(idraw[1]);
})();

/**
 * @enum {number}
 */
const PAGE_COMPONENTS = {
  CH2_HEADER: 11,
  CH2_TEXT: 12,
  CH2_GALLERY: 13,
  CH2_LIST: 14,
  CH2_FOOTER: 15,
  FUNC_SEARCH: 21,
  FUNC_COMMENT: 22,
  FUNC_DIAGNOSTIC: 23,
  FUNC_RESERVATION: 24,
  CH7_HEADER: 31,
  CH7_TEXT: 32,
  CH7_GALLERY1: 33,
  CH7_GALLERY2: 34,
  CH7_TABLE: 35,
  CH7_LIST_IMAGE: 36,
};

class CheckWork {
  /**
   * @param {Lesson} lesson
   */
  constructor(rawjson, lesson) {
    /**@type {number} */
    this.id = rawjson.id;
    this.lesson = lesson;
    /**@type {CheckWorkResult[]} */
    this.results = [];
  }
}

class CheckWorkResult {
  /**@param {Chapter} chapter  */
  constructor(rawjson, chapter) {
    /**@type {CheckWork?} */
    this.checkwork = null;
    /**@type {number} */
    this.id = rawjson.id;
    /**@type {Date} */
    this.submittedAt = new Date(rawjson.submitted_at);
    /**@type {number} */
    this.score = rawjson.score;
    this.rawCheckwork = {
      /**@type {number} */
      id: rawjson.checkwork.id,
      rawChapter: {
        /**@type {number} */
        id: rawjson.checkwork.chapter.id,
        /**@type {string} */
        chapterNumber: rawjson.checkwork.chapter.chapter_number,
      },
    };
    this.chapter = chapter;
  }
  /**@param {CheckWork} checkwork */
  isResultOf(checkwork) {
    return checkwork.id === this.rawCheckwork.id;
  }
}

class Material {
  /**
   * @param {Lesson} lesson
   * @param {boolean} isWorksheet
   */
  constructor(rawjson, lesson, isWorksheet) {
    /**@type {string} */
    this.name = rawjson.label;
    /**@type {string} */
    this.link = rawjson.link;
    /**@type {number} */
    this.id = rawjson.id;
    this.lesson = lesson;
    this.isWorksheet = isWorksheet;
  }
  download() {
    const link = document.createElement("a");
    link.href = this.link;
    const extension = this.link.split(".").findLast(() => !0) ?? "";
    link.download = `${this.name}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

class Lesson {
  /**@param {Chapter} chapter  */
  constructor(rawjson, chapter) {
    /**@type {number} */
    this.id = rawjson.id;
    /**@type {string} */
    this.name = rawjson.title;
    /**@type {string} */
    this.showNo = rawjson.no;
    /**@type {string} */
    this.status = rawjson.status;
    // 協力者求: statusのとりうる値を知りたい
    // "cleared"|
    this.chapter = chapter;
  }
  _setAdditionalInfo(rawjson) {
    /**@type {boolean} */
    this.isRange = rawjson.is_range;
    /**@type {CheckWork[]} */
    this.checkworks = rawjson.checkworks.map((j) => new CheckWork(j, this));
    /**@type {any[]} */
    this.algorithmExercises = rawjson.algorithm_exercises;
  }
  async loadInfo() {
    const res = await fetch(
      // `${BASEAPI}/chapters/${this.chapter.id}/lessons/${this.id}?lesson_group_id=133658`,
      `${BASEAPI}/chapters/${this.chapter.id}/lessons/${this.id}`,
      {
        headers: {
          authorization: `Bearer ${this.chapter.course.user.token}`,
        },
        method: "GET",
        mode: "cors",
      },
    );
    const rawjson = await res.json();
    this._setAdditionalInfo(rawjson);
    /**@type {string} */
    this.description = rawjson.description;
    /**@type {string} */
    this.thumbnail = rawjson.thumbnail;
    /**@type {string} */
    this.learningContents = rawjson.learning_contents;
    /**@type {boolean} */
    this.hasChatContents = rawjson.has_chat_contents;
    /**@type {LessonStartLink[]} */
    this.startLinks = rawjson.start_links.map((j) => ({
      scenarioId: j.scenario_id,
      type: j.type,
      playerUrl: j.player_url,
    }));
    /**@type {any} */
    this.continueLink = rawjson.continue_link;
    this.materials = rawjson.materials.map((j) => new Material(j, this, false));
    this.worksheetMaterials = rawjson.worksheet_materials.map(
      (j) => new Material(j, this, true),
    );
    /**@type {{id:number}} */
    this.htmlWork = rawjson.html_work;
    /**@type {string?} */
    this.cloud9Link = rawjson.cloud9_link ?? null;
  }
  isInfoLoaded() {
    return typeof this.description === "string";
  }
}

class Chapter {
  /**@param {Course} course */

  constructor(rawjson, course) {
    /**@type {number} */
    this.id = rawjson.id;
    /**@type {string} */
    this.name = rawjson.title;
    /**@type {string} */
    this.showNo = rawjson.no;
    /**@type {string} */
    this.color = rawjson.color;
    /**@type {string[]} */
    this.themes = rawjson.themes;
    /**@type {boolean} */
    this.classTarget = rawjson.class_target;
    /**@type {number} */
    this.lessonGroupId = rawjson.lesson_group_id;
    /**@type {number?} */
    this.websiteId = rawjson.web_site_id;
    /**@type {Lesson[]} */
    this.lessons = rawjson.lessons.map((l) => new Lesson(l, this));
    this.course = course;
  }

  async loadInfo() {
    const res = await fetch(
      // `${BASEAPI}/${this.id}?lesson_group_id=133658&chapter_label=1`,
      `${BASEAPI}/chapters/${this.id}`,
      {
        headers: {
          authorization: `Bearer ${this.course.user.token}`,
        },
        method: "GET",
        mode: "cors",
      },
    );
    const rawjson = await res.json();
    /**@type {string} */
    this.name = rawjson.title;
    /**@type {string} */
    this.showNo = rawjson.no;
    /**@type {string} */
    this.color = rawjson.color;
    /**@type {string[]} */
    this.themes = rawjson.themes;
    /**@type {boolean} */
    this.classTarget = rawjson.class_target;
    /**@type {number?} */
    this.websiteId = rawjson.web_site_id;
    /**@type {string} */
    this.subtitle = rawjson.subtitle;
    /**@type {string} */
    this.iconUrl = rawjson.icon_url;
    /**@type {string} */
    this.colorGradientFrom = rawjson.color_gradient_from;
    /**@type {string} */
    this.colorGradientTo = rawjson.color_gradient_to;
    /**@type {string} */
    this.purpose = rawjson.purpose;
    /**@type {string} */
    this.goal = rawjson.goal;

    rawjson.lessons.forEach((j) => {
      const lesson = this.lessons.find((l) => l.id === j.id);
      if (!lesson) return;
      lesson._setAdditionalInfo(j);
    });
  }
  isInfoLoaded() {
    return typeof this.goal === "string";
  }
  async getCheckworkScores() {
    const res = await fetch(
      `${BASEAPI}/chapters/${this.id}/player_checkwork_scores`,
      {
        headers: {
          authorization: `Bearer ${this.course.user.token}`,
        },
        method: "GET",
        mode: "cors",
      },
    );
    /**@type {any[]} */
    const rawjson = await res.json();
    return rawjson.map((j) => {
      const result = new CheckWorkResult(j, this);
      if (!!this.lessons) {
        // someはtrueが返ってきた瞬間に処理を終わりにするので効率がいい
        this.lessons.some((l) => {
          if (!l.checkworks) return false;
          return l.checkworks.some((c) => {
            if (result.isResultOf(c)) {
              result.checkwork = c;
              c.results.push(result);
              return true;
            }
            return false;
          });
        });
      }
      return result;
    });
  }
}

class Course {
  /**@param {User} user */
  constructor(rawjson, user) {
    /**@type {number} */
    this.id = rawjson.id;
    /**@type {string} */
    this.name = rawjson.title;
    /**@type {Chapter[]} */
    this.chapters = rawjson.chapters.map((c) => new Chapter(c, this));
    this.user = user;
  }
}

class Classroom {
  constructor(rawjson) {
    /**@type {number} */
    this.id = rawjson.id;
    /**@type {string} */
    this.name = rawjson.name;
    /**@type {Date} */
    this.createdAt = new Date(rawjson.created_at);
    /**@type {Date} */
    this.updatedAt = new Date(rawjson.updated_at);
    /**@type {number} */
    this.schoolId = rawjson.school_id;
    /**@type {number} */
    this.year = rawjson.year;
    /**@type {number} */
    this.lessonPatternId = rawjson.lesson_pattern_id;
    /**@type {number} */
    this.grade = rawjson.grade;
    /**@type {number} */
    this.lessonCourseId = rawjson.lesson_corse_id;
    /**@type {boolean} */
    this.drillAvailable = rawjson.drill_available;
    /**@type {boolean} */
    this.examAvailable = rawjson.exam_available;
  }
}

class User {
  /**@param {string} token */
  constructor(token) {
    /**@type {string} */
    this.token = token;
  }
  async loadInfo() {
    const res = await fetch(`${BASEAPI}/setting`, {
      headers: {
        authorization: `Bearer ${this.token}`,
      },
      method: "GET",
      mode: "cors",
    });
    const rawjson = await res.json();
    this.isLogining = rawjson.login_status === "yes";
    /**@type {string} */
    this.language = rawjson.language;
    /**@type {string} */
    this.nickname = rawjson.nickname;
    /**@type {string} */
    this.backendName = rawjson.player_name;
    /**@type {string?} */
    this.chatroomNickname = rawjson.chatroom_nickname;
    /**@type {LITAvatars} */
    this.avatarFileName = rawjson.avatarFileName;
    /**@type {number} */
    this.playerId = rawjson.id;
    /**@type {boolean} */
    this.demo = rawjson.demoAccount;
    /**@type {string} */
    this.currentSchoolKind = rawjson.currentSchoolKind;
    /**@type {boolean} */
    this.lessonAvailable = rawjson.lessonAvailable;
    /**@type {boolean} */
    this.drillAvailable = rawjson.drillAvailable;
    /**@type {boolean} */
    this.examAvailable = rawjson.examAvailable;
    /**@type {boolean} */
    this.accountAvailable = rawjson.accountAvailable;
    /**@type {Classroom[]} */
    this.classrooms = rawjson.lessonGroups.map((j) => new Classroom(j));
  }
  /**
   * @returns {Promise<Page[]>}
   */
  async getPages() {
    const res = await fetch(CH5_BASEAPI, {
      headers: {
        authorization: `Bearer ${this.token}`,
      },
      method: "GET",
      mode: "cors",
    });
    const json = await res.json();
    return json.player_web_sites.map((s) => new Page(s, this));
  }
  /**
   *
   * @param {string} nickname
   * @param {LITAvatars} avatarFileName
   */
  updateNameChara(nickname, avatarFileName) {
    const body = {
      nickname,
      avatar_file_name: avatarFileName,
    };
    return fetch(BASEAPI, {
      headers: {
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
      method: "PUT",
      mode: "cors",
    });
  }

  /**@returns {Promise<Course[]>} */
  async getCourses() {
    const res = await fetch(`${BASEAPI}/courses`, {
      headers: {
        authorization: `Bearer ${this.token}`,
      },
      method: "GET",
      mode: "cors",
    });
    const rawjson = await res.json();
    /**@type {Course[]} */
    this.courses = rawjson.courses.map((j) => new Course(j, this));
    return this.courses;
  }

  /**
   * @param {string} name
   * @param {number[]} pageComponents
   */
  async createPage(name, pageComponents) {
    const body = {
      title: name,
      component_ids: pageComponents,
    };
    const res = await fetch(CH5_BASEAPI, {
      headers: {
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
      mode: "cors",
    });
    const id = parseInt(await res.text());
    return new Page({ id, name }, this);
  }
  /**
   * @returns {Promise<string>}
   */
  async getCloud9Link() {
    const cloudLesson = await fetch(`${BASEAPI}/chapters/38/lessons/3811`, {
      headers: {
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json",
      },
      method: "GET",
      mode: "cors",
    });
    const { cloud9_link } = await cloudLesson.json();
    if (!cloud9_link) return false;
    return cloud9_link;
  }
  isInfoLoaded() {
    return typeof this.nickname === "string";
  }
}
class Myself extends User {
  constructor() {
    super("");
  }
  async loadInfo() {
    const tokenCookie = await cookieStore.get("mozermovie");
    if (!tokenCookie || !tokenCookie.value) {
      alert("認証IDの取得に失敗しました。");
      throw new Error("failed to get token.");
    }
    this.token = tokenCookie.value;
    await super.loadInfo();
  }
  async getThisPage() {
    const pages = await this.getPages();
    const thisPage = pages.find((p) => p.id === pageId);
    if (!thisPage) {
      alert("このページはログイン中のユーザーのリストに存在しません。");
      throw new Error("This page is not listed in logining user");
    }
    return thisPage;
  }
  async logout() {
    location.href = "https://api.lifeistech-lesson.jp/api/open/players/signout";
  }
}

class PageFile {
  /**
   * @param {Page} page
   */
  constructor(rawjson, page) {
    /**@type {number} */
    this.id = rawjson.id;
    /**@type {string} */
    this.name = rawjson.name;
    /**@type {string} */
    this.mineType = rawjson.content_type;
    /**@type {string} */
    this.content = rawjson.content;
    /**@type {string} */
    this.url = rawjson.preview_url;
    this.page = page;
  }
  delete() {
    return fetch(`${CH5_BASEAPI}/${this.page.id}/files`, {
      headers: {
        authorization: `Bearer ${this.page.user.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ filename: this.name }),
      method: "DELETE",
      mode: "cors",
    });
  }
  /**
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
   */
  constructor(isPreset, rawjson, page) {
    this.isPreset = isPreset;
    /**@type {number} */
    this.id = rawjson.id;
    /**@type {string} */
    this.name = rawjson.name;
    /**@type {string} */
    this.url = rawjson.url;
    this.page = page;
  }
  async delete() {
    const body = {
      filename: this.name,
    };
    return (
      await fetch(`${CH5_BASEAPI}/${this.page.id}/images`, {
        headers: {
          authorization: `Bearer ${this.page.user.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
        method: "DELETE",
        mode: "cors",
      })
    ).ok;
  }
}

class PageDataTable {
  /**
   * @param {Page} page
   */
  constructor(rawjson, page) {
    this.page = page;
    /**@type {number} */
    this.id = rawjson.id;
    /**@type {string}*/
    this.label = rawjson.label;
    /**@type {Object[]} */
    this.value = rawjson.value;
    /**@type {string[]} */
    this.defaultHeader = rawjson.default_header;
    /**@type {string[]} */
    this.header = rawjson.header;
    /**@type {boolean} */
    this.valueEditable = rawjson.valueEditable;
    /**@type {number} */
    this.minDataCount = rawjson.min_data_count;
  }
  async save(value = this.value) {
    const body = {
      value_json: JSON.stringify(value),
    };
    const res = await fetch(
      "https://api.lifeistech-lesson.jp/api/players/chapters/36/web_sites/1/player_web_sites/55785/data_tables/40669",
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
    if (res.ok) {
      this.value = value;
      return true;
    }
    return false;
  }
}

class Page {
  /**@param {User} user */
  constructor(rawjson, user) {
    /**@type {number} */
    this.id = rawjson.id;
    /**@type {string} */
    this.name = rawjson.title;
    this.user = user;
  }
  async loadInfo() {
    const URL = `${CH5_BASEAPI}/${this.id}`;
    const res = await fetch(URL, {
      headers: {
        authorization: `Bearer ${this.user.token}`,
      },
      method: "GET",
      mode: "cors",
    });
    const rawjson = await res.json();
    if (rawjson.id !== this.id) throw new Error("Incorrect id");
    this.name = rawjson.title;
    /**@type {string} */
    this.previewUrl = rawjson.preview_url;
    /**@type {PageDataTable[]} */
    this.dataTables = rawjson.data_tables.map(
      (j) => new PageDataTable(j, this),
    );
    /**@type {PageFile[]} */
    this.files = rawjson.files.map((j) => new PageFile(j, this));
    /**@type {PageImage[]} */
    this.images = rawjson.images.map((j) => new PageImage(false, j, this));
    /**@type {PageImage[]} */
    this.presetImages = rawjson.preset_images.map(
      (j) => new PageImage(true, j, this),
    );
    return res;
  }
  /**@deprecated */
  applyFiles(files = this.files) {
    return this.save(files);
  }
  async save(files = this.files) {
    const body = {
      files: files.map((f) => ({ content: f.content, filename: f.name })),
    };
    const res = await fetch(`${CH5_BASEAPI}/${this.id}/files`, {
      headers: {
        authorization: `Bearer ${this.user.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
      method: "POST",
      mode: "cors",
    });
    await this.loadInfo();
    return res;
  }
  /**
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
    const res = await fetch(`${CH5_BASEAPI}/${this.id}/file`, {
      headers: {
        authorization: `Bearer ${this.user.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
      method: "POST",
      mode: "cors",
    });
    const successed = await res.json();
    await this.loadInfo();
    return successed;
  }
  /**@param {boolean} formatToUrl  */
  async getZipB64(formatToUrl) {
    const res = await fetch(`${CH5_BASEAPI}/${this.id}/archive`, {
      headers: {
        authorization: `Bearer ${this.user.token}`,
      },
      method: "GET",
      mode: "cors",
    });
    const b64 = await res.text();
    if (formatToUrl) return "data:application/zip," + b64;
    return b64;
  }
  /**
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
    const res = await fetch(`${CH5_BASEAPI}/${this.id}/images`, {
      headers: {
        authorization: `Bearer ${this.user.token}`,
      },
      body: fd,
      method: "POST",
      mode: "cors",
    });
    await this.loadInfo();
    return res.ok;
  }
  isInfoLoaded() {
    return typeof this.previewUrl === "string";
  }
}

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
    hero3_discarded: charaDatas[3],
    hero3_conv: charaDatas[4],
    heroine1_conv: charaDatas[5],
    heroine2_conv: charaDatas[6],
    heroine3_discarded: charaDatas[7],
    heroine3_conv: charaDatas[8],
  };
}

function checkIsLITPage() {
  return /^http(s)?:\/\/(www\.)?member.lifeistech-lesson\.jp\/html_preview\/player_web_sites/.test(
    location.href,
  );
}

async function checkToken() {
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

//https://player.lifeistech-lesson.jp/api/lesson_player/scenario?scenario_path=lesson%2Fpcbasic_win&project_name=webdesign
