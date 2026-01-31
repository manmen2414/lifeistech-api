const { CheckWorkResult } = require("./checkWorkResult");
const { API_URL, checkAuthParseJSON } = require("./util");

/**
 * チェックワークの問題を取得・回答を送信する。
 */
class CheckWorkAnswerer {
  /**
   * @param {any} rawjson
   * @param {import("./checkWork").CheckWork} checkWork
   */
  constructor(rawjson, checkWork) {
    /**@type {number} 解答するチェックワークのID。*/
    this.id = rawjson.id;
    /**@type {number} チェックワークのあるレッスンID。*/
    this.lessonId = rawjson.lesson.id;
    /**@type {string} チェックワークのあるレッスン名。*/
    this.lessonName = rawjson.lesson.name;
    /**@type {number} */
    this.patternNum = rawjson.pattern_num;
    /**@type {number} 何回目の解答をしようとしているか。*/
    this.tryNum = rawjson.try_num;

    /**@type {CheckWorkQuestion[]} */
    this.questions = rawjson.questions.map(
      /**
       * @param {number} i
       * @param {any} r*/
      (r, i) => new CheckWorkQuestion(r, i, this),
    );

    this.checkWork = checkWork;

    /**@type {number[]} 解答の**インデックス**。*/
    this.answers = [];
  }
  /**
   * @returns {import("./types/checkWorkAnswerer").SendAnswerReturns}
   */
  async sendAnswers() {
    const body = {
      checkwork_answers: this.answers.map((n, i) => ({
        checkwork_question_id: this.questions[i].id,
        selected_answer: n + 1,
      })),
      checkwork_id: this.id,
    };

    const res = await fetch(
      `${API_URL}/chapters/${this.id}/lessons/${this.lessonId}/checkworks`,
      {
        headers: {
          authorization: `Bearer ${this.checkWork.lesson.chapter.course.user.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
        method: "POST",
        mode: "cors",
      },
    );
    const json = await checkAuthParseJSON(res);
    if (!!json.error) {
      const error = {
        emptyId: false,
        emptyAnswer: false,
        unexpectedSelect: false,
        invalidAnswer: false,
        lackedAnswer: false,
      };
      if (json.error.includes("checkwork_id is missing")) error.emptyId = true;
      if (json.error.includes("checkwork_answers is missing"))
        error.emptyAnswer = true;
      if (json.error.includes("Couldn't find Checkwork"))
        error.lackedAnswer = true;
      if (json.error.includes("有効な回答の数が")) error.lackedAnswer = true;
      if (json.error.includes("[selected_answer] is invalid"))
        error.invalidAnswer = true;
      if (json.error.includes("選択した回答は選択肢中に存在していません。"))
        error.unexpectedSelect = true;

      return {
        successed: false,
        error,
      };
    }
    return {
      successed: true,
      result: new CheckWorkResult(
        {
          id: json.player_checkwork_score_id,
          score: json.score,
          checkwork: this.checkWork,
          submitted_at: json.submitted_at,
        },
        this.checkWork.lesson.chapter,
      ),
    };
  }
}
/**
 * チェックワーク内の問題。
 */
class CheckWorkQuestion {
  /**
   * @param {any} rawjson
   * @param {number} index
   * @param {CheckWorkAnswerer} answerer
   */
  constructor(rawjson, index, answerer) {
    /**@type {number} 問題のID。*/
    this.id = rawjson.id;
    /**@type {string} 問題の本文。*/
    this.text = rawjson.text;
    /**@type {string?} 問題のサムネイル。*/
    this.thumbnail = rawjson.thumbnail;
    /**@type {boolean} */
    this.isTextAnswer = rawjson.is_text_answer;
    /**@type {string[]} */
    this.answers = [
      rawjson.answer1,
      rawjson.answer2,
      rawjson.answer3,
      rawjson.answer4,
    ].filter((v) => !!v);
    /**@type {string?} */
    this.hint = rawjson.hint;
    /**@type {string?} */
    this.hintPlayerLink = rawjson.hint_player_link;

    /**@type {number} */
    this.index = index;

    this.answerer = answerer;
  }
  /**
   * @param {number} answerIndex
   */
  answer(answerIndex) {
    if (!this.answers[answerIndex])
      throw new Error(`invalid Answer Index: ${answerIndex}`);
    this.answerer.answers[this.index] = answerIndex;
  }
}
module.exports = { CheckWorkAnswerer, CheckWorkQuestion };
