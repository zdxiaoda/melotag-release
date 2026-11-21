#!/usr/bin/env bash
# Validate trailer renders: resolution, fps, codecs, duration and faststart.
# Usage: ./validate.sh out/*.mp4
set -euo pipefail

if [[ $# -eq 0 ]]; then
  echo "usage: $0 <video.mp4> [more.mp4 ...]" >&2
  exit 1
fi

fail() {
  echo "FAIL  $1" >&2
  exit 1
}

for file in "$@"; do
  [[ -f $file ]] || fail "not a file: $file"

  probe=$(ffprobe -v error -select_streams v:0 \
    -show_entries stream=codec_name,width,height,avg_frame_rate,pix_fmt \
    -show_entries format=duration,format_name \
    -of default=noprint_wrappers=1 "$file")

  echo "$probe" | grep -q "codec_name=h264" || fail "$file: video codec is not h264"
  echo "$probe" | grep -q "width=1920" || fail "$file: width is not 1920"
  echo "$probe" | grep -q "height=1080" || fail "$file: height is not 1080"
  echo "$probe" | grep -q "pix_fmt=yuv420p" || fail "$file: pixel format is not yuv420p"
  echo "$probe" | grep -q "avg_frame_rate=60/1" || fail "$file: fps is not 60"

  duration=$(echo "$probe" | sed -n 's/^duration=//p')
  awk -v d="$duration" 'BEGIN { exit !(d > 0 && d <= 60) }' || fail "$file: duration $duration s outside 0-60 s"

  ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of default=noprint_wrappers=1 "$file" \
    | grep -q "codec_name=aac" || fail "$file: audio codec is not aac"

  # moov atom must precede mdat for streaming playback (faststart).
  order=$(ffmpeg -v trace -i "$file" 2>&1 | grep -m1 -o "type:'m\(oov\|dat\)'" || true)
  [[ $order == "type:'moov'" ]] || fail "$file: moov atom not first (no faststart); fix with: ffmpeg -i '$file' -c copy -movflags +faststart '$file.fixed.mp4'"

  echo "OK    $file (${duration}s)"
done
