async function main() {
  const token = await LifeIsTechAPI.tryGetMozermovie();
  if (!token) throw new Error("no token");
  const userBase = new LifeIsTechAPI.UserBase(token);
  // 最初のページを指定
  const pages = await userBase.getPages();
  const page = await pages[0].load();

  // ダウンロード
  const res = await page.getZipResponse();
  const downloader = document.createElement("a");
  downloader.href = URL.createObjectURL(await res.blob());
  downloader.download = "page.zip";
  downloader.click();
}

main();
