import React from "react";
import { interpolate } from "remotion";
import { useLogicalFrame } from "../../useEnergy";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * Kinetic headline: slams in (scale + blur) with a short RGB-split glitch,
 * then settles as one clean line. The workhorse of the pain hook and the
 * scene captions that need more punch than the bottom caption bar.
 */
export const KineticText: React.FC<{
  text: string;
  fontFamily: string;
  size?: number;
  color?: string;
  delay?: number;
  weight?: number;
}> = ({ text, fontFamily, size = 96, color = "#1B2140", delay = 0, weight = 700 }) => {
  const frame = useLogicalFrame();
  const t = interpolate(frame, [delay, delay + 8], [0, 1], CLAMP);
  const ease = 1 - Math.pow(1 - t, 3);

  const glitch = interpolate(frame, [delay, delay + 6], [1, 0], CLAMP) * t;
  const split = glitch * 12;

  const shared: React.CSSProperties = {
    fontFamily,
    fontWeight: weight,
    fontSize: size,
    lineHeight: 1.12,
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        style={{
          ...shared,
          position: "absolute",
          inset: 0,
          color: "#E5484D",
          opacity: glitch * 0.7,
          transform: `translateX(${-split}px)`,
        }}
      >
        {text}
      </div>
      <div
        style={{
          ...shared,
          position: "absolute",
          inset: 0,
          color: "#12A594",
          opacity: glitch * 0.7,
          transform: `translateX(${split}px)`,
        }}
      >
        {text}
      </div>
      <div
        style={{
          ...shared,
          position: "relative",
          color,
          opacity: ease,
          transform: `scale(${1.45 - 0.45 * ease})`,
          filter: `blur(${(1 - ease) * 10}px)`,
          textShadow: "0 10px 30px rgba(40, 55, 110, 0.18)",
        }}
      >
        {text}
      </div>
    </div>
  );
};
