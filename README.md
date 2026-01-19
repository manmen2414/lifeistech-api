# Life is Tech API

[Life is Tech! Lesson](https://lifeistech-lesson.jp/)のユーザーに関する操作を行えるライブラリ。  

:::important  
中学生コースの利用教材「双方向・JS」での動作のみを確認しています。  
そもそもそれ以外の環境は私には入手できません。  
:::

## Usage

htmlのhead内にスクリプトを追加する。

```html  
<script src="_"></script>  
```  

VSCodeであれば、[`lifeistech-api.d.ts`](http://lifeistech-api.d.ts)をプロジェクトのフォルダにコピーし、スプリクトに以下を追記すると型参照されます。  

```js  
/// <reference path="lifeistech-api.d.ts" />  
```

## Examples

以下の例は、Chapter5 「オリジナルWebサイト制作」のWebサイトで用いることを想定しています。  
1.ユーザー名とユーザー画像の取得  

```js  
document.addEventListener("DOMContentLoaded", async () => {  
  const loginingUser = new LITMyself();  
  // ユーザー情報の読み込み  
  await loginingUser.loadInfo();  
  // キャラ画像の取得  
  const charactorImages = await GetLITCharactors();  
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

そもそも個人が自由に使えるサービスじゃないので、そもそも来ることを想定していません。  
issueを出してくれるのはありがたいのですが、単独開発で、かつ私のアカウントが2026年3月中に失効する可能性が高いので、アカウントが失効した場合、このプロジェクトは完全にアーカイブ化します。

## Licence

現状MITライセンスのつもりです。