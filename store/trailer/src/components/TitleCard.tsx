import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { absoluteFill } from "../absoluteFill";
import { Background, BODY, CYAN, DIM, HEAD, PURPLE } from "./Background";
import { LOGO } from "../assets";
import type { LanguageSpec } from "../data/captions";

const container: React.CSSProperties = absoluteFill;

export const TitleCard: React.FC<{ language: LanguageSpec }> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const nameOpacity = interpolate(frame, [15, 33], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const nameY = interpolate(frame, [15, 33], [26, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barWidth = interpolate(frame, [30, 52], [0, 240], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [34, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [34, 52], [18, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chipsOpacity = interpolate(frame, [45, 63], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={container}>
      <Background />
      <div
        style={{
          ...container,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={LOGO}
          alt=""
          style={{
            width: 260,
            height: 260,
            marginBottom: 58,
            opacity: logoProgress,
            transform: `scale(${0.92 + 0.08 * logoProgress})`,
            filter: `drop-shadow(0 0 34px ${PURPLE}AA) drop-shadow(0 18px 26px rgba(0,0,0,0.55))`,
          }}
        />
        <div
          style={{
            fontFamily: language.fontFamily,
            fontWeight: 700,
            fontSize: 88,
            letterSpacing: "0.6px",
            color: HEAD,
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
            lineHeight: 1,
          }}
        >
          {language.name}
        </div>
        <div
          style={{
            marginTop: 46,
            width: barWidth,
            height: 3,
            background: `linear-gradient(90deg, ${PURPLE}, ${CYAN})`,
          }}
        />
        <div
          style={{
            marginTop: 34,
            fontFamily: language.fontFamily,
            fontSize: 38,
            color: BODY,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          {language.tagline}
        </div>
        <div
          style={{
            marginTop: 26,
            fontFamily: language.fontFamily,
            fontSize: 26,
            letterSpacing: "1.2px",
            color: DIM,
            opacity: chipsOpacity,
          }}
        >
          {language.chips}
        </div>
      </div>
    </div>
  );
};
