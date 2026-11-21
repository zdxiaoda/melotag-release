import logo from "../../images/melotag-logo.png";
import zhMain from "../../images/screenshots/zh-CN/01-main.png";
import zhLyrics from "../../images/screenshots/zh-CN/02-lyrics.png";
import zhRename from "../../images/screenshots/zh-CN/03-rename.png";
import zhSettings from "../../images/screenshots/zh-CN/04-settings.png";
import jaMain from "../../images/screenshots/ja-JP/01-main.png";
import jaLyrics from "../../images/screenshots/ja-JP/02-lyrics.png";
import jaRename from "../../images/screenshots/ja-JP/03-rename.png";
import jaSettings from "../../images/screenshots/ja-JP/04-settings.png";
import enMain from "../../images/screenshots/en-US/01-main.png";
import enLyrics from "../../images/screenshots/en-US/02-lyrics.png";
import enRename from "../../images/screenshots/en-US/03-rename.png";
import enSettings from "../../images/screenshots/en-US/04-settings.png";

export type LanguageCode = "zh-CN" | "ja-JP" | "en-US";
export type ShotName = "main" | "lyrics" | "rename" | "settings";

export const LOGO = logo;

export const SCREENSHOTS: Record<LanguageCode, Record<ShotName, string>> = {
  "zh-CN": { main: zhMain, lyrics: zhLyrics, rename: zhRename, settings: zhSettings },
  "ja-JP": { main: jaMain, lyrics: jaLyrics, rename: jaRename, settings: jaSettings },
  "en-US": { main: enMain, lyrics: enLyrics, rename: enRename, settings: enSettings },
};
