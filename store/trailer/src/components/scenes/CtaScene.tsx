import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { absoluteFill } from "../../absoluteFill";
import { useBassEnergy, useLogicalFrame } from "../../useEnergy";
import { Background, BODY, CYAN, DIM, HEAD, PURPLE } from "../Background";
import { LOGO } from "../../assets";
import type { LanguageSpec } from "../../data/captions";

const container: React.CSSProperties = absoluteFill;
const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * Act 5 — call to action: logo + name + the single action line, with the
 * halo, bass glow and a shine sweep across the wordmark.
 */
export const CtaScene: React.FC<{ language: LanguageSpec }> = ({ language }) => {
  const frame = useLogicalFrame();
  const fps = 30;
  const { durationInFrames, fps: realFps } = useVideoConfig();
  const logicalDuration = (durationInFrames * 30) / realFps;
  const bass = useBassEnergy();

  const logoProgress = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const logoFloat = Math.sin(frame * 0.06) * 6;
  const logoGlow = 26 + bass * 36;

  const chars = Array.from(language.name);
  const lineT = interpolate(frame, [56, 84], [0, 1], CLAMP);
  const urlT = interpolate(frame, [80, 108], [0, 1], CLAMP);

  const shineT = interpolate(frame, [88, 132], [0, 1], CLAMP);
  const shineX = -40 + shineT * 160;

  const haloRotate = frame * 0.8;

  const fadeOut = interpolate(frame, [logicalDuration - 20, logicalDuration - 1], [1, 0], CLAMP);

  return (
    <div style={{ ...container, opacity: fadeOut, backgroundColor: "#F7F9FF" }}>
      <Background tint="bright" />
      <div
        style={{
          ...container,
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
            marginBottom: 46,
            width: 360,
            height: 360,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 350,
              height: 350,
              borderRadius: "50%",
              background: `conic-gradient(from 90deg, transparent 0deg, ${PURPLE}59 70deg, transparent 150deg, transparent 190deg, ${CYAN}59 260deg, transparent 330deg)`,
              maskImage: "radial-gradient(closest-side, transparent 42%, black 58%, transparent 74%)",
              WebkitMaskImage: "radial-gradient(closest-side, transparent 42%, black 58%, transparent 74%)",
              filter: "blur(5px)",
              transform: `rotate(${haloRotate}deg)`,
              opacity: 0.4 + bass * 0.5,
            }}
          />
          <img
            src={LOGO}
            alt=""
            style={{
              width: 200,
              height: 200,
              opacity: logoProgress,
              transform: `translateY(${logoFloat}px) scale(${0.86 + 0.14 * logoProgress})`,
              filter: `drop-shadow(0 0 ${logoGlow}px ${PURPLE}77) drop-shadow(0 0 ${logoGlow * 0.6}px ${CYAN}55) drop-shadow(0 16px 30px rgba(40,55,110,0.28))`,
            }}
          />
        </div>
        <div style={{ position: "relative", display: "flex", alignItems: "baseline" }}>
          {chars.map((char, i) => {
            const t = interpolate(frame, [14 + i * 2, 32 + i * 2], [0, 1], CLAMP);
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  fontFamily: language.displayFont,
                  fontWeight: 700,
                  fontSize: 78,
                  letterSpacing: "1px",
                  color: HEAD,
                  lineHeight: 1,
                  opacity: t,
                  transform: `translateY(${(1 - t) * 18}px)`,
                  filter: `blur(${(1 - t) * 6}px)`,
                }}
              >
                {char}
              </span>
            );
          })}
          <div
            style={{
              position: "absolute",
              top: "-18%",
              bottom: "-18%",
              left: 0,
              right: 0,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${shineX}%`,
                width: "26%",
                background: "linear-gradient(100deg, transparent, rgba(110, 91, 245, 0.18), transparent)",
                transform: "skewX(-16deg)",
                filter: "blur(3px)",
              }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: 36,
            fontFamily: language.fontFamily,
            fontSize: 34,
            color: BODY,
            opacity: lineT,
            transform: `translateY(${(1 - lineT) * 16}px)`,
            filter: `blur(${(1 - lineT) * 5}px)`,
          }}
        >
          {language.endLine}
        </div>
        <div
          style={{
            marginTop: 22,
            fontFamily: '"Noto Sans"',
            fontSize: 27,
            letterSpacing: "0.8px",
            color: DIM,
            opacity: urlT,
            transform: `translateY(${(1 - urlT) * 14}px)`,
            filter: `blur(${(1 - urlT) * 4}px)`,
          }}
        >
          {language.url}
        </div>
      </div>
    </div>
  );
};
