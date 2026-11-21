import React from "react";
import { interpolate, spring } from "remotion";
import { useLogicalFrame } from "../../useEnergy";
import { SceneShell } from "../SceneShell";
import { CheckDot } from "../mock/CheckDot";
import { CYAN, PURPLE } from "../Background";
import type { LanguageSpec } from "../../data/captions";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * Core flow 2 — online auto-match: a cloud pulse sends queries out, and each
 * missing field fills in from the online source with a green "matched" pill.
 */
export const MatchScene: React.FC<{ language: LanguageSpec }> = ({ language }) => {
  const frame = useLogicalFrame();
  const fps = 30;

  const cloud = spring({ frame: frame - 6, fps, config: { damping: 14, stiffness: 110 } });
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.18);

  const rows = [
    { label: language.ui.fields.title, value: language.ui.values.title },
    { label: language.ui.fields.artist, value: language.ui.values.artist },
    { label: language.ui.fields.album, value: language.ui.values.album },
  ];

  return (
    <SceneShell language={language} caption={language.scenes.matching} shot="main" accent="#6E5BF5">
      <div
        style={{
          width: 1180,
          display: "flex",
          alignItems: "center",
          gap: 54,
          padding: "54px 60px",
          borderRadius: 22,
          background: "rgba(255, 255, 255, 0.88)",
          border: "1px solid rgba(110, 91, 245, 0.18)",
          boxShadow: "0 30px 70px rgba(40, 55, 110, 0.14)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 230,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 26,
          }}
        >
          <div
            style={{
              width: 190,
              height: 190,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${PURPLE}26, transparent 70%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: cloud,
              transform: `scale(${0.7 + 0.3 * cloud})`,
              boxShadow: `0 0 ${20 + pulse * 30}px ${PURPLE}33`,
            }}
          >
            <svg width="104" height="104" viewBox="0 0 64 64">
              <path
                d="M20 44a12 12 0 0 1-1.5-23.9A16 16 0 0 1 49 24.5 10.5 10.5 0 0 1 47 44H20Z"
                fill={`${PURPLE}2E`}
                stroke={PURPLE}
                strokeWidth="2.6"
                strokeLinejoin="round"
              />
              <path
                d="M32 28v16m0 0-7-7m7 7 7-7"
                fill="none"
                stroke={CYAN}
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform={`translate(0 ${pulse * 3 - 1.5})`}
              />
            </svg>
          </div>
          <div
            style={{
              fontFamily: language.fontFamily,
              fontSize: 22,
              color: "#6F7A94",
              opacity: 0.4 + pulse * 0.6,
              letterSpacing: "1px",
            }}
          >
            · · ·
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 22 }}>
          {rows.map((row, i) => {
            const delay = 34 + i * 18;
            const fill = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 130 } });
            const matched = interpolate(frame, [delay + 14, delay + 22], [0, 1], CLAMP);
            return (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "14px 22px",
                  borderRadius: 12,
                  background: "rgba(248, 250, 255, 0.92)",
                  border: "1px solid rgba(110, 91, 245, 0.12)",
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    color: "#6F7A94",
                    fontFamily: language.fontFamily,
                    width: 108,
                    textAlign: "left",
                    flexShrink: 0,
                  }}
                >
                  {row.label}
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontFamily: language.fontFamily,
                    color: "#1B2140",
                    whiteSpace: "nowrap",
                    textAlign: "left",
                    flex: 1,
                    clipPath: `inset(0 ${100 - fill * 100}% 0 0)`,
                    filter: fill > 0 && fill < 1 ? `blur(${(1 - fill) * 4}px)` : "none",
                  }}
                >
                  {row.value}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "6px 16px",
                    borderRadius: 999,
                    background: "rgba(31, 164, 91, 0.10)",
                    border: "1px solid rgba(31, 164, 91, 0.35)",
                    opacity: matched,
                  }}
                >
                  <CheckDot delay={delay + 16} size={20} />
                  <div
                    style={{
                      fontSize: 21,
                      color: "#147A46",
                      fontFamily: language.fontFamily,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {language.ui.matched}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneShell>
  );
};
