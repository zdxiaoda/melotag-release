import React from "react";
import { spring } from "remotion";
import { useLogicalFrame } from "../../useEnergy";

/** Small popping success dot: green circle + check, with a glow ring. */
export const CheckDot: React.FC<{ delay?: number; size?: number }> = ({ delay = 0, size = 26 }) => {
  const frame = useLogicalFrame();
  const t = spring({ frame: frame - delay, fps: 30, config: { damping: 12, stiffness: 160 } });

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#1FA45B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: t,
        transform: `scale(${0.4 + 0.6 * t})`,
        boxShadow: `0 0 ${8 + t * 14}px rgba(31, 164, 91, 0.45)`,
        flexShrink: 0,
      }}
    >
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 16 16">
        <path
          d="M3 8.4 6.4 11.8 13 4.6"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
