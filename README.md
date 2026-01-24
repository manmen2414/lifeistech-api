# Life is Tech API

[Life is Tech! Lesson](https://lifeistech-lesson.jp/)のユーザーに関する操作を行えるライブラリ。  

> [!important]
> 中学生コースの利用教材「双方向・JS」での動作のみを確認しています。  
> その教材以外での正常動作は保証しません。

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

## Contributing

個人で契約して自由に使えるようなサービスじゃないので、そもそも来ることを想定していません。  
issueを出してくれるのはありがたいですが、単独開発で、かつ私のアカウントが2026年3月末に失効するため、失効後このプロジェクトはアーカイブ化します。

## Licence

現状MITライセンスのつもりです。
