import { CheckWorkResult } from "../checkWorkResult";

type SendAnswerReturns = Promise<
  | { successed: true; result: CheckWorkResult }
  | {
      successed: false;
      error: {
        /**チェックワークIDが未入力。 */
        emptyId: boolean;
        /**チェックワークの答えが未入力。 */
        emptyAnswer: boolean;
        /**チェックワークの答え内に存在しない選択肢がある。 */
        unexpectedSelect: boolean;
        /**提出された答えリストに足りない答えがある。 */
        lackedAnswer: boolean;
        /**チェックワークの答え内に不備がある。 */
        invalidAnswer: boolean;
      };
    }
>;

export { SendAnswerReturns };
