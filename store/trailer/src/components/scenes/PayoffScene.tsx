import React from "react";
import { spring } from "remotion";
import { useLogicalFrame } from "../../useEnergy";
import { SceneShell } from "../SceneShell";
import { CheckDot } from "../mock/CheckDot";
import { KineticText } from "../kinetic/KineticText";
import { useBassEnergy } from "../../useEnergy";
import { CYAN, HEAD } from "../Background";
import type { LanguageSpec } from "../../data/captions";

const TILE_GRADIENTS = [
  ["#6E5BF5", "#18BED6"],
  ["#4C6BFF", "#7DE3F0"],
  ["#764AF0", "#B7A8FF"],
  ["#1496BE", "#8BE7F5"],
  ["#5E5CE6", "#93C5FD"],
  ["#18BED6", "#5EEAD4"],
  ["#7C5CF0", "#F0ABFC"],
  ["#38BDF8", "#A5F3FC"],
  ["#6366F1", "#67E8F9"],
  ["#8B5CF6", "#6EE7F5"],
];

/**
 * Act 4 — payoff: the finished, clean library. Cover tiles pop into a grid
 * with green checks, a shield pulses over the privacy promise.
 */
export const PayoffScene: React.FC<{ language: LanguageSpec }> = ({ language }) => {
  const frame = useLogicalFrame();
  const fps = 30;
  const bass = useBassEnergy();

  const shield = spring({ frame: frame - 96, fps, config: { damping: 13, stiffness: 130 } });

  return (
    <SceneShell language={language} shot="main" tint="bright" accent="#18BED6">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 42,
        }}
      >
        <KineticText text={language.payoff.headline} fontFamily={language.displayFont} size={80} delay={8} color={HEAD} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 148px)",
            gap: 20,
          }}
        >
          {TILE_GRADIENTS.map(([from, to], i) => {
            const t = spring({ frame: frame - 26 - i * 6, fps, config: { damping: 14, stiffness: 130 } });
            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  width: 148,
                  height: 148,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${from}, ${to})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 46,
                  color: "rgba(255,255,255,0.94)",
                  opacity: t,
                  transform: `scale(${0.4 + 0.6 * t}) rotate(${(1 - t) * (i % 2 === 0 ? -8 : 8)}deg)`,
                  boxShadow: `0 14px 34px rgba(40,55,110,0.24), 0 0 ${18 + bass * 14}px ${from}44`,
                }}
              >
                ♪
                <div style={{ position: "absolute", top: -8, right: -8 }}>
                  <CheckDot delay={40 + i * 6} size={26} />
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: shield,
            transform: `translateY(${(1 - shield) * 18}px)`,
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: `drop-shadow(0 0 ${10 + bass * 14}px rgba(24, 190, 214, 0.55))`,
              transform: `scale(${0.7 + 0.3 * shield})`,
            }}
          >
            <svg width="40" height="46" viewBox="0 0 40 46">
              <path
                d="M20 2 37 9v12c0 11-7.4 19.4-17 23C10.4 40.4 3 32 3 21V9L20 2Z"
                fill="rgba(24, 190, 214, 0.10)"
                stroke="#0E9AA7"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <path
                d="M13 22.5 18 27.5 27.5 17"
                fill="none"
                stroke="#0E9AA7"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            style={{
              fontFamily: language.fontFamily,
              fontSize: 30,
              color: "#0E8FA8",
              letterSpacing: "0.5px",
            }}
          >
            {language.payoff.sub}
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
