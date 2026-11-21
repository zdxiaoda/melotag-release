import React from "react";
import { interpolate } from "remotion";
import { useBassEnergy, useLogicalFrame } from "../useEnergy";
import type { LanguageSpec } from "../data/captions";

/**
 * Bottom caption plate: light glassy pill with a glowing accent bar that
 * breathes with the bass, plus a shine underline sweeping in as the caption
 * rises. Marketing copy uses the display face (Smiley Sans where available).
 */
export const CaptionBar: React.FC<{ language: LanguageSpec; caption: string; accent?: string }> = ({
  language,
  caption,
  accent = "#18BED6",
}) => {
  const frame = useLogicalFrame();
  const bass = useBassEnergy();

  const opacity = interpolate(frame, [2, 13], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rise = interpolate(frame, [2, 15], [26, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const blur = interpolate(frame, [2, 15], [7, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const underlineT = interpolate(frame, [10, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shineX = ((frame * 3.2) % 560) - 120;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 210,
        background: "linear-gradient(180deg, rgba(247,249,255,0) 0%, rgba(236,241,252,0.65) 100%)",
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
          marginBottom: 62,
          padding: "18px 36px 18px 24px",
          borderRadius: 14,
          background: "rgba(255, 255, 255, 0.86)",
          border: `1px solid ${accent}4D`,
          boxShadow: `0 18px 44px rgba(40, 55, 110, 0.16), 0 0 ${18 + bass * 26}px ${accent}26`,
          backdropFilter: "blur(14px)",
          transform: `translateY(${rise}px)`,
          filter: `blur(${blur}px)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 6,
            height: 34 + bass * 8,
            borderRadius: 3,
            background: accent,
            boxShadow: `0 0 ${10 + bass * 18}px ${accent}`,
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontFamily: language.displayFont,
              fontWeight: 700,
              fontSize: 38,
              color: "#1B2140",
              whiteSpace: "nowrap",
              lineHeight: 1.2,
            }}
          >
            {caption}
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: -6,
              height: 2,
              width: `${underlineT * 100}%`,
              borderRadius: 1,
              background: `linear-gradient(90deg, ${accent}, transparent)`,
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: shineX,
            width: 90,
            background: "linear-gradient(90deg, transparent, rgba(110, 91, 245, 0.12), transparent)",
            transform: "skewX(-14deg)",
          }}
        />
      </div>
    </div>
  );
};
