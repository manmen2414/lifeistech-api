/**
 * 入力したTokenが不当等の理由で、アカウントが利用できない場合のエラー
 */
class AccountNotAvailableError extends Error {
  /**@param {string} message  */
  constructor(message) {
    super(message);
    this.name = "AccountNotAvailableError";
  }
}

/**
 * APIが想定しているリクエストを返さなかった際に発生するエラー
 */
class UnexpectedResponseError extends Error {
  /**@param {string} message  */
  constructor(message) {
    super(message);
    this.name = "UnexpectedResponseError";
  }
}

module.exports = {
  AccountNotAvailableError,
  UnexpectedResponseError,
};
