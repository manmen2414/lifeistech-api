# Life is Tech API

[Life is Tech! Lesson](https://lifeistech-lesson.jp/)のユーザーに関する操作を行えるライブラリ。  

> [!important]
> 中学生コースでの教材「双方向・JS」での動作のみを確認しています。  
> 「情報Ⅰ全対応コース」や「情報Ⅰ・AIドリル」では恐らく動作しません。  
> 詳しくは[対応している教材について](#対応している教材について)をご覧ください。

## Usage

### In WebJS (Life is Tech)
htmlのhead内にスクリプトを追加する。  
JS内でLifeIsTechAPIとしてインポートされます。

```html  
<script src="_"></script>  
```

### In Node.js

dist/lit-api.jsをダウンロードしてください。
```js
const LifeIsTechAPI = require(./lit-api.js);
```

VSCodeであれば、lifeistech-api.d.tsをプロジェクトのフォルダにコピーし、スプリクトに以下を追記すると型参照されます。  

```js  
/// <reference path="lifeistech-api.d.ts" />  
```

## Examples

以下の例は、Chapter5 「オリジナルWebサイト制作」のWebサイトで用いることを想定しています。  
1.ユーザー名とユーザー画像の取得  

```js  
document.addEventListener("DOMContentLoaded", async () => {
  const loginingUser = new LifeIsTechAPI.User.Load(_); 
  // キャラ画像の取得  
  const charactorImages = await LifeIsTechAPI.GetCharactorImages();  
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

## Precautions
### 対応している教材について
ほとんどが中学生の「双方向・JSコース」にのみ対応してみる機能です。  
ページ操作に関する項目でのPythonコードのアップロード等には対応していません。  

## Contributing
製作者のLifeIsTechアカウントは2026年3月末に失効するため、以降はプロジェクトはアーカイブされ、いずれのIssueもPRもお受けすることができません。  
2026年3月末以前であれば、Issue/PRは大歓迎です！  
可能な限り対処いたします。

## Licence / Disclaimer
このプロジェクト/ライブラリは[MIT License](https://opensource.org/license/mit)の元公開されています。  
このライブラリを用いて発生した損害についてはライセンスの記述に基づき、製作者は責任を負いません。ご了承ください。  
また、このライブラリは学習における不正行為を助長するものではないこと、ライフイズテック株式会社に承認されていないライブラリであることに留意してください。
