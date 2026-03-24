<h1 align="center">Life is Tech API</h1>

> [!warning]
> 中学生コースでの教材「情報の技術」での動作のみを確認しています。  
> 「情報Ⅰ全対応コース」や「情報Ⅰ・AIドリル」では恐らく動作しません。  
> 詳しくは[対応している教材について](#対応している教材について)をご覧ください。
> 
[Life is Tech! Lesson](https://lifeistech-lesson.jp/)のユーザーに関する操作を行えるライブラリです。  
Token(mozermovie)を用いて取得や操作が可能です。


## Usage

### In Web - With Jsdelivr
htmlのhead内にスクリプトを追加します。  
JS内で`LifeIsTechAPI`としてインポートされます。

```html  
<script src="https://cdn.jsdelivr.net/gh/manmen2414/lifeistech-api/dist/lit-api.js"></script>  
```

### In Web - With Local File
`dist/lit-api.js`をダウンロードし、参照してください。
```html  
<script src="path/to/lit-api.js"></script>  
```

### In Node.js

`dist/lit-api.js`をダウンロードし、参照してください。
```js
const LifeIsTechAPI = require("./path/to/lit-api.js");
```

VSCodeであれば、`dist/lit-api.d.ts`をプロジェクトのフォルダにコピーし、スプリクトに以下を追記すると型参照されます。  
<sub>いつかnpmに公開して自動で型参照されるようにしてみたいですね</sub>

```js  
/// <reference path="lit-api.d.ts" />  
```

## Examples

以下の例は、Chapter5 「オリジナルWebサイト制作」のWebサイトで用いることを想定しています。  
<details>
<summary>ユーザー名とユーザー画像の取得</summary>

```js  
document.addEventListener("DOMContentLoaded", async () => {
  const loginingUser = await LifeIsTechAPI.User.Load(mozermovie); 
  // キャラ画像の取得  
  const charactorImages = await LifeIsTechAPI.getCharactorsImage();  
  // ユーザーのキャラ画像を取得  
  const charactor = charactorImages[loginingUser.avatarFileName];  
  // ユーザー名を表示する  
  const text = document.createElement("div");  
  text.innerText = loginingUser.nickname;  
  document.body.append(text);  
  // キャラ画像を表示する  
  const image = document.createElement("img");  
  image.src = charactor;  
  document.body.append(image);   
});  
```
</details>

<details>
<summary>ページを新規作成し、 `Hello, World!`を表示させる</summary>

```js  
document.addEventListener("DOMContentLoaded", async () => {
  const loginingUser = await LifeIsTechAPI.User.Load(mozermovie); 
  // ページの新規作成
  const pageRet = await loginingUser.createPage("lit-api-page", []);  
  // 作成に成功したか
  if (!pageRet.successed) {
    alert("作成に失敗しました。");
    return;
  }
  // ページを読込
  const page = await pageRet.page.load();
  // index.htmlを取得する
  const index = page.files.find((file)=>file.name === "index.html");
  // 書き換える
  index.content = `<html><head></head><body>Hello, World!</body></html>`;
  // 保存する
  await page.save();
  // リンクの提示
  const text = document.createElement("a");  
  text.innerText = "ページをここに作成しました。";
  text.href = page.previewUrl;
  document.body.append(text);  
});  
```
</details>

<details>
<summary>ユーザーのクリア済みレッスン数を取得する</summary>

```js  
document.addEventListener("DOMContentLoaded", async () => {
  const loginingUser = await LifeIsTechAPI.User.Load(mozermovie); 
  // クリア済みレッスン数を数える
  let lessonCleared = 0;
  let lessonAll = 0;
  // コースの取得
  const courses = await loginingUser.getCourses();
  courses.forEach((course) => {
    course.chapters.forEach((chapter) => {
      chapter.lessons.forEach((lesson) => {
        // コース > チャプター > レッスンと調べていき、総数とクリア数を調べる
        lessonAll++;
        if (lesson.status === "cleared") lessonCleared++;
      });
    });
  });
  // 整形
  const cleared = `あなたは ${lessonCleared}/${lessonAll} レッスンをクリアしています。`;
  // 表示する  
  const text = document.createElement("div");  
  text.innerText = cleared;  
  document.body.append(text);  
});  
```
</details>

## Scripts
- `npm run build` でJavaScriptを公開用にビルドする (`dist/lit-api.js`)
- `npm run developBuild` でJavaScriptをデバッグ用にビルドする (`dist/lit-api.js`)
  - Webpack Bundle Analyzerが作動する。
- (**Windows Only**) `build:types-win` で型宣言ファイルをバンドルする (`dist/lit-api.d.ts`)
- (**Mac/Linux Only**) `build:types` で型宣言ファイルをバンドルする (`dist/lit-api.d.ts`)
- (**Windows Only**) `build:all-win` でJavaScriptと型宣言ファイルをバンドルする
- (**Mac/Linux Only**) `build:types` でJavaScriptと型宣言ファイルをバンドルする

## Precautions
### 対応している教材について
ほとんどが中学生の「情報の技術」にのみ対応している機能です。  
ページ操作に関する項目でのPythonコードのアップロード等には対応していません。  

## Contributing
製作者のLifeIsTechアカウントは2026年3月末に失効するため、以降はプロジェクトはアーカイブされ、いずれのIssueもPRもお受けすることができません。  
2026年3月末以前であれば、Issue/PRは大歓迎です！  
可能な限り対処いたします。

## Licence / Disclaimer
このプロジェクト/ライブラリは[MIT License](https://opensource.org/license/mit)の元公開されています。  
このライブラリを用いて発生した損害についてはライセンスの記述に基づき、製作者は責任を負いません。ご了承ください。  
また、このライブラリは学習における不正行為を助長するものではないこと、ライフイズテック株式会社に承認されていないライブラリであることに留意してください。
