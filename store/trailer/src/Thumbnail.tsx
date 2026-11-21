import React from "react";
import { AbsoluteFill } from "remotion";
import { Background, BODY, CYAN_LIGHT, DIM, HEAD, PURPLE } from "./components/Background";
import { LOGO, SCREENSHOTS } from "./assets";
import { getLanguage } from "./data/captions";

/**
 * Trailer thumbnail (1920x1080 PNG): logo, wordmark and feature chips on the
 * left, the main screenshot framed on the right — mirrors the old
 * render_thumbnail() layout from Build-StoreTrailer.py, in the light theme.
 */
export const Thumbnail: React.FC<{ language: string }> = ({ language }) => {
  const spec = getLanguage(language);

  return (
    <AbsoluteFill style={{ backgroundColor: "#F7F9FF" }}>
      <Background />
      <div style={{ position: "absolute", left: 120, top: 0, bottom: 0, width: 700 }}>
        <div style={{ position: "absolute", top: 176 }}>
          <img
            src={LOGO}
            alt=""
            style={{
              width: 150,
              height: 150,
              filter: `drop-shadow(0 0 26px ${PURPLE}66) drop-shadow(0 12px 24px rgba(40,55,110,0.25))`,
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 491,
            fontFamily: spec.displayFont,
            fontWeight: 700,
            fontSize: 76,
            color: HEAD,
            lineHeight: 1,
          }}
        >
          {spec.name}
        </div>
        <div
          style={{
            position: "absolute",
            top: 578,
            fontFamily: spec.fontFamily,
            fontSize: 38,
            color: BODY,
          }}
        >
          {spec.tagline}
        </div>
        {spec.chips.split(" · ").map((chip, i) => (
          <div
            key={chip}
            style={{
              position: "absolute",
              top: 680 + i * 46,
              fontFamily: spec.fontFamily,
              fontSize: 24,
              letterSpacing: "0.8px",
              color: DIM,
              whiteSpace: "nowrap",
            }}
          >
            · {chip}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 854,
          top: 269,
          width: 1000,
          height: 562,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 22px 44px rgba(40,55,110,0.24)",
          border: `1.4px solid ${CYAN_LIGHT}99`,
        }}
      >
        <img
          src={SCREENSHOTS[spec.code].main}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </AbsoluteFill>
  );
};
