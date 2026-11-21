import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CYAN_LIGHT } from "./Background";
import type { LanguageSpec } from "../data/captions";

/**
 * Bottom caption plate: dark pill + cyan accent bar, fading in with the beat.
 * Mirrors the drawbox/drawtext look of the old compositing pipeline.
 */
export const CaptionBar: React.FC<{ language: LanguageSpec; caption: string }> = ({
  language,
  caption,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [4, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rise = interpolate(frame, [4, 16], [22, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 210,
        background: "linear-gradient(180deg, rgba(6,8,16,0) 0%, rgba(6,8,16,0.38) 100%)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginBottom: 64,
          padding: "18px 34px 18px 24px",
          borderRadius: 10,
          background: "rgba(6, 8, 16, 0.72)",
          border: "1px solid rgba(139, 231, 245, 0.16)",
          transform: `translateY(${rise}px)`,
        }}
      >
        <div style={{ width: 6, height: 36, borderRadius: 3, background: CYAN_LIGHT }} />
        <div
          style={{
            fontFamily: language.fontFamily,
            fontSize: 36,
            color: "#EDF2FF",
            whiteSpace: "nowrap",
            lineHeight: 1.2,
          }}
        >
          {caption}
        </div>
      </div>
    </div>
  );
};
