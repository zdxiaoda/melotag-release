import React from "react";
import { interpolate } from "remotion";
import { useLogicalFrame } from "../../useEnergy";
import { SceneShell } from "../SceneShell";
import { CheckDot } from "../mock/CheckDot";
import { MOCK_RENAMES, type LanguageSpec } from "../../data/captions";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/**
 * Core flow 5 — rename: old messy filenames get struck through, the new
 * templated name reveals beneath, and each row settles with a green check.
 */
export const RenameScene: React.FC<{ language: LanguageSpec }> = ({ language }) => {
  const frame = useLogicalFrame();

  return (
    <SceneShell language={language} caption={language.scenes.renaming} shot="rename" accent="#5B8DEF">
      <div style={{ display: "flex", flexDirection: "column", gap: 32, width: 1240 }}>
        {MOCK_RENAMES.map((row, i) => {
          const delay = 14 + i * 22;
          const enter = easeOutCubic(interpolate(frame, [delay, delay + 12], [0, 1], CLAMP));
          const strike = interpolate(frame, [delay + 16, delay + 28], [0, 1], CLAMP);
          const reveal = interpolate(frame, [delay + 26, delay + 44], [0, 1], CLAMP);
          return (
            <div
              key={row.from}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                padding: "26px 34px",
                borderRadius: 16,
                background: "rgba(255, 255, 255, 0.88)",
                border: "1px solid rgba(91, 141, 239, 0.20)",
                boxShadow: "0 12px 30px rgba(40, 55, 110, 0.10)",
                opacity: enter,
                transform: `translateY(${(1 - enter) * 30}px)`,
              }}
            >
              <div style={{ position: "relative", flex: 1, textAlign: "left" }}>
                <div
                  style={{
                    fontFamily: '"Noto Sans", sans-serif',
                    fontSize: 27,
                    color: "#8A93AC",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.from}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "52%",
                    left: 0,
                    height: 3,
                    width: `${strike * 100}%`,
                    borderRadius: 2,
                    background: "#E5484D",
                    boxShadow: "0 0 10px rgba(229, 72, 77, 0.55)",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 30,
                  color: "#5B4BE0",
                  opacity: strike,
                  transform: `translateX(${strike * 8}px)`,
                  flexShrink: 0,
                }}
              >
                →
              </div>
              <div style={{ flex: 1.35, textAlign: "left", overflow: "hidden" }}>
                <div
                  style={{
                    fontFamily: '"Noto Sans SC", "Noto Sans JP", "Noto Sans", sans-serif',
                    fontSize: 27,
                    color: "#0E7490",
                    whiteSpace: "nowrap",
                    clipPath: `inset(0 ${100 - reveal * 100}% 0 0)`,
                    filter: `drop-shadow(0 0 12px rgba(14, 116, 144, 0.30))`,
                  }}
                >
                  {row.to}
                </div>
              </div>
              <CheckDot delay={delay + 40} size={28} />
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};
