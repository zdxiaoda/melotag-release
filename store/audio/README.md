# 宣传片配乐

宣传片背景音乐来自 ChiliChill乐团 的纯音乐专辑《给你的BGM Vol.1》。专辑简介明确"开放各类使用，希望引用时提及名字"，因此可以随本项目使用，**使用时注明来源**。

| 项目 | 值 |
| --- | --- |
| 专辑 | 《给你的BGM Vol.1》 |
| 作者 | ChiliChill乐团 |
| 来源（网易云音乐专辑页） | https://music.163.com/album?id=87691253 |
| 来源（SoundCloud） | https://soundcloud.com/chilichill-sc/bgm-vol-1 |
| 授权说明 | 专辑简介原文："一张很适合用来做BGM的纯音乐集 会不定时更新 开放各类使用 希望引用时提及名字!" |
| 入库片段 | `../trailer/public/bgm.m4a`（64s 起的 46 秒剪辑段，AAC 192 kbps，48 kHz 立体声，约 1.1 MB，归一化到 -22 LUFS） |
| 本地原始文件 | `200407_A cup of coffee Mixed.wav`（219.8 秒、48 kHz/24 bit，仅保存在本地，不入库） |
| 原始文件 SHA-256 | `d3ed52261450b6b894b29d3cccf019a39b2eb2e0770f178e188069ae6c057acc` |
| 获取日期 | 2026-11-21 |

## 使用方式

- Remotion 项目（`../trailer/`）通过 `staticFile("bgm.m4a")` 读取 `../trailer/public/bgm.m4a`；淡入淡出由 `<Audio volume={interpolate(...)}>` 在渲染时施加（首端约 1.5 秒、尾端 3 秒），音频文件本身不做淡入淡出。
- 成片响度链：片段先静态增益归一到 **-22 LUFS**（64s 段实测 -8.9 LUFS → 增益 -13.10 dB），与旧合成管线的目标一致。
- 换曲或换段落时，从本地 WAV 重新剪辑并覆盖 `../trailer/public/bgm.m4a`：

```bash
# 先测所选段落的整合响度（示例从 64s 起取 46s，实测 -8.9 LUFS）
ffmpeg -hide_banner -nostats -ss 64 -t 46 -i "200407_A cup of coffee Mixed.wav" \
  -af ebur128 -f null - 2>&1 | grep -A1 "Integrated loudness"

# 增益 = -22 − 实测响度（上例为 -13.10 dB），再剪辑输出
ffmpeg -hide_banner -loglevel error -y -ss 64 -t 46 \
  -i "200407_A cup of coffee Mixed.wav" \
  -af "volume=-13.10dB" -ar 48000 -ac 2 -c:a aac -b:a 192k -movflags +faststart \
  bgm-chilichill.m4a
cp bgm-chilichill.m4a ../trailer/public/bgm.m4a
```

- 原始 WAV 体积约 63 MB，不进入 Git（`.gitignore` 已忽略 `*.wav`）；换文件后请更新本表的来源与校验和。
- 上传宣传片到 Partner Center 时，在视频备注或认证备注中注明 BGM 出处（见 `../submission/upload-checklist.md`）。

## 署名

凡公开使用该配乐（包括商店宣传片成片），请注明：

> BGM: ChiliChill《给你的BGM Vol.1》
