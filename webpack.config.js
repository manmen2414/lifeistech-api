const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: "./src/index.js", // 入力ファイル
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "lit-api.js", // 出力される単一ファイル名
    library: {
      name: "LifeIsTechAPI", // ブラウザで <script> 読み込みした時のグローバル変数名
      type: "umd", // UMD形式（CommonJS, AMD, ブラウザ等、どこでも動く形式）
    },
    globalObject: "this", // Node.jsとブラウザ両対応のため
  },
  plugins: [process.argv.includes("--analyze") && new BundleAnalyzerPlugin({})],
};
