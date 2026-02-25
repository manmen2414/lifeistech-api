@REM webpackでjsファイルをまとめる
call webpack

@REM 型定義用のフォルダがなければ作る
if not exist "types\" mkdir "types"
if not exist "types\src" mkdir "types\src"
if not exist "types\src\types\" mkdir "types\src\types"

@REM ユーザー定義型ファイルを移動する
xcopy /ye src\types\ types\src\types\

@REM 型をビルドする
call tsc

@REM 型定義をまとめる
node dts-bundle.js