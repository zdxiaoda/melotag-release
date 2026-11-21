# melotag-release

[音签 Melotag](https://github.com/zdxiaoda/Melotag) 的发布配套仓库：各平台打包脚本、Microsoft Store 提交物料，以及用 [Remotion](https://www.remotion.dev/) 纯代码生成的三语商店宣传片。

应用本体在 [zdxiaoda/Melotag](https://github.com/zdxiaoda/Melotag)。

## 目录

```
packaging/            # 打包脚本（由主仓库 CI checkout 到 packaging/ 路径使用）
├── windows/          # Inno Setup 安装包 + MSIX 脚本（build-msix*.ps1、Package.appxmanifest）
├── linux/            # RPM spec + .desktop
└── flatpak/          # flatpak-builder 清单

store/                # Microsoft Store 提交物料
├── listing/          # 三语 Store listing 正文（复制源）
├── privacy/          # 三语隐私政策（公开 URL 用）
├── submission/       # 提交核对清单、IARC、认证备注
├── images/           # 截图、商店图标、poster/box art/hero
├── audio/            # BGM 出处、署名与剪辑命令
├── tools/            # 商店图生成（Pillow）与截图脚本（PowerShell UIA）
└── trailer/          # Remotion 宣传片项目（zh-CN / ja-JP / en-US）
```

## 主仓库 CI 如何使用本仓库

主仓库 `.github/workflows/release.yml` 在发布时把本仓库 checkout 到其工作区的 `packaging/` 路径（sparse-checkout 只拉 `packaging/`），因此 Inno Setup、MSIX、RPM、Flatpak 脚本的相对路径保持不变：

```yaml
- uses: actions/checkout@v4
  with:
    repository: zdxiaoda/melotag-release
    ref: main
    path: packaging
    sparse-checkout: packaging
```

## 宣传片

三语宣传片完全由代码生成，无需 Windows 录屏：

```bash
cd store/trailer
npm install
npx remotion render src/index.ts trailer-zh-CN out/Melotag-<ver>-trailer-zh-CN.mp4
npx remotion still src/index.ts thumb-zh-CN ../trailer/zh-CN/thumbnail-1920x1080.png
```

详见 [store/trailer/README.md](store/trailer/README.md) 与 [store/README.md](store/README.md) 第 5.3 节。

## 许可说明

- 本仓库内容遵循与主仓库相同的 MIT 许可（品牌资产与商店物料除外，详见对应目录说明）。
- 宣传片 BGM：ChiliChill《给你的BGM Vol.1》（专辑简介开放各类使用、引用时提及名字），出处见 [store/audio/README.md](store/audio/README.md)。
- 宣传片使用 [Remotion](https://www.remotion.dev/) 构建：Remotion 对个人与不超过 3 人的团队免费（[Remotion License](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)）。
