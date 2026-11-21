import React from "react";
import { interpolate } from "remotion";
import { useLogicalFrame } from "../../useEnergy";
import { SceneShell } from "../SceneShell";
import { MOCK_LYRICS, type LanguageSpec } from "../../data/captions";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const BAR_WIDTHS = [
  [300, 190],
  [240, 280],
  [330, 150],
  [200, 250],
  [290, 170],
  [250, 300],
];

/**
 * Core flow 4 — lyrics: skewed, misaligned time-tag lines snap into a clean
 * column, then a playhead sweeps down highlighting the active line.
 */
export const LyricsScene: React.FC<{ language: LanguageSpec }> = ({ language }) => {
  const frame = useLogicalFrame();

  const alignT = (i: number): number => {
    const t = interpolate(frame, [10 + i * 9, 32 + i * 9], [0, 1], CLAMP);
    return 1 - Math.pow(1 - t, 3);
  };

  const playT = interpolate(frame, [88, 156], [0, 1], CLAMP);
  const activeIndex = Math.min(MOCK_LYRICS.length - 1, Math.floor(playT * MOCK_LYRICS.length));
  const playY = -220 + playT * 440;

  return (
    <SceneShell language={language} caption={language.scenes.lyrics} shot="lyrics" accent="#18BED6">
      <div style={{ position: "relative", width: 900 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `calc(50% + ${playY}px)`,
            height: 3,
            borderRadius: 2,
            background: "linear-gradient(90deg, transparent, #18BED6, transparent)",
            boxShadow: "0 0 18px rgba(24, 190, 214, 0.7)",
            opacity: playT > 0 && playT < 1 ? 0.9 : 0,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {MOCK_LYRICS.map((time, i) => {
            const t = alignT(i);
            const active = i === activeIndex && playT > 0;
            const bars = BAR_WIDTHS[i];
            return (
              <div
                key={time}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  opacity: 0.35 + 0.65 * t,
                  transform: `translateX(${(1 - t) * (i % 2 === 0 ? -110 : 110)}px) rotate(${(1 - t) * (i % 2 === 0 ? -2.5 : 2.5)}deg) scale(${active ? 1.035 : 1})`,
                  filter: active
                    ? "drop-shadow(0 0 16px rgba(24, 190, 214, 0.40))"
                    : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: '"Noto Sans", sans-serif',
                    fontSize: 24,
                    color: active ? "#0E7490" : "#35506B",
                    background: "rgba(255, 255, 255, 0.9)",
                    border: `1px solid ${active ? "rgba(24, 190, 214, 0.55)" : "rgba(110, 91, 245, 0.28)"}`,
                    padding: "7px 14px",
                    borderRadius: 8,
                    flexShrink: 0,
                  }}
                >
                  [{time}]
                </div>
                {bars.map((width, b) => (
                  <div
                    key={b}
                    style={{
                      height: 16,
                      width: width * (active ? 1 : 0.92),
                      borderRadius: 8,
                      background: active
                        ? "linear-gradient(90deg, rgba(24,190,214,0.85), rgba(24,190,214,0.35))"
                        : "linear-gradient(90deg, rgba(110,91,245,0.30), rgba(110,91,245,0.14))",
                    }}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </SceneShell>
  );
};
