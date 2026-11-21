import React from "react";
import { interpolate, spring } from "remotion";
import { absoluteFill } from "../../absoluteFill";
import { useLogicalFrame } from "../../useEnergy";
import { Background } from "../Background";
import { KineticText } from "../kinetic/KineticText";
import type { LanguageSpec } from "../../data/captions";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

interface CardSpec {
  left: string;
  top: string;
  rotate: number;
  delay: number;
}

// Scattered around the headline zone (centre is left free for the text).
const CARD_POS: CardSpec[] = [
  { left: "9%", top: "16%", rotate: -9, delay: 4 },
  { left: "68%", top: "10%", rotate: 7, delay: 12 },
  { left: "13%", top: "62%", rotate: 6, delay: 20 },
  { left: "70%", top: "66%", rotate: -8, delay: 28 },
];

const GHOST_POS: CardSpec[] = [
  { left: "44%", top: "8%", rotate: 12, delay: 16 },
  { left: "38%", top: "78%", rotate: -13, delay: 24 },
];

/**
 * Act 1 — the pain hook: a chaotic pile of broken music files jittering
 * around a slamming headline, on a warm light background. Everything wrong
 * with the viewer's library, shown before any branding appears.
 */
export const HookScene: React.FC<{ language: LanguageSpec }> = ({ language }) => {
  const frame = useLogicalFrame();
  const fps = 30;

  const Card: React.FC<{ spec: CardSpec; label: string; danger: boolean }> = ({ spec, label, danger }) => {
    const enter = spring({ frame: frame - spec.delay, fps, config: { damping: 13, stiffness: 100 } });
    const jitter = Math.sin((frame - spec.delay) * 0.35 + spec.delay) * 2.2;
    return (
      <div
        style={{
          position: "absolute",
          left: spec.left,
          top: spec.top,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "16px 24px",
          borderRadius: 14,
          background: "rgba(255, 255, 255, 0.92)",
          border: "1px solid rgba(229, 72, 77, 0.26)",
          boxShadow: "0 20px 44px rgba(120, 60, 60, 0.14), 0 0 24px rgba(255, 110, 90, 0.10)",
          opacity: enter,
          transform: `rotate(${spec.rotate + jitter * 0.4}deg) translateY(${(1 - enter) * 40}px) translateX(${jitter}px)`,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: danger ? "linear-gradient(135deg, #FDE8E8, #FBD5D5)" : "linear-gradient(135deg, #EEF0FA, #E4E8F6)",
            border: "1px solid rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            color: danger ? "#D64550" : "#8B93B4",
          }}
        >
          {danger ? "?" : "♪"}
        </div>
        <div
          style={{
            fontFamily: '"Noto Sans SC", "Noto Sans JP", "Noto Sans", sans-serif',
            fontSize: 25,
            color: "#3A415A",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
        <div
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: danger ? "#E5484D" : "#F59E0B",
            boxShadow: `0 0 12px ${danger ? "rgba(229,72,77,0.6)" : "rgba(245,158,11,0.6)"}`,
          }}
        />
      </div>
    );
  };

  return (
    <div style={{ ...absoluteFill, backgroundColor: "#F7F9FF" }}>
      <Background tint="pain" />
      {CARD_POS.map((spec, i) => (
        <Card key={i} spec={spec} label={language.hook.cards[i % language.hook.cards.length]} danger={i % 2 === 1} />
      ))}
      {GHOST_POS.map((spec, i) => (
        <Card key={`g${i}`} spec={spec} label={language.hook.cards[(i + 1) % language.hook.cards.length]} danger />
      ))}

      <div
        style={{
          ...absoluteFill,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          paddingBottom: 150,
        }}
      >
        <KineticText text={language.hook.headline} fontFamily={language.displayFont} size={104} delay={8} />
        <div
          style={{
            display: "flex",
            gap: 14,
            opacity: interpolate(frame, [34, 48], [0, 1], CLAMP),
            transform: `translateY(${interpolate(frame, [34, 48], [16, 0], CLAMP)}px)`,
          }}
        >
          {language.hook.sub.split(" · ").map((chip) => (
            <div
              key={chip}
              style={{
                padding: "9px 20px",
                borderRadius: 999,
                background: "rgba(229, 72, 77, 0.07)",
                border: "1px solid rgba(229, 72, 77, 0.28)",
                fontFamily: language.displayFont,
                fontSize: 24,
                color: "#B93E48",
                whiteSpace: "nowrap",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
