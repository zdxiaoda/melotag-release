import React from "react";
import { interpolate, useVideoConfig } from "remotion";
import { useLogicalFrame } from "../useEnergy";
import { absoluteFill } from "../absoluteFill";
import { Background, type BackgroundTint } from "./Background";
import { CaptionBar } from "./CaptionBar";
import type { LanguageSpec } from "../data/captions";
import { SCREENSHOTS, type ShotName } from "../assets";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * Common stage for the core-flow scenes: tinted animated background, the real
 * store screenshot pushed far back as a blurred depth plate, a dark scrim so
 * the drawn mock-UI pops, then the scene content and the bottom caption.
 */
export const SceneShell: React.FC<{
  language: LanguageSpec;
  caption?: string;
  shot?: ShotName;
  tint?: BackgroundTint;
  accent?: string;
  children: React.ReactNode;
}> = ({ language, caption, shot, tint = "brand", accent = "#18BED6", children }) => {
  const frame = useLogicalFrame();
  const { durationInFrames, fps } = useVideoConfig();
  // durationInFrames is real frames (60fps); scene maths runs on 30fps logical.
  const logicalDuration = (durationInFrames * 30) / fps;

  const opacity = interpolate(
    frame,
    [0, 8, logicalDuration - 10, logicalDuration - 1],
    [0, 1, 1, 0],
    CLAMP,
  );

  return (
    <div style={{ ...absoluteFill, opacity, backgroundColor: "#F7F9FF" }}>
      <Background tint={tint} />
      {shot && (
        <div style={{ ...absoluteFill, overflow: "hidden" }}>
          <img
            src={SCREENSHOTS[language.code][shot]}
            alt=""
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.12)",
              filter: "blur(26px) brightness(1.02) saturate(0.85)",
            }}
          />
          <div
            style={{
              ...absoluteFill,
              background:
                "linear-gradient(180deg, rgba(247,249,255,0.55) 0%, rgba(233,238,251,0.78) 100%)",
            }}
          />
        </div>
      )}
      <div
        style={{
          ...absoluteFill,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 150,
        }}
      >
        {children}
      </div>
      {caption && <CaptionBar language={language} caption={caption} accent={accent} />}
    </div>
  );
};
