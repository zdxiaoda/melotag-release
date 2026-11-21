import type { LanguageCode, ShotName } from "../assets";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const TITLE_FRAMES = 120; // 4.0s
export const END_FRAMES = 138; // 4.6s

/**
 * Copy and timing ported from the retired Build-StoreTrailer.py
 * (CAPTIONS / TITLE / END dicts). Each beat maps to one of the store
 * screenshots plus a Ken Burns move; captions mirror the on-screen action.
 */
export interface KenBurns {
  scaleFrom: number;
  scaleTo: number;
  xFrom: number; // percent of layer width, positive moves the image right
  xTo: number;
  yFrom: number; // percent of layer height
  yTo: number;
}

export interface BeatSpec {
  name: string;
  caption: string;
  shot: ShotName;
  durationInFrames: number;
  kenBurns: KenBurns;
}

export interface LanguageSpec {
  code: LanguageCode;
  name: string;
  tagline: string;
  chips: string;
  endLine: string;
  url: string;
  fontFamily: string;
  beats: BeatSpec[];
}

const beat = (
  name: string,
  caption: string,
  shot: ShotName,
  seconds: number,
  kenBurns: KenBurns,
): BeatSpec => ({
  name,
  caption,
  shot,
  durationInFrames: Math.round(seconds * FPS),
  kenBurns,
});

export const LANGUAGES: Record<LanguageCode, LanguageSpec> = {
  "zh-CN": {
    code: "zh-CN",
    name: "音签 Melotag",
    tagline: "本地音乐标签编辑器",
    chips: "批量匹配 · 封面 · 歌词 · 重命名",
    endLine: "免费 · Windows 10 / 11 · x64 与 arm64",
    url: "github.com/zdxiaoda/Melotag",
    fontFamily: '"Noto Sans SC"',
    beats: [
      beat("import", "整库载入，一眼看清状态", "main", 4.4, { scaleFrom: 1.0, scaleTo: 1.06, xFrom: 0, xTo: 0, yFrom: 0, yTo: 0 }),
      beat("select", "选中曲目，右侧直接编辑标签", "main", 4.4, { scaleFrom: 1.08, scaleTo: 1.1, xFrom: 0, xTo: -4, yFrom: 0, yTo: -2 }),
      beat("lyrics", "歌词：时间轴整理、导入与导出", "lyrics", 4.6, { scaleFrom: 1.02, scaleTo: 1.08, xFrom: 0, xTo: 0, yFrom: 0, yTo: -3 }),
      beat("rename", "重命名：模板或正则，先预览再执行", "rename", 4.6, { scaleFrom: 1.1, scaleTo: 1.02, xFrom: -2, xTo: 0, yFrom: 0, yTo: 0 }),
      beat("settings", "设置：在线源、封面、写入与界面", "settings", 4.4, { scaleFrom: 1.04, scaleTo: 1.07, xFrom: 3, xTo: -3, yFrom: 0, yTo: 0 }),
      beat("outro", "标签在本地读写，音频不上传", "main", 4.4, { scaleFrom: 1.08, scaleTo: 1.0, xFrom: 0, xTo: 0, yFrom: 0, yTo: 0 }),
    ],
  },
  "ja-JP": {
    code: "ja-JP",
    name: "Melotag",
    tagline: "ローカル音楽タグエディター",
    chips: "一括取得 · カバー · 歌詞 · 名前変更",
    endLine: "無料 · Windows 10 / 11 · x64 と arm64",
    url: "github.com/zdxiaoda/Melotag",
    fontFamily: '"Noto Sans JP"',
    beats: [
      beat("import", "フォルダーを投入、ライブラリを一括表示", "main", 4.4, { scaleFrom: 1.0, scaleTo: 1.06, xFrom: 0, xTo: 0, yFrom: 0, yTo: 0 }),
      beat("select", "曲を選んで右側でタグを直接編集", "main", 4.4, { scaleFrom: 1.08, scaleTo: 1.1, xFrom: 0, xTo: -4, yFrom: 0, yTo: -2 }),
      beat("lyrics", "歌詞：タイムタグ整理と入出力", "lyrics", 4.6, { scaleFrom: 1.02, scaleTo: 1.08, xFrom: 0, xTo: 0, yFrom: 0, yTo: -3 }),
      beat("rename", "テンプレート / 正規表現で名前変更をプレビュー", "rename", 4.6, { scaleFrom: 1.1, scaleTo: 1.02, xFrom: -2, xTo: 0, yFrom: 0, yTo: 0 }),
      beat("settings", "設定：オンラインソース、カバー、書き込み、UI", "settings", 4.4, { scaleFrom: 1.04, scaleTo: 1.07, xFrom: 3, xTo: -3, yFrom: 0, yTo: 0 }),
      beat("outro", "タグはローカルで読み書き。音声は送信しません。", "main", 4.4, { scaleFrom: 1.08, scaleTo: 1.0, xFrom: 0, xTo: 0, yFrom: 0, yTo: 0 }),
    ],
  },
  "en-US": {
    code: "en-US",
    name: "Melotag",
    tagline: "Local music tag editor",
    chips: "Match · covers · lyrics · rename",
    endLine: "Free · Windows 10 / 11 · x64 and arm64",
    url: "github.com/zdxiaoda/Melotag",
    fontFamily: '"Noto Sans"',
    beats: [
      beat("import", "Drop in a folder — the whole library loads", "main", 4.4, { scaleFrom: 1.0, scaleTo: 1.06, xFrom: 0, xTo: 0, yFrom: 0, yTo: 0 }),
      beat("select", "Pick a track, edit its tags on the right", "main", 4.4, { scaleFrom: 1.08, scaleTo: 1.1, xFrom: 0, xTo: -4, yFrom: 0, yTo: -2 }),
      beat("lyrics", "Lyrics: clean time tags, import and export", "lyrics", 4.6, { scaleFrom: 1.02, scaleTo: 1.08, xFrom: 0, xTo: 0, yFrom: 0, yTo: -3 }),
      beat("rename", "Rename with templates or regex — preview first", "rename", 4.6, { scaleFrom: 1.1, scaleTo: 1.02, xFrom: -2, xTo: 0, yFrom: 0, yTo: 0 }),
      beat("settings", "Settings for sources, covers, writing and UI", "settings", 4.4, { scaleFrom: 1.04, scaleTo: 1.07, xFrom: 3, xTo: -3, yFrom: 0, yTo: 0 }),
      beat("outro", "Tags are read and written locally. No uploads.", "main", 4.4, { scaleFrom: 1.08, scaleTo: 1.0, xFrom: 0, xTo: 0, yFrom: 0, yTo: 0 }),
    ],
  },
};

export const LANGUAGE_CODES: LanguageCode[] = ["zh-CN", "ja-JP", "en-US"];

export const getLanguage = (code: string): LanguageSpec => {
  const spec = LANGUAGES[code as LanguageCode];
  if (!spec) {
    throw new Error(`Unknown language: ${code}`);
  }
  return spec;
};

export const totalFrames = (spec: LanguageSpec): number =>
  TITLE_FRAMES + spec.beats.reduce((sum, b) => sum + b.durationInFrames, 0) + END_FRAMES;
