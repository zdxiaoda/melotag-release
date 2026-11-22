# Microsoft Store Listing: English (en-US)

> Field headings are for editing and submission reference only. Copy only the body text into Partner Center.

## Product name

Melotag

## Short title

Melotag

## Short description (270 characters max)

Free, open source music tag editor. Source code is on GitHub. Edit tags, covers, lyrics, and filenames individually or in batches. Audio never leaves your computer, and even untagged files can be identified by audio fingerprint. Undo changes through history.

## Description

Melotag is a local music tag editor for Windows, Linux, and Android, built for tidying downloaded tracks, filling in album details, and keeping cover art and lyrics consistent across a library. Drag in files or folders, then edit title, artist, album, album artist, year, track, disc, genre, comment, composer, lyrics, and cover art one track at a time. The editor also shows format, duration, bitrate, sample rate, channels, and file size. When saving, you can choose ID3v2.3 or 2.4 for MP3, preserve the original file timestamp, write lyrics into the tag, and replace or clear embedded artwork.

Melotag is built with .NET 10, C#, and Avalonia 12. The Windows, Linux, and Android builds share one tag-processing core and one UI codebase, so the file list, editing flow, and settings stay consistent across platforms. The app does not use an Electron or Chromium shell: Avalonia draws the interface, and the logic runs in the same .NET process. Tags are read and written locally through TagLib#, and batch matching, renaming, and saving do not upload audio files, so batch work on a library does not wait on uploads. Online matching queries metadata, cover art, or lyrics only when you request it. The Microsoft Store package includes the Windows x64 and arm64 builds; Linux and Android builds are available from the project's Releases page.

Online matching can query several music databases at once and present candidate tags, covers, and lyrics in one place, with a source filter for the results. Apply a result to a single track, or use batch auto-match to choose the fields to import, the sources to use, and the overwrite behavior; batch matching processes only the selected rows. AcoustID audio fingerprinting identifies files with missing tags or scrambled filenames from the sound itself: the fingerprint is computed locally and only the fingerprint and duration are sent to AcoustID, never the audio, while matched covers come from Cover Art Archive. The lyrics panel searches for lyrics and can reflow multiple timestamps, remove time tags, delete blank lines and header tags, apply an offset, and import or export with UTF-8, UTF-16, GB18030, Big5, and other encodings. Cover tools can search online or use a local image, then resize automatically to fit size, width, height, and format limits.

Renaming supports @0–@8 field templates, the default Artist - Title pattern, and regular-expression capture groups, with a live preview and automatic numbering for duplicate names. Matching .lrc and cover files can be renamed alongside the audio file, and reverse mode writes filename information back into tags. Simplified/Traditional Chinese conversion covers both tags and filenames, including matching .lrc and cover files, and is also available from the Tools menu. The file list has a right-click menu for batch save, online match, rename, clear tags, or remove on the selected rows; columns can be shown, reordered, and sorted by any field, and the layout is remembered. Before each save or rename, a snapshot of the previous tags is stored in a local history database, which you can review, restore, or clear from the History panel.

The interface is available in English, Simplified Chinese, Traditional Chinese, and Japanese, follows the system language on first launch, and switches immediately from Settings. Traditional Chinese is converted from the Simplified resources at runtime. You can also adjust the theme, use compact rows, reorder online sources, and set the search region; Settings also includes a tag-source guide explaining what each source offers, which credentials it needs, and its limits. A silent update check runs at startup by default; it can be turned off in Settings or run manually from the Help menu. If there are unsaved changes when you exit, Melotag asks whether to save and exit, exit without saving, or cancel.

Notes: DSF/DFF files are recognized, but writing has not yet been validated with real DSD samples. Files containing multiple audio tracks are skipped. Online matches, covers, and lyrics depend on the availability and responses of the third-party services you select, so results may be incomplete or temporarily unavailable. Keep backups of original files before batch changes.

## Product features (10 items)

1. Tag editing and batch actions: edit tags, covers, lyrics, and filenames; choose ID3v2.3/2.4 for MP3 and keep timestamps; right-click selected rows to save, match, rename, clear, or remove.
2. AcoustID audio fingerprinting: identify untagged or badly named files by sound; fingerprints are computed locally and only fingerprint plus duration are sent; covers come from Cover Art Archive.
3. Multi-source online matching: NetEase, QQ Music, Kugou, Kuwo, MusicBrainz, AcoustID, Cover Art Archive, iTunes, Last.fm, and LRCLIB; filter by source and batch-match selected rows.
4. Audio details and formats: recognizes MP3, FLAC, APE, WavPack, TTA, MPC, OGG, Opus, M4A, MP4, WAV, AIFF, WMA, DSF, and DFF; shows duration, bitrate, sample rate, channels, and file size.
5. LRC lyric tools: search lyrics, reflow multiple timestamps, remove time tags, blank lines, and header tags, apply an offset, and import or export with UTF-8, UTF-16, GB18030, Big5, and more.
6. Cover art management: search online, choose a local image, export, remove, or extract covers in bulk; keep the original or resize to fit size, width, height, and format limits.
7. Template and regex renaming: use @0–@8 fields, Artist - Title default, or regex groups, with live preview and duplicate numbering; matching .lrc and cover files rename too.
8. Filename-to-tag reverse mode: extract information from filenames or regular expressions and write it back into tags, useful for libraries from mixed sources.
9. Simplified/Traditional conversion and Traditional UI: convert tags and filenames either way, including .lrc/covers; switch between Simplified Chinese, Traditional Chinese, Japanese, and English.
10. Custom columns and history: show and sort by any column; save a tag snapshot before each save or rename and restore it from History; Windows, Linux, and Android share one core.

## Search keywords (7 items, 40 characters max each)

1. music tag editor
2. MP3 metadata
3. batch tag matching
4. lyrics editor
5. album art
6. audio file renamer
7. simplified traditional Chinese

## Copyright

Copyright (c) 2026 zdxiaoda. Licensed under the MIT License.

## Developed by

zdxiaoda

## Screenshot captions

- 01-main: Main window: file list and tag editor side by side. Drag in files or folders, then check status, format, and audio details.
- 02-lyrics: Lyrics panel: search LRC, clean up time tags, and preview the result; import or export lyric files.
- 03-rename: Rename: build new filenames with templates or regular expressions, preview duplicate handling, and optionally rename lyrics and covers too.
- 04-settings: Settings: organized into Search, Sources, Lyrics, Covers, Writing, and Interface; switch language and theme, or disable the startup update check.

## What's new

First submission: this field can be left blank.

Fallback update text (1.7.0): This release adds row context menus and batch auto-match for selected rows, a redesigned online-match page with per-source filtering and AcoustID cover art, AcoustID audio fingerprinting, a Chinese conversion submenu, a tag-source guide, and a Traditional Chinese interface. Unsaved changes are now protected on exit. It also fixes flattened multi-value tags, lyric encoding and multiple timestamps, rename edge cases, settings migration, and Android file access, and improves narrow-screen layout.

## Additional system requirements

1. Windows 10 version 2004 (build 19041) or later; x64 or arm64 processor.
2. The Microsoft Store package includes the components needed to run, so no separate .NET runtime installation is required.
3. An internet connection is needed for online tag, cover, lyric, and fingerprint lookups; local editing and saving work offline.
4. AcoustID fingerprinting uses the system decoder: Media Foundation on Windows (Windows N editions need the Media Feature Pack); GStreamer with libav plugins on Linux.

## Support URL

https://github.com/zdxiaoda/Melotag/issues

## Website

https://github.com/zdxiaoda/Melotag
