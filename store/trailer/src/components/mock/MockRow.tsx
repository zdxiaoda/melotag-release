import React from "react";
import { interpolate, spring } from "remotion";
import { useLogicalFrame } from "../../useEnergy";
import { CheckDot } from "./CheckDot";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * One mock library row: filename slides in, then the status pill flips from
 * a waiting ellipsis to "read ✓". Used by the import scene. Light glass style.
 */
export const MockRow: React.FC<{
  filename: string;
  status: string;
  delay: number;
  flipAt: number;
}> = ({ filename, status, delay, flipAt }) => {
  const frame = useLogicalFrame();
  const enter = spring({ frame: frame - delay, fps: 30, config: { damping: 16, stiffness: 120 } });
  const flip = interpolate(frame, [flipAt, flipAt + 6], [0, 1], CLAMP);
  const done = flip > 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "15px 24px",
        borderRadius: 12,
        background: "rgba(255, 255, 255, 0.88)",
        border: "1px solid rgba(110, 91, 245, 0.14)",
        boxShadow: "0 10px 28px rgba(40, 55, 110, 0.10)",
        opacity: enter,
        transform: `translateX(${(1 - enter) * -56}px)`,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: done ? "#1FA45B" : "#18BED6",
          boxShadow: `0 0 10px ${done ? "rgba(31,164,91,0.55)" : "rgba(24,190,214,0.55)"}`,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          fontFamily: '"Noto Sans SC", "Noto Sans JP", "Noto Sans", sans-serif',
          fontSize: 27,
          color: "#232A42",
          whiteSpace: "nowrap",
          flex: 1,
          textAlign: "left",
        }}
      >
        {filename}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "6px 16px",
          borderRadius: 999,
          background: done ? "rgba(31, 164, 91, 0.10)" : "rgba(110, 91, 245, 0.07)",
          border: `1px solid ${done ? "rgba(31, 164, 91, 0.35)" : "rgba(110, 91, 245, 0.20)"}`,
          opacity: 0.35 + 0.65 * Math.max(flip, enter * 0.6),
        }}
      >
        {done ? (
          <CheckDot delay={flipAt + 2} size={20} />
        ) : (
          <div style={{ fontSize: 22, color: "#5B4BE0", letterSpacing: 2 }}>···</div>
        )}
        <div
          style={{
            fontSize: 21,
            color: done ? "#147A46" : "transparent",
            whiteSpace: "nowrap",
          }}
        >
          {status}
        </div>
      </div>
    </div>
  );
};
