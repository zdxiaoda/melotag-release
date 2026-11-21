import React from "react";
import { interpolate, spring } from "remotion";
import { absoluteFill } from "../../absoluteFill";
import { useBassEnergy, useLogicalFrame } from "../../useEnergy";
import { Background, CYAN, CYAN_LIGHT, HEAD, PURPLE } from "../Background";
import { LOGO } from "../../assets";
import type { LanguageSpec } from "../../data/captions";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * Act 2 — the turn: the messy cards from the hook are blown off-screen by a
 * light sweep, and the logo assembles with its halo. Pain becomes product.
 */
export const RevealScene: React.FC<{ language: LanguageSpec }> = ({ language }) => {
  const frame = useLogicalFrame();
  const fps = 30;
  const bass = useBassEnergy();

  // Continuity: the hook's cards exit fast, tumbling to the right.
  const blownOut = interpolate(frame, [0, 14], [0, 1], CLAMP);
  const cards = [0, 1, 2, 3].map((i) => ({
    left: `${9 + i * 20}%`,
    top: `${14 + ((i * 27) % 52)}%`,
    rotate: -9 + i * 5,
  }));

  const sweepT = interpolate(frame, [0, 16], [0, 1], CLAMP);
  const sweepX = -70 + sweepT * 600;
  const sweepOpacity = Math.sin(sweepT * Math.PI) * 0.8;

  const flash = interpolate(frame, [0, 4, 16], [0.75, 0.3, 0], CLAMP);

  const logoProgress = spring({ frame: frame - 3, fps, config: { damping: 14, stiffness: 120 } });
  const logoFloat = Math.sin(frame * 0.07) * 6;
  const chars = Array.from(language.name);
  const taglineT = interpolate(frame, [22, 38], [0, 1], CLAMP);

  return (
    <div style={{ ...absoluteFill, backgroundColor: "#F7F9FF" }}>
      <Background />
      {cards.map((card, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: card.left,
            top: card.top,
            padding: "14px 22px",
            borderRadius: 14,
            background: "rgba(255, 255, 255, 0.8)",
            border: "1px solid rgba(229, 72, 77, 0.20)",
            fontFamily: '"Noto Sans SC", "Noto Sans JP", "Noto Sans", sans-serif',
            fontSize: 24,
            color: "#9AA1B8",
            whiteSpace: "nowrap",
            opacity: (1 - blownOut) * 0.9,
            transform: `rotate(${card.rotate + blownOut * 30}deg) translateX(${blownOut * (700 + i * 260)}px) translateY(${blownOut * -140}px)`,
            filter: `blur(${blownOut * 6}px)`,
          }}
        >
          ⋯
        </div>
      ))}

      <div
        style={{
          ...absoluteFill,
          background:
            "radial-gradient(circle at 50% 46%, rgba(255,255,255,0.95), rgba(178,168,255,0.5) 45%, transparent 72%)",
          opacity: flash,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-30%",
          bottom: "-30%",
          left: "-28%",
          width: "24%",
          background: "linear-gradient(90deg, transparent, rgba(110, 91, 245, 0.30), transparent)",
          transform: `translateX(${sweepX}%) skewX(-18deg)`,
          filter: "blur(26px)",
          opacity: sweepOpacity,
        }}
      />

      <div
        style={{
          ...absoluteFill,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 44,
            width: 380,
            height: 380,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 370,
              height: 370,
              borderRadius: "50%",
              background: `conic-gradient(from 0deg, transparent 0deg, ${PURPLE}66 70deg, transparent 150deg, transparent 180deg, ${CYAN}66 250deg, transparent 330deg)`,
              maskImage: "radial-gradient(closest-side, transparent 42%, black 58%, transparent 74%)",
              WebkitMaskImage: "radial-gradient(closest-side, transparent 42%, black 58%, transparent 74%)",
              filter: "blur(5px)",
              transform: `rotate(${frame * 1.1}deg)`,
              opacity: 0.45 + bass * 0.55,
            }}
          />
          <img
            src={LOGO}
            alt=""
            style={{
              width: 240,
              height: 240,
              opacity: logoProgress,
              transform: `translateY(${logoFloat}px) scale(${0.82 + 0.18 * logoProgress})`,
              filter: `drop-shadow(0 0 ${30 + bass * 34}px ${PURPLE}88) drop-shadow(0 0 18px ${CYAN}55) drop-shadow(0 18px 30px rgba(40,55,110,0.28))`,
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          {chars.map((char, i) => {
            const t = interpolate(frame, [8 + i * 2, 22 + i * 2], [0, 1], CLAMP);
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  fontFamily: language.displayFont,
                  fontWeight: 700,
                  fontSize: 96,
                  letterSpacing: "1px",
                  color: HEAD,
                  lineHeight: 1,
                  opacity: t,
                  transform: `translateY(${(1 - t) * 24}px) scale(${0.9 + 0.1 * t})`,
                  filter: `blur(${(1 - t) * 8}px)`,
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: language.fontFamily,
            fontSize: 36,
            color: "#4A5570",
            opacity: taglineT,
            transform: `translateY(${(1 - taglineT) * 16}px)`,
            filter: `blur(${(1 - taglineT) * 6}px)`,
          }}
        >
          {language.revealTagline}
        </div>
        <div
          style={{
            marginTop: 26,
            width: interpolate(frame, [18, 38], [0, 240], CLAMP),
            height: 3,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${PURPLE}, ${CYAN_LIGHT})`,
          }}
        />
      </div>
    </div>
  );
};
