# Melotag 商店宣传片（Remotion）

三语（zh-CN / ja-JP / en-US）Microsoft Store 宣传片完全由代码生成：渐变背景、标题卡、截图 Ken Burns 运镜、字幕条与结尾卡都是 React 组件，配乐由 `<Audio>` 挂载。无需 Windows、无需录屏。

## 时间轴结构

```
[标题卡 4.0s]  LOGO + 应用名 + 分隔线 + 标语 + 特性条
[特性节拍 x6]  商店截图 Ken Burns 运镜 + 底部字幕条（4.4-4.6s/节拍）
[结尾卡 4.6s]  LOGO + 免费 · Windows 10/11 · x64/arm64 + GitHub
```

总长约 35.4s（上限 60s），1920×1080 @30fps。三语共用一套组件，文案与运镜集中在 [`src/data/captions.ts`](src/data/captions.ts)（移植自旧 `Build-StoreTrailer.py` 的 `CAPTIONS`/`TITLE`/`END`）。

## 渲染

```bash
npm install

npx remotion studio                        # 预览调参

npm run render:zh-CN                       # out/Melotag-trailer-zh-CN.mp4
npm run render:ja-JP
npm run render:en-US

npm run still:zh-CN                        # 覆盖 ../trailer/zh-CN/thumbnail-1920x1080.png
npm run still:ja-JP
npm run still:en-US

npm run validate                           # ffprobe 校验成片
```

上传 Store 时把 `out/` 里的成片重命名为 `Melotag-<版本>-trailer-<lang>.mp4`（版本取主仓库 `Directory.Build.props`）。成片不入库（`.gitignore` 已忽略 `out/`）；缩略图入库。

- 渲染需要网络：字体经 `@remotion/google-fonts` 在线加载（Noto Sans SC / Noto Sans JP / Noto Sans，OFL-1.1，仓库不捆绑字体）。
- 首次渲染时 Remotion 会自动下载 Headless Shell，之后离线可渲染（字体除外）。

## 资源

- 截图：`../images/screenshots/<lang>/`（由 `../tools/Capture-StoreScreenshots.ps1` 采集，虚构演示内容）。
- LOGO：`../images/melotag-logo.png`。
- BGM：`public/bgm.m4a`，剪辑自 ChiliChill《给你的BGM Vol.1》（本地 WAV → 46s 段落 → loudnorm -22 LUFS → AAC 192k）。剪辑与署名见 [`../audio/README.md`](../audio/README.md)；**公开使用需注明出处**，上传 Store 时在视频备注中注明。

## 许可

- [Remotion](https://www.remotion.dev/) 对个人与不超过 3 人的团队免费（[Remotion License](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)）；本项目适用免费条款。
- 字体 OFL-1.1；BGM 见上文署名要求。
