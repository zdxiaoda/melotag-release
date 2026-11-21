# Melotag 商店宣传片（Remotion）

三语（zh-CN / ja-JP / en-US）Microsoft Store 宣传片完全由代码生成：五幕痛点叙事（乱 → 解 → 五个功能场景 → 收益 → CTA），前景全部是代码绘制的模拟 UI 组件（列表行、在线匹配、标签表单、歌词对齐、重命名对比、封面网格），截图仅作虚化背景板；浅色美术风格，营销文字用得意黑（Smiley Sans，随仓库捆绑，OFL-1.1），模拟 UI 文字用思源黑体/Noto Sans；配乐由 `<Audio>` 挂载，低频能量经 `@remotion/media-utils` 驱动辉光脉动。无需 Windows、无需录屏。

## 时间轴结构（共 3000 帧 = 50.0s @60fps，1920×1080）

```
[痛点 Hook 4.4s]   散乱破损文件卡 + 故障感大字"音乐库,一团乱?"
[转折 Reveal 3.2s] 光带扫飞旧卡片,Logo 弹入 + 旋转光环 + 应用名
[功能场景 x5 6.2s] 整库导入 / 在线源自动匹配 / 标签封面 / 歌词对齐 / 批量重命名
                   （虚化截图背景板 + 代码绘制 MockRow/云匹配/表单/歌词行/改名对比）
[收益 Payoff 5.6s] 封面网格逐个弹出 + 本地盾牌 + "全部本地完成"
[CTA 5.8s]         Logo + 免费 · Windows 10/11 + GitHub
```

转场：幕间用扫带 wipe 与径向闪光交替遮盖切换。所有动效以 30fps 逻辑帧书写（`useLogicalFrame`），60fps 输出下节奏不变。三语共用一套组件，文案与模拟 UI 文字集中在 [`src/data/captions.ts`](src/data/captions.ts)。

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

- 截图：`../images/screenshots/<lang>/`（历史采集素材，虚构演示内容）。
- LOGO：`../images/melotag-logo.png`。
- 字体：Noto Sans SC/JP/Sans 经 `@remotion/google-fonts` 在线加载（OFL-1.1，不捆绑）；得意黑 Smiley Sans 捆绑在 `public/fonts/`（OFL-1.1，许可文本见 `public/fonts/OFL-1.1.txt`），仅用于营销/展示文字，模拟 UI 文字用思源黑体。
- BGM：`public/bgm.m4a`，剪辑自 ChiliChill《给你的BGM Vol.1》（本地 WAV → **原曲 0s 起的 50s 段落** → 归一化 -22 LUFS → AAC 192k）。剪辑与署名见 [`../audio/README.md`](../audio/README.md)；**公开使用需注明出处**。

## 许可

- [Remotion](https://www.remotion.dev/) 对个人与不超过 3 人的团队免费（[Remotion License](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)）；本项目适用免费条款。
- 字体 OFL-1.1；BGM 见上文署名要求。
