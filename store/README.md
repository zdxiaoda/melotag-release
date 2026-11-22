# 音签 Melotag：Microsoft Store 提交物料

> 状态说明：本目录是提交准备材料。仓库中存在对应文件，不代表应用已经在 Partner Center 提交、通过认证、发布或获得任何 IARC 年龄评级。实际状态以 Partner Center、IARC 和 Microsoft Store 的返回结果为准。

## 定位与优势

音签 Melotag 是跨 Windows、Linux 与 Android 的本地音乐标签编辑器。三端共用 .NET 10、C# 与 Avalonia 12 的标签核心和界面代码，文件列表、编辑流程与设置项保持一致。应用不使用 Electron 或 Chromium 外壳，界面与逻辑运行在同一个 .NET 进程中。标签通过 TagLib# 在本地直接读写，音频文件不会上传；匹配结果的应用、重命名和保存都在本机完成，在线匹配只在需要时查询元数据、封面或歌词。对于没有标签或文件名错乱的文件，可用 AcoustID 音频指纹按声音内容识别：指纹在本机计算，只发送指纹与时长，不上传音频。面向曲库整理提供右键批量操作、选中行批量自动匹配、可自定义列与排序、批量保存、封面批量提取、模板/正则重命名与本地历史快照。界面支持简体中文、繁體中文、日本語与 English。Microsoft Store 提交物料覆盖 Windows x64 与 arm64（合并为一个 `.msixbundle`），Linux 与 Android 版本从项目 Release 获取；实际耗时取决于文件数量、磁盘与网络状况，本文不提供性能承诺。

| 项目 | 值 |
| --- | --- |
| 应用版本 | 1.7.0 |
| MSIX 包版本 | 1.7.0.0 |
| 价格 | 免费（Free） |
| 商店类别 | Music |
| 平台 | Windows PC |
| 系统要求 | Windows 10 版本 2004（内部版本 19041，即 10.0.19041）或更高；x64 或 arm64 处理器；AcoustID 指纹识别需系统 Media Foundation，Windows N 版需安装媒体功能包 |
| 支持 URL | https://github.com/zdxiaoda/Melotag/issues |
| 网站 | https://github.com/zdxiaoda/Melotag |
| 物料整理日期 | 2026-11-22 |

版本号来源：应用版本统一由 `Directory.Build.props` 的 `Version` 决定（本物料快照为 `1.7.0`）；桌面端程序集版本、Android `ApplicationDisplayVersion` 与默认 User-Agent 都从它自动派生。MSIX 的 `Identity/@Version` 必须是四段数字（本快照为 `1.7.0.0`），由 `packaging/windows/msix/build-msix.ps1` 注入。

## 1. 交付目录

| 目录/文件 | 内容 | 用途 | 是否上传到 Partner Center |
| --- | --- | --- | --- |
| `listing/zh-CN/listing.md` | 简体中文 listing 正文 | 复制到 zh-CN Store listing | 复制正文，不上传文件本身 |
| `listing/ja-JP/listing.md` | 日文 listing 正文 | 复制到 ja-JP Store listing | 复制正文，不上传文件本身 |
| `listing/en-US/listing.md` | 英文 listing 正文 | 复制到 en-US Store listing | 复制正文，不上传文件本身 |
| `images/screenshots/<lang>/` | 每语言 4 张截图 | 各语言 listing 截图 | 上传 PNG |
| `images/logo/app-tile-300x300.png` | 300×300 商店图标 | Store logo | 上传 PNG |
| `images/logo/box-art-1080x1080.png` | 1080×1080 box art | PC 可选展示物料 | 可选上传 |
| `images/poster/<lang>/poster-720x1080.png` | 每语言 1 张 poster | PC 可选展示物料 | 可选上传 |
| `images/hero/super-hero-1920x1080.png` | 1920×1080 hero art | PC 可选展示物料 | 可选上传 |
| `trailer/<lang>/Melotag-<ver>-trailer-<lang>.mp4` | 三语宣传片（1920×1080 @60fps，50 秒） | 对应语言 listing 的 Trailer 字段 | 上传 MP4 |
| `trailer/<lang>/thumbnail-1920x1080.png` | 对应语言的宣传片缩略图 | Trailer 缩略图 | 上传 PNG |
| `privacy/zh-CN/privacy.md`、`privacy/ja-JP/privacy.md`、`privacy/en-US/privacy.md` | 三语隐私政策源文件 | 发布为公开网页后填写 URL | 不上传文件，填写公开 URL |
| `tools/` | 图片生成与截图脚本 | 复现物料 | 不上传，也不放入 MSIX |

完整目录树：

```text
store/
├─ README.md
├─ listing/
│  ├─ zh-CN/listing.md
│  ├─ ja-JP/listing.md
│  └─ en-US/listing.md
├─ images/
│  ├─ FONT-LICENSES.md
│  ├─ melotag-logo.png
│  ├─ screenshots/
│  │  ├─ zh-CN/{01-main,02-lyrics,03-rename,04-settings}.png
│  │  ├─ ja-JP/{01-main,02-lyrics,03-rename,04-settings}.png
│  │  └─ en-US/{01-main,02-lyrics,03-rename,04-settings}.png
│  ├─ logo/
│  │  ├─ app-tile-300x300.png
│  │  └─ box-art-1080x1080.png
│  ├─ poster/
│  │  ├─ zh-CN/poster-720x1080.png
│  │  ├─ ja-JP/poster-720x1080.png
│  │  └─ en-US/poster-720x1080.png
│  └─ hero/
│     └─ super-hero-1920x1080.png
├─ trailer/                       # Remotion 宣传片项目
│  ├─ src/  public/  remotion.config.ts ...
│  ├─ zh-CN/  ja-JP/  en-US/      # 各语言缩略图 thumbnail-1920x1080.png
│  └─ out/                        # 渲染产物（不入库）
├─ privacy/
│  ├─ zh-CN/privacy.md
│  ├─ ja-JP/privacy.md
│  └─ en-US/privacy.md
├─ audio/
│  └─ README.md                   # BGM 出处、署名与剪辑命令
└─ tools/
   └─ Generate-StoreArt.py
```

除特别说明外，下文路径均相对于 `store/`；复现命令从 melotag-release 仓库根目录执行。本仓库自包含，不依赖 Melotag 主仓库的 checkout。

## 2. 三语 listing 与 Partner Center 字段映射

三份 listing 的字段标题只用于编辑和对照。复制到 Partner Center 时只取字段正文，不要带 Markdown 标题、列表编号或说明文字。

| Partner Center 字段 | zh-CN 来源 | ja-JP 来源 | en-US 来源 | 备注 |
| --- | --- | --- | --- | --- |
| Product name / 产品名称 | `listing/zh-CN/listing.md` §产品名称 | `listing/ja-JP/listing.md` §製品名 | `listing/en-US/listing.md` §Product name | 中文为“音签 Melotag”，日文和英文为“Melotag”；须先在 Partner Center 确认或预留名称 |
| Short title / 简短标题 | §简短标题 | §短いタイトル | §Short title | 与产品名称一致 |
| Short description / 简短说明 | §简短说明 | §短い説明 | §Short description | 简中 119、日文 176、英文 258 字符，保持单段 |
| Description / 详细说明 | §详细说明 | §詳細説明 | §Description | 必需字段；保留 DSF/DFF、多音轨和第三方在线结果的限制说明 |
| Product features / 产品功能 | §产品功能（10 条） | §製品の機能（10 項目） | §Product features（10 items） | 每条单独一行 |
| Search terms / 搜索关键词 | §搜索关键词（7 条） | §検索キーワード（7 件） | §Search keywords（7 items） | 以逗号分隔，不带编号 |
| Copyright / 版权 | §版权 | §著作権 | §Copyright | 三语均不超过 200 字符，MIT / 2026 zdxiaoda |
| Developed by / 开发者 | §开发者 | §開発者 | §Developed by | `zdxiaoda` |
| Screenshots and captions | §截图说明 + 对应 PNG | §スクリーンショットのキャプション + 对应 PNG | §Screenshot captions + 对应 PNG | 每语言 4 张，顺序见第 3 节 |
| What's new / 更新说明 | §更新说明 | §更新情報 | §What's new | 首次提交可留空；备用文本见 listing |
| Additional system requirements | §附加系统要求 | §追加のシステム要件 | §Additional system requirements | Windows 10 2004+ x64/arm64；Store 包已包含运行组件 |
| Support URL / 支持 URL | §支持 URL | §サポート URL | §Support URL | https://github.com/zdxiaoda/Melotag/issues |
| Website / 网站 | §网站 | §ウェブサイト | §Website | https://github.com/zdxiaoda/Melotag |
| Store logo（300×300） | `images/logo/app-tile-300x300.png` | 同一张 | 同一张 | 通用图标，可复用到三语 listing |
| Poster art | `images/poster/zh-CN/poster-720x1080.png` | `images/poster/ja-JP/poster-720x1080.png` | `images/poster/en-US/poster-720x1080.png` | PC 可选，每语言一张 |
| Box art / Hero art | `images/logo/box-art-1080x1080.png`、`images/hero/super-hero-1920x1080.png` | 同一组 | 同一组 | PC 可选，通用素材 |

在 Partner Center 中分别创建或编辑 zh-CN、ja-JP、en-US 三个语言 listing。每个语言只使用同语言的 listing 正文、截图和 caption，不要把中文截图复用到日文或英文 listing。

## 3. 三语截图上传映射

每语言上传 4 张，顺序固定为 `01-main` → `02-lyrics` → `03-rename` → `04-settings`。将每张图的说明粘贴到 Partner Center 对应截图的 Caption 字段。

### 简体中文（zh-CN）

目录：`images/screenshots/zh-CN/`；caption 来源：`listing/zh-CN/listing.md` §截图说明。

| 顺序 | 文件 | Caption |
| --- | --- | --- |
| 1 | `images/screenshots/zh-CN/01-main.png` | 主界面：文件列表与标签编辑区并排显示，可拖入文件或文件夹，并查看状态、格式与音频信息。 |
| 2 | `images/screenshots/zh-CN/02-lyrics.png` | 歌词面板：搜索 LRC 歌词、整理时间标签并预览结果，可导入或导出歌词文件。 |
| 3 | `images/screenshots/zh-CN/03-rename.png` | 重命名：用模板或正则生成新文件名，实时预览重名处理，可连带处理歌词与封面。 |
| 4 | `images/screenshots/zh-CN/04-settings.png` | 设置：按搜索、在线源、歌词、封面、写入与界面分类，可切换语言、主题和启动更新检查。 |

### 日本語（ja-JP）

目录：`images/screenshots/ja-JP/`；caption 来源：`listing/ja-JP/listing.md` §スクリーンショットのキャプション。

| 顺序 | 文件 | Caption |
| --- | --- | --- |
| 1 | `images/screenshots/ja-JP/01-main.png` | メイン画面：ファイル一覧とタグ編集を並べて表示。ファイルやフォルダーをドラッグして追加し、状態や形式、音声情報を確認できます。 |
| 2 | `images/screenshots/ja-JP/02-lyrics.png` | 歌詞パネル：LRC 歌詞を検索し、タイムタグを整理してプレビュー。歌詞ファイルの読み込みと書き出しも行えます。 |
| 3 | `images/screenshots/ja-JP/03-rename.png` | リネーム：テンプレートまたは正規表現で新しいファイル名を生成。重複処理をプレビューし、歌詞とカバーの同時変更も選べます。 |
| 4 | `images/screenshots/ja-JP/04-settings.png` | 設定：検索、オンラインソース、歌詞、カバー、書き込み、UI のカテゴリ別に整理。言語、テーマ、起動時の更新確認を変更できます。 |

### English（en-US）

目录：`images/screenshots/en-US/`；caption 来源：`listing/en-US/listing.md` §Screenshot captions。

| 顺序 | 文件 | Caption |
| --- | --- | --- |
| 1 | `images/screenshots/en-US/01-main.png` | Main window: file list and tag editor side by side. Drag in files or folders, then check status, format, and audio details. |
| 2 | `images/screenshots/en-US/02-lyrics.png` | Lyrics panel: search LRC, clean up time tags, and preview the result; import or export lyric files. |
| 3 | `images/screenshots/en-US/03-rename.png` | Rename: build new filenames with templates or regular expressions, preview duplicate handling, and optionally rename lyrics and covers too. |
| 4 | `images/screenshots/en-US/04-settings.png` | Settings: organized into Search, Sources, Lyrics, Covers, Writing, and Interface; switch language and theme, or disable the startup update check. |

截图脚本使用独立的虚构演示库：曲名、艺术家、歌词和封面均为临时生成的虚构内容，不包含真实音乐库、版权音乐或用户文件。详见第 5 节。

## 4. 图片规格与上传位置

以下尺寸和文件大小来自当前仓库物料（2026-11-03 测量）。上传前不要再次压缩或改变画布比例。所有商店图片均为 PNG；除 300×300 图标外，展示图为不透明画面。

| 用途 | 路径 | 尺寸 | 模式 | 当前大小 | 数量 | 必需性 | 上传位置 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 截图 | `images/screenshots/<lang>/*.png` | 1600×900 | RGBA（32 位 ARGB 缓冲区；画面不透明） | 26.6–181.7 KiB/张 | 每语言 4 张 | 必需；每语言至少 1 张，本套 4 张 | 对应语言 listing 的截图区 |
| 商店图标 | `images/logo/app-tile-300x300.png` | 300×300 | RGBA | 26.5 KiB | 1 张 | 必需；Store logo | Partner Center 的 Store logo |
| Poster | `images/poster/<lang>/poster-720x1080.png` | 720×1080 | RGB | 277.2–286.8 KiB | 3 张 | PC 可选；三语各一张 | 对应语言 listing 的 poster art |
| Box art | `images/logo/box-art-1080x1080.png` | 1080×1080 | RGB | 276.1 KiB | 1 张 | PC 可选；通用 | 任一/全部语言的 box art |
| Hero art | `images/hero/super-hero-1920x1080.png` | 1920×1080 | RGB | 414.2 KiB | 1 张 | PC 可选；通用 | 任一/全部语言的 hero art |

当前交付图共 18 张：截图 12 张（三语各 4 张）、300×300 商店图标 1 张、box art 1 张、poster 3 张、hero art 1 张。

必需项：三语 listing 描述、每语言截图（至少 1 张，本套 4 张）、300×300 商店图标、隐私政策公开 URL 和 MSIX 包。Poster、box art、hero art 是 PC 商店的可选展示物料；不上传不影响必需项，也不能替代截图或描述。

300×300 商店图标与 MSIX 包内图标不是同一个文件：包内 `Assets\StoreLogo.png` 为 50×50，另有 44×44、71×71、150×150、310×310 和 310×150 等包图标，由 `tools/Melotag.Branding` 生成。不要把 300×300 的 listing 图标改名成 `StoreLogo.png`，也不要因为已上传 listing 图标就删除包内图标。

### 可商用字体

商店图与宣传片的文字遵循统一分工：**营销/展示文字用得意黑（Smiley Sans），软件操作演示与正文用思源黑体 / Noto Sans**，均为 SIL Open Font License 1.1（OFL-1.1），允许商业使用。Noto Sans 与思源黑体不捆绑、按本机已安装字体读取；得意黑随仓库捆绑在 `trailer/public/fonts/`（附 OFL 许可文本），商店图脚本与 Remotion 共用同一文件。家族、版本、路径、官方许可证链接与复现命令见 [images/FONT-LICENSES.md](images/FONT-LICENSES.md)。

## 5. 复现命令

以下命令均从 melotag-release 仓库根目录执行。它们只重新生成图片与视频，不会提交、上传或发布任何内容。

### 5.1 生成 app tile、box art、三语 poster 与 hero art

```bash
uv run --offline --with pillow python store/tools/Generate-StoreArt.py
```

- 脚本读取 `store/images/melotag-logo.png` 和本机字体，不访问网络。
- 默认输出到 `store/images`，生成 6 个 PNG：300×300 app tile、1080×1080 box art、3 张 720×1080 poster、1920×1080 hero art。
- 脚本会校验尺寸、sRGB ICC 配置和单文件小于 50 MB。
- `--offline` 依赖 uv 本地缓存中的 Pillow；如果缓存中没有 Pillow，需要先在有网络的环境准备该依赖。
- 只生成某一组时，可使用 `--only tile`、`--only box`、`--only posters` 或 `--only hero`；`--out <目录>` 可改输出根目录。

### 5.2 商店截图

`images/screenshots/<lang>/` 的 12 张截图（1600×900）为已采集的历史素材：由 Melotag 应用在隔离数据目录（独立的虚构演示曲库与 settings.json）中运行后截取，内容全部为虚构演示数据，不含真实音乐库。采集脚本已随主仓库依赖一并移除，本仓库不再包含截图复现工具；截图过期时需使用应用的新版本重新采集后覆盖同名文件。

> 注意：现有截图采集于 1.4.1。1.7.0 已加入行右键菜单、可自定义列与排序、重做的在线匹配页和对话框样式，正式提交前应使用 1.7.0 重新采集，避免截图与当前界面不一致。宣传片前景为代码绘制的模拟 UI，不直接引用这些截图。

### 5.3 渲染宣传片（Remotion）

宣传片对应 Partner Center 的 Trailer 字段，不是上架必需项。三语版本由 `trailer/` 下的 Remotion 项目纯程序化生成：五幕痛点叙事，前景全部是代码绘制的模拟 UI 组件（浅色美术，营销文字得意黑、模拟 UI 思源黑体），截图仅作虚化背景板；配乐来自 ChiliChill《给你的BGM Vol.1》（使用需署名，见 [audio/README.md](audio/README.md)）。三语文案集中在 `trailer/src/data/captions.ts`，改文案只需改这一个文件并重新渲染，无需任何录制。

```bash
# 首次：安装依赖（Noto 系列字体渲染时经网络加载，得意黑已捆绑）
cd trailer && npm install

# 预览调参
npx remotion studio

# 渲染三语成片（1920×1080、60 fps、50 秒）
npx remotion render src/index.ts trailer-zh-CN out/Melotag-<ver>-trailer-zh-CN.mp4
npx remotion render src/index.ts trailer-ja-JP out/Melotag-<ver>-trailer-ja-JP.mp4
npx remotion render src/index.ts trailer-en-US out/Melotag-<ver>-trailer-en-US.mp4

# 渲染各语言 Trailer 缩略图（1920×1080 PNG，入库）
npx remotion still src/index.ts thumb-zh-CN zh-CN/thumbnail-1920x1080.png
npx remotion still src/index.ts thumb-ja-JP ja-JP/thumbnail-1920x1080.png
npx remotion still src/index.ts thumb-en-US en-US/thumbnail-1920x1080.png
```

产物与校验：

| 文件 | 说明 |
| --- | --- |
| `trailer/out/Melotag-<ver>-trailer-<lang>.mp4` | 1920×1080、60 fps、H.264 + AAC、50 秒、faststart；上传 Partner Center |
| `trailer/<lang>/thumbnail-1920x1080.png` | 上传 Trailer 时要求的 1920×1080 PNG 缩略图；入库 |

渲染完成后可用 `trailer/scripts/validate.sh`（ffprobe）复检分辨率、帧率、编码、时长与 faststart。

内容与合规约定：

- 画面只用入库的三语商店截图（虚构演示内容，见第 3 节），不包含真实音乐库或用户文件。
- 配乐：ChiliChill《给你的BGM Vol.1》，专辑简介开放各类使用、引用时提及名字；出处、剪辑与署名方式见 [audio/README.md](audio/README.md)。上传时在视频备注中注明出处。
- 字体：营销/展示文字用得意黑（捆绑于 `trailer/public/fonts/`，OFL-1.1），Noto Sans SC / Noto Sans JP / Noto Sans 与思源黑体按本机安装读取（OFL-1.1）；详见 [images/FONT-LICENSES.md](images/FONT-LICENSES.md)。
- Remotion 许可：对个人与不超过 3 人的团队免费；本项目适用免费条款，见 [trailer/README.md](trailer/README.md)。
- 成片 MP4 不进入 Git（见 `.gitignore` 的 `trailer/out/`），只提交项目代码与缩略图。
- 不使用年龄分级标识、微软或其他平台品牌标识。应用上架前，结尾卡只写"免费 / Windows 10-11 / x64 与 arm64"和 GitHub 地址，不写"在 Microsoft Store 下载"。
- Trailer 需单独通过认证；时长 50 秒在 60 秒限制内，画面必须与当前版本界面一致（截图过期时先用 5.2 重截）。

## 6. 上传顺序建议

1. 在 Partner Center 预留或确认产品名称，创建 Windows PC 应用，记录三个产品标识。
2. 填写 Properties：Free、Music、Windows 10 2004+ x64/arm64、支持 URL、网站、版权和开发者信息。
3. 将 `store/privacy/` 推送到公开仓库（melotag-release）的 `main` 分支，验证三个隐私政策 URL 可公开访问后，再填入 Partner Center。
4. 完成 IARC 问卷并取得评级结果；在证书签发前不要填写或宣称评级。
5. 生成并上传 `.msixbundle`，确认包版本为 `1.7.0.0` 且包标识与 Partner Center 一致。
6. 按 zh-CN、ja-JP、en-US 分别填写 listing，上传对应 4 张截图和 caption，以及 300×300 商店图标。
7. 如需美化 PC 商店页面，再上传可选的 poster、box art 和 hero art。
8. 如需宣传片，在该语言 listing 的 Trailer 区域上传对应 MP4 与 1920×1080 缩略图；Trailer 需单独通过认证。
9. 在 Notes for certification 中粘贴英文认证备注，完成冒烟测试后提交认证。

## 7. 不要上传或不要打包的内容

- `tools/`：图片生成与截图脚本，不是商店素材；不要上传，也不要放进 MSIX。
- `trailer/out/`、`trailer/node_modules/`：渲染产物与依赖，只上传成片 MP4 与缩略图。
- `audio/`：配乐出处与剪辑说明（音频本身在 `trailer/public/bgm.m4a`，已嵌入成片）；不要把音频单独上传到 Store。
- `listing/*/listing.md`：作为复制源，不要把 Markdown 文件当作图片或 listing 附件上传。
- `privacy/*/privacy.md`：作为待发布网页源文件，不要作为图片素材上传；应在公开后可访问时填写 URL。
- 任何 `__IDENTITY_NAME__`、`__PUBLISHER__`、`__PUBLISHER_DISPLAY_NAME__`、`__VERSION__` 占位符都不得留在最终 MSIX 的 `AppxManifest.xml` 中。
- PC 可选图（poster、box art、hero art）不是必需项，也不能替代截图；不上传不影响必需项。

## 8. 隐私政策 URL 与发布状态

隐私政策源文件在本仓库 `store/privacy/`，建议使用以下 GitHub `main` 分支路径（推送本仓库后生效）：

| 语言 | 建议 URL |
| --- | --- |
| zh-CN | https://github.com/zdxiaoda/melotag-release/blob/main/store/privacy/zh-CN/privacy.md |
| ja-JP | https://github.com/zdxiaoda/melotag-release/blob/main/store/privacy/ja-JP/privacy.md |
| en-US | https://github.com/zdxiaoda/melotag-release/blob/main/store/privacy/en-US/privacy.md |

上述链接在推送到公开仓库前不可用。本文档不表示隐私政策已经公开。推送后请用无痕窗口或未登录浏览器逐个打开，确认无需登录、没有 404、渲染正常，再填入 Partner Center。如果仓库不是公开仓库，这些链接不能作为公开隐私政策 URL。

## 9. 发布前提醒

- 应用版本为 `1.7.0`，MSIX 包版本为 `1.7.0.0`；最终以 `AppxManifest.xml` 的 `Identity/@Version` 为准。
- 商店价格为免费，类别为 Music；系统要求为 Windows 10 2004（10.0.19041）或更高、x64/arm64；商店包为包含两个架构的 `.msixbundle`。
- 支持 URL 和网站分别为 `https://github.com/zdxiaoda/Melotag/issues` 与 `https://github.com/zdxiaoda/Melotag`。
- 隐私政策 URL 只有在推送并验证后才有效；IARC 评级只有在证书签发后才可引用。
- 本文档中的状态说明都不代表应用已经提交、通过认证、上架或获得评级。
