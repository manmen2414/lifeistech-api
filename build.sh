# webpackでjsファイルをまとめる
webpack

# 型定義用のフォルダがなければ作る
mkdir -p types
mkdir -p types/src
mkdir -p types/src/types

# ユーザー定義型ファイルを移動する
cp -r src/types types/src/

# 型をビルドする
tsc

# 型定義をまとめる
node dts-bundle.js