import { Page } from "./page";
export interface User {
  /** 該当ユーザーが保有しているページを取得する。 */
  getPages(): Promise<Page[]>;
}
