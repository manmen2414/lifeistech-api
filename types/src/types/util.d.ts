/**
 * APIリクエストで取得しなければならない情報を持っていない、APIリクエストで追加情報を持った完全クラスを取得できるクラスを示す。
 */
interface Loadable<T> {
  /**
   * リクエストを行い、全ての情報を取得する。
   */
  load(): Promise<T>;
  /**
   * リクエストを行った結果のオブジェクト。
   */
  loaded: T | null;
  /**
   * リクエスト済みの場合はそのオブジェクトを、\
   * でなければリクエストを行ってオブジェクトを取得する。
   */
  getLoaded(): Promise<T>;
}

/**
 * クラスのコンストラクターと同じ(非同期)関数。
 */
type ConstructFunction<
  T extends abstract new (...args: any) => Ret,
  Ret,
  isAsync extends boolean = false,
> = (
  ...arg: ConstructorParameters<T>
) => isAsync extends true ? Promise<Ret> : Ret;

type CharactorAvatars =
  | "hero1_conv"
  | "hero2_conv"
  | "hero3_conv"
  | "heroine1_conv"
  | "heroine2_conv"
  | "heroine3_conv";

type lizodValidatorContext = { errors: (string | number)[][] };

export { Loadable, ConstructFunction, CharactorAvatars, lizodValidatorContext };
