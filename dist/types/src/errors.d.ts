/**
 * 入力したTokenが不当等の理由で、アカウントが利用できない場合のエラー
 */
export class AccountNotAvailableError extends Error {
    /**@param {string} message  */
    constructor(message: string);
}
/**
 * APIが想定しているリクエストを返さなかった際に発生するエラー
 */
export class UnexpectedResponseError extends Error {
    /**@param {string} message  */
    constructor(message: string);
}
