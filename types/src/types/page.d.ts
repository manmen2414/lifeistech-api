import { PageFile } from "../pageComponents";

type FileMinetypes = "text/html" | "text/css" | "application/javascript";
type RenameReturns = Promise<
  | { successed: true }
  | {
      successed: false;
      error: {
        /**タイトルが未入力。 */
        emptyTitle: boolean;
      };
    }
>;
type AddFileReturns = Promise<
  | { successed: true }
  | {
      successed: false;
      error: {
        /**ファイル形式が非対応。 */
        unsupportedMediaType: boolean;
        conflicted: boolean;
      };
    }
>;
type UploadImageReturns = Promise<
  | { successed: true }
  | {
      successed: false;
      error: {
        /**ファイル形式が非対応。 */
        unsupportedMediaType: boolean;
        /**ファイルが未入力。 */
        emptyFile: boolean;
        /**ファイル名が長すぎる。 */
        tooLongFileName: boolean;
      };
    }
>;

export { FileMinetypes, RenameReturns, AddFileReturns, UploadImageReturns };
