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

export { FileMinetypes, RenameReturns };
