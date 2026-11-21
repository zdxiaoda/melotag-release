import React from "react";
import { interpolate } from "remotion";
import { useLogicalFrame } from "../../useEnergy";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/** Rolling number counter (e.g. 0 -> 22) with an ease-out settle. */
export const Counter: React.FC<{
  to: number;
  delay?: number;
  duration?: number;
  suffix?: string;
  fontSize?: number;
  color?: string;
}> = ({ to, delay = 0, duration = 40, suffix = "", fontSize = 30, color = "#EDF2FF" }) => {
  const frame = useLogicalFrame();
  const t = easeOutCubic(interpolate(frame, [delay, delay + duration], [0, 1], CLAMP));
  const value = Math.round(to * t);

  return (
    <span
      style={{
        fontFamily: '"Noto Sans", monospace',
        fontWeight: 700,
        fontSize,
        color,
        letterSpacing: "1px",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {value}
      {suffix}
    </span>
  );
};
