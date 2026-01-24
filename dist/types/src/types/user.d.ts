import { PageBase } from "../page";

type CreatePageReturns = Promise<
  | { successed: true; page: PageBase }
  | {
      successed: false;
      error: {
        /**タイトルが未入力または無効。 */
        invaildTitle: boolean;
        /**ページ要素が未入力または無効。 */
        invaildComponentIds: boolean;
        /**既に該当タイトルが存在している。 */
        alreadyExistsTitle: boolean;
        /**既にユーザーが保有できる最大ページ数に達している。 */
        pageLimitReached: boolean;
      };
    }
>;

export { CreatePageReturns };
