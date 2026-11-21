import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { absoluteFill } from "../absoluteFill";
import { Background, BODY, DIM, HEAD, PURPLE } from "./Background";
import { LOGO } from "../assets";
import type { LanguageSpec } from "../data/captions";

const container: React.CSSProperties = absoluteFill;

export const EndCard: React.FC<{ language: LanguageSpec }> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoProgress = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const nameOpacity = interpolate(frame, [14, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineOpacity = interpolate(frame, [28, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const urlOpacity = interpolate(frame, [38, 56], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 24, durationInFrames - 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ ...container, opacity: fadeOut }}>
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
            width: 210,
            height: 210,
            marginBottom: 52,
            opacity: logoProgress,
            transform: `scale(${0.92 + 0.08 * logoProgress})`,
            filter: `drop-shadow(0 0 30px ${PURPLE}AA) drop-shadow(0 16px 24px rgba(0,0,0,0.55))`,
          }}
        />
        <div
          style={{
            fontFamily: language.fontFamily,
            fontWeight: 700,
            fontSize: 72,
            letterSpacing: "0.6px",
            color: HEAD,
            opacity: nameOpacity,
            lineHeight: 1,
          }}
        >
          {language.name}
        </div>
        <div
          style={{
            marginTop: 42,
            fontFamily: language.fontFamily,
            fontSize: 34,
            color: BODY,
            opacity: lineOpacity,
          }}
        >
          {language.endLine}
        </div>
        <div
          style={{
            marginTop: 24,
            fontFamily: '"Noto Sans"',
            fontSize: 26,
            letterSpacing: "0.8px",
            color: DIM,
            opacity: urlOpacity,
          }}
        >
          {language.url}
        </div>
      </div>
    </div>
  );
};
