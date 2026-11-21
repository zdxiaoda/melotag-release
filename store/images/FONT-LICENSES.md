# 商店图片与宣传片字体与许可证记录

本文记录 `store/tools/Generate-StoreArt.py` 生成商店图与 `store/trailer/`（Remotion）渲染宣传片时实际使用的字体，最近核验日期 2026-11-21。

- 字体均为 SIL Open Font License 1.1（OFL-1.1），允许商业使用。
- Noto Sans 与思源黑体不复制、不捆绑、不再分发字体文件，按本机已安装字体读取（Windows 字体目录或 `~/.local/share/fonts`、`/usr/share/fonts`）。
- 例外：得意黑 Smiley Sans 因 Remotion 渲染需要，随仓库捆绑在 `trailer/public/fonts/SmileySans-Oblique.otf`，并附许可文本 `trailer/public/fonts/OFL-1.1.txt`（OFL-1.1 允许捆绑再分发）。商店图脚本优先读取该捆绑文件，保证跨机器渲染一致。
- `images/screenshots/` 是应用真实截图，由另一脚本采集，不在本文范围内。

## 实际使用的字体

| 字体家族 / 字重 | 版本 | 文件 | 使用位置 |
| --- | --- | --- | --- |
| 得意黑 Smiley Sans / Oblique | 2.0.1 | `trailer/public/fonts/SmileySans-Oblique.otf`（捆绑，SHA-256 `139b5dcbe70d6d52de85a62d148784c6af4bd161e38fdb62ba0c1e7e5065fca6`；亦接受本机安装副本） | 宣传片营销/展示文字（标题、字幕条、应用名）；商店图 headline 与 "Melotag" wordmark。不含假名，日文 headline 回退思源黑体 |
| Noto Sans / Bold | 本机版本 | Windows `C:\Windows\Fonts\NotoSans-Bold.ttf`（SHA `3a08a47daa00cade516425c15c57615aef2fd418ec9811a7b9f465088f92cc05`）或 Linux `/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf` | 英文正文/注释、Remotion 模拟 UI 英文 |
| Noto Sans / Regular | 本机版本 | Windows `C:\Windows\Fonts\NotoSans-Regular.ttf`（SHA `f5f552c8c5edb61fe6efb824baf4d4de47b1a8689ab4925ff43f7bd6a4ebece5`）或 Linux 同目录 | 英文正文、注释 |
| 思源黑体（Source Han Sans SC/CN）/ Bold | 2.005 | Windows 用户字体 `SourceHanSansSC-Bold.otf`（SHA `df2b90f5bcc6d01dfc964cec5f6d535d6b6aebd26ed7fd79a9c1b3f2112fcb6b`）或 `~/.local/share/fonts/SourceHanSansCN-Bold.otf` | 中文/日文标题以外的一切 CJK 加粗文字、模拟 UI、日文 headline |
| 思源黑体（Source Han Sans SC/CN）/ Regular | 2.005 | Windows 用户字体 `SourceHanSansSC-Regular.otf`（SHA `f1d8611151880c6c336aabeac4640ef434fa13cbfbf1ffe82d0a71b2a5637256`）或 `~/.local/share/fonts/SourceHanSansCN-Regular.otf` | 中文/日文正文、注释 |

分工原则（2026-11-21 确定）：**营销/展示文字用得意黑，软件操作演示（模拟 UI）文字用思源黑体**。得意黑不含日文假名，日文 headline 自动回退思源黑体；脚本渲染前逐字符检查覆盖，缺字即中止。

## 许可证与商用结论

| 字体 | 许可证 | 官方文本 | 商用结论 |
| --- | --- | --- | --- |
| 得意黑 Smiley Sans | SIL OFL 1.1 | https://github.com/atelier-anchor/smiley-sans （捆绑副本附 `trailer/public/fonts/OFL-1.1.txt`） | 允许；随仓库捆绑再分发，保留许可文本与版权声明。 |
| Noto Sans | SIL OFL 1.1 | https://github.com/notofonts/latin-greek-cyrillic/blob/main/OFL.txt | 允许；未声明 Reserved Font Name。 |
| 思源黑体（Source Han Sans） | SIL OFL 1.1 | https://github.com/adobe-fonts/source-han-sans/blob/master/LICENSE.txt | 允许；Reserved Font Name 为 `Source`，本仓库不修改、不再分发其字体软件（得意黑除外，见上）。 |

OFL-1.1 官方说明：https://openfontlicense.org 。许可证义务主要针对字体软件本身的再分发；除得意黑外本仓库只提交渲染后的 PNG，不附带字体二进制。

## 字符覆盖与日文字形

渲染前脚本会对三语文案逐字符检查，缺字即中止；中文（得意黑 headline + 思源黑体其余）、日文（全思源黑体）、英文（得意黑 headline + Noto Sans 其余）均为 0 缺字。

## 复现

在仓库根目录执行：

```bash
uv run --offline --with pillow==13.0.0 python store/tools/Generate-StoreArt.py
```

脚本读取本机字体目录（Windows：`C:\Windows\Fonts` 与用户字体目录；Linux/macOS：`~/.local/share/fonts`、`/usr/share/fonts/truetype/noto`）以及仓库内捆绑的得意黑，不访问网络；默认重新生成 `store/images/` 下的商店图。更换字体时需同时满足本机可用、OFL 或等效可商用许可、覆盖三语全部文案，并更新 `FONT_CANDIDATES` 与本文档。
