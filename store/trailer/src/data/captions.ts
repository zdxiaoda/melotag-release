import type { LanguageCode } from "../assets";

export const FPS = 60;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/**
 * Five-act pain-point storyboard (total 3000 frames = 50.0s at 60fps):
 * hook (pain) -> reveal (logo) -> 5 core-flow scenes -> payoff -> CTA.
 * The core flow mirrors the app order: import, online auto-match, tag edit,
 * lyrics, rename.
 */
export const HOOK_FRAMES = Math.round(4.4 * FPS);
export const REVEAL_FRAMES = Math.round(3.2 * FPS);
export const SCENE_FRAMES = Math.round(6.2 * FPS); // per core-flow scene
export const PAYOFF_FRAMES = Math.round(5.6 * FPS);
export const CTA_FRAMES = Math.round(5.8 * FPS);

export const totalFramesAll = (): number =>
  HOOK_FRAMES + REVEAL_FRAMES + SCENE_FRAMES * 5 + PAYOFF_FRAMES + CTA_FRAMES;

export interface LanguageSpec {
  code: LanguageCode;
  name: string;
  tagline: string;
  chips: string;
  fontFamily: string;
  /** Marketing/display face: Smiley Sans where the glyphs allow. */
  displayFont: string;
  /** Act 1 — pain hook. */
  hook: { headline: string; sub: string; cards: string[] };
  /** Act 2 — logo reveal. */
  revealTagline: string;
  /** Act 3 — core flow captions, one per scene. */
  scenes: { importing: string; matching: string; tagging: string; lyrics: string; renaming: string };
  /** Mock-UI strings localised like the app UI. */
  ui: {
    read: string;
    matched: string;
    written: string;
    failed: string;
    fields: { title: string; artist: string; album: string };
    values: { title: string; artist: string; album: string };
  };
  /** Act 4 — payoff. */
  payoff: { headline: string; sub: string };
  /** Act 5 — call to action. */
  endLine: string;
  url: string;
}

// Fictional demo library shared by every language (mirrors the store
// screenshots' sample data). Filenames are data, not UI copy.
export const MOCK_TRACKS = [
  { file: "01 - 夜航星图.mp3", title: "夜航星图", artist: "林间回声", album: "星港夜话" },
  { file: "02 - 潮汐备忘录.mp3", title: "潮汐备忘录", artist: "林间回声", album: "星港夜话" },
  { file: "03 - 风经过旧车站.mp3", title: "风经过旧车站", artist: "林间回声", album: "星港夜话" },
  { file: "04 - 第七个夏天.mp3", title: "第七个夏天", artist: "林间回声", album: "星港夜话" },
  { file: "05 - 云端邮局.mp3", title: "云端邮局", artist: "苏澜", album: "潮汐备忘录" },
  { file: "06 - 纸飞机航线.mp3", title: "纸飞机航线", artist: "苏澜", album: "潮汐备忘录" },
] as const;

export const MOCK_RENAMES = [
  { from: "Track01.mp3", to: "01 - 夜航星图.mp3" },
  { from: "Track02.mp3", to: "02 - 潮汐备忘录.mp3" },
  { from: "audio_07.mp3", to: "03 - 风经过旧车站.mp3" },
] as const;

// Time-tag chips for the lyrics scene; bars are drawn, never text.
export const MOCK_LYRICS = ["00:12.50", "00:18.20", "00:24.00", "00:29.80", "00:35.60", "00:42.10"] as const;

export const LANGUAGE_CODES: LanguageCode[] = ["zh-CN", "ja-JP", "en-US"];

export const LANGUAGES: Record<LanguageCode, LanguageSpec> = {
  "zh-CN": {
    code: "zh-CN",
    name: "音签 Melotag",
    tagline: "本地音乐标签编辑器",
    chips: "批量匹配 · 封面 · 歌词 · 重命名",
    fontFamily: '"Noto Sans SC"',
    displayFont: '"Smiley Sans", "Noto Sans SC", sans-serif',
    hook: {
      headline: "你的音乐,失去了秩序。",
      sub: "标签丢失 · 封面缺失 · 文件混乱",
      cards: ["Track01.mp3 · 未知艺术家", "audio_07.mp3 · 缺少封面", "IMG_2034.mp3 · 文件名混乱"],
    },
    revealTagline: "把秩序,还给音乐。",
    scenes: {
      importing: "拖进来,整库就绪。",
      matching: "在线匹配,自动补全。",
      tagging: "标签封面,一次补齐。",
      lyrics: "歌词时间轴,分毫不差。",
      renaming: "重命名,先看后动。",
    },
    ui: {
      read: "已读取",
      matched: "已匹配",
      written: "已写入",
      failed: "0 失败",
      fields: { title: "标题", artist: "艺术家", album: "专辑" },
      values: { title: "夜航星图", artist: "林间回声", album: "星港夜话" },
    },
    payoff: {
      headline: "井井有条,尽在本地。",
      sub: "标签本地读写 · 音频从不上传",
    },
    endLine: "开源免费 · 跨平台",
    url: "github.com/zdxiaoda/Melotag",
  },
  "ja-JP": {
    code: "ja-JP",
    name: "Melotag",
    tagline: "ローカル音楽タグエディター",
    chips: "一括取得 · カバー · 歌詞 · 名前変更",
    fontFamily: '"Noto Sans JP"',
    displayFont: '"Smiley Sans", "Noto Sans JP", sans-serif',
    hook: {
      headline: "音楽が、秩序を失った。",
      sub: "タグなし · カバーなし · 名前バラバラ",
      cards: ["Track01.mp3 · 不明のアーティスト", "audio_07.mp3 · カバーなし", "IMG_2034.mp3 · 名前が滅茶苦茶"],
    },
    revealTagline: "音楽に、秩序を。",
    scenes: {
      importing: "フォルダーを、置くだけ。",
      matching: "オンラインで、自動マッチ。",
      tagging: "タグもカバーも、一括で。",
      lyrics: "タイムタグを、ぴたりと。",
      renaming: "名前変更は、先に確認。",
    },
    ui: {
      read: "読み込み済み",
      matched: "マッチ済み",
      written: "書き込み済み",
      failed: "失敗 0",
      fields: { title: "タイトル", artist: "アーティスト", album: "アルバム" },
      values: { title: "夜航星图", artist: "林間回声", album: "星港夜話" },
    },
    payoff: {
      headline: "すべて整い、すべてローカル。",
      sub: "タグはローカル読み書き · 音声は送信なし",
    },
    endLine: "オープンソース · 無料 · クロスプラットフォーム",
    url: "github.com/zdxiaoda/Melotag",
  },
  "en-US": {
    code: "en-US",
    name: "Melotag",
    tagline: "Local music tag editor",
    chips: "Match · covers · lyrics · rename",
    fontFamily: '"Noto Sans"',
    displayFont: '"Smiley Sans", "Noto Sans", sans-serif',
    hook: {
      headline: "Your music, out of order.",
      sub: "Missing tags · No covers · A mess of files",
      cards: ["Track01.mp3 · Unknown artist", "audio_07.mp3 · No cover", "IMG_2034.mp3 · Messy name"],
    },
    revealTagline: "Order, restored.",
    scenes: {
      importing: "Drop it in. Done.",
      matching: "Matched, automatically.",
      tagging: "Tags and covers, filled.",
      lyrics: "Lyrics, perfectly timed.",
      renaming: "Rename, previewed first.",
    },
    ui: {
      read: "Read",
      matched: "Matched",
      written: "Written",
      failed: "0 failed",
      fields: { title: "Title", artist: "Artist", album: "Album" },
      values: { title: "Night Star Chart", artist: "Forest Echo", album: "Star Port Stories" },
    },
    payoff: {
      headline: "Organized. Local. Yours.",
      sub: "Tags stay on your device · No uploads",
    },
    endLine: "Open source · Free · Cross-platform",
    url: "github.com/zdxiaoda/Melotag",
  },
};

export const getLanguage = (code: string): LanguageSpec => {
  const spec = LANGUAGES[code as LanguageCode];
  if (!spec) {
    throw new Error(`Unknown language: ${code}`);
  }
  return spec;
};
