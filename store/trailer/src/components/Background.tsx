import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { absoluteFill } from "../absoluteFill";
import { useBassEnergy, useLogicalFrame } from "../useEnergy";

// Palette shared with store/tools/Generate-StoreArt.py (light theme).
export const PURPLE = "#6E5BF5";
export const CYAN = "#18BED6";
export const CYAN_LIGHT = "#8BE7F5";
export const HEAD = "#1B2140";
export const BODY = "#4A5570";
export const DIM = "#6F7A94";

// Deterministic PRNG so particle placement is identical on every render.
const mulberry32 = (seed: number): (() => number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

interface Particle {
  x: number;
  y: number;
  r: number;
  alpha: number;
  drift: number;
  phase: number;
  speed: number;
  color: string;
}

const PARTICLE_COLORS = ["#7C8CC8", "#4FB8D6", "#9A8CF0", "#5FC8DE"];

const makeParticles = (count: number, seed: number): Particle[] => {
  const rand = mulberry32(seed);
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    // Skip the centre area so text stays readable (mirrors clear_center).
    let x = 0;
    let y = 0;
    do {
      x = rand() * 1920;
      y = rand() * 1080;
    } while (Math.hypot(x - 960, y - 560) < 320);
    particles.push({
      x,
      y,
      r: 1.4 + rand() * 2.8,
      alpha: 0.18 + rand() * 0.34,
      drift: 8 + rand() * 20,
      phase: rand() * Math.PI * 2,
      speed: 0.05 + rand() * 0.09,
      color: PARTICLE_COLORS[Math.floor(rand() * PARTICLE_COLORS.length)],
    });
  }
  return particles;
};

const PARTICLES = makeParticles(90, 1907);

const DotGrid: React.FC<{ x: number; y: number; cols: number; rows: number }> = ({
  x,
  y,
  cols,
  rows,
}) => {
  const dots: React.ReactNode[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dots.push(
        <circle key={`${row}-${col}`} cx={x + col * 32} cy={y + row * 32} r={1.2} fill="#5A6CA8" opacity={0.16} />,
      );
    }
  }
  return <svg style={absoluteFill} width="100%" height="100%" viewBox="0 0 1920 1080">{dots}</svg>;
};

const CornerTicks: React.FC = () => {
  const inset = 54;
  const len = 14;
  const stroke = "#8B97BC";
  const common: React.CSSProperties = { position: "absolute", opacity: 0.75 };
  const h = (left: number | undefined, right: number | undefined, top: number | undefined, bottom: number | undefined): React.CSSProperties => ({
    ...common,
    width: len,
    height: 1,
    left,
    right,
    top,
    bottom,
    background: stroke,
  });
  const v = (left: number | undefined, right: number | undefined, top: number | undefined, bottom: number | undefined): React.CSSProperties => ({
    ...common,
    width: 1,
    height: len,
    left,
    right,
    top,
    bottom,
    background: stroke,
  });
  return (
    <>
      <div style={h(inset, undefined, inset, undefined)} />
      <div style={v(inset, undefined, inset, undefined)} />
      <div style={h(undefined, inset, inset, undefined)} />
      <div style={v(undefined, inset, inset, undefined)} />
      <div style={h(inset, undefined, undefined, inset)} />
      <div style={v(inset, undefined, undefined, inset)} />
      <div style={h(undefined, inset, undefined, inset)} />
      <div style={v(undefined, inset, undefined, inset)} />
    </>
  );
};

const RAYS = 3;

export type BackgroundTint = "pain" | "brand" | "bright";

export const Background: React.FC<{ tint?: BackgroundTint }> = ({ tint = "brand" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = frame / Math.max(1, durationInFrames);
  const bass = useBassEnergy();
  const logical = useLogicalFrame();

  // The whole palette slowly travels purple -> violet -> cyan over the film.
  const hueShift = interpolate(progress, [0, 1], [-16, 22]);

  interface Blob {
    style: React.CSSProperties;
    orbit: number;
  }
  const blobs: Blob[] = useMemo(
    () => [
      {
        style: {
          left: "14%",
          top: "16%",
          width: "54%",
          height: "54%",
          background: `radial-gradient(closest-side, ${PURPLE}38, transparent)`,
        },
        orbit: 1.0,
      },
      {
        style: {
          left: "80%",
          top: "66%",
          width: "58%",
          height: "58%",
          background: `radial-gradient(closest-side, ${CYAN}33, transparent)`,
        },
        orbit: 1.35,
      },
      {
        style: {
          left: "50%",
          top: "-6%",
          width: "50%",
          height: "50%",
          background: "radial-gradient(closest-side, #B9A8F833, transparent)",
        },
        orbit: 0.75,
      },
      {
        style: {
          left: "42%",
          top: "100%",
          width: "66%",
          height: "66%",
          background: "radial-gradient(closest-side, #7DD8EE2B, transparent)",
        },
        orbit: 1.15,
      },
      {
        style: {
          left: "88%",
          top: "-10%",
          width: "42%",
          height: "42%",
          background: "radial-gradient(closest-side, #9DB4FF26, transparent)",
        },
        orbit: 1.6,
      },
    ],
    [],
  );

  const scanTop = ((progress * 130 - 15) % 130) - 15;

  return (
    <div style={{ ...absoluteFill, background: "linear-gradient(180deg, #F7F9FF 0%, #E7EDFB 100%)", overflow: "hidden" }}>
      <div style={{ ...absoluteFill, filter: `hue-rotate(${hueShift}deg)` }}>
        {blobs.map(({ style, orbit }, i) => (
          <div
            key={i}
            style={{
              ...absoluteFill,
              ...style,
              position: "absolute",
              filter: "blur(80px)",
              transform: `translate(${Math.sin(progress * Math.PI * 2 * orbit + i * 1.7) * 34}px, ${
                Math.cos(progress * Math.PI * 2 * orbit * 0.8 + i * 1.1) * 26
              }px) scale(${1 + bass * 0.1 + Math.sin(progress * Math.PI * 2 + i) * 0.04})`,
            }}
          />
        ))}
      </div>

      <div style={{ ...absoluteFill, transform: "rotate(-16deg)" }}>
        {Array.from({ length: RAYS }).map((_, i) => {
          const drift = Math.sin(progress * Math.PI * 2 * (0.55 + i * 0.22) + i * 2.1) * 26;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "-35%",
                width: "170%",
                height: 200 + i * 110,
                top: `${12 + i * 30}%`,
                background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? CYAN : PURPLE}0D, transparent)`,
                transform: `translateX(${drift}%)`,
                filter: "blur(34px)",
                opacity: 0.6 + bass * 0.4,
              }}
            />
          );
        })}
      </div>

      <DotGrid x={60} y={56} cols={10} rows={7} />
      <DotGrid x={1560} y={830} cols={10} rows={7} />
      <CornerTicks />

      {PARTICLES.map((p, i) => {
        const y = p.y - ((frame / durationInFrames) * p.drift * 30) % 1080;
        const twinkle = 0.55 + 0.45 * Math.sin(logical * p.speed * Math.PI * 2 * 0.6 + p.phase);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: ((y % 1080) + 1080) % 1080,
              width: p.r * 2,
              height: p.r * 2,
              borderRadius: "50%",
              background: p.color,
              opacity: p.alpha * twinkle,
              boxShadow: `0 0 ${p.r * 4}px ${p.color}55`,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${scanTop}%`,
          height: 130,
          background: "linear-gradient(180deg, transparent, rgba(110,91,245,0.05), transparent)",
        }}
      />

      <div
        style={{
          ...absoluteFill,
          background: "radial-gradient(ellipse at center, transparent 58%, rgba(90,105,165,0.10) 100%)",
        }}
      />

      {tint === "pain" && (
        <>
          <div
            style={{
              ...absoluteFill,
              background:
                "radial-gradient(circle at 30% 65%, rgba(255,110,90,0.14), transparent 55%), radial-gradient(circle at 78% 30%, rgba(255,170,90,0.10), transparent 50%)",
            }}
          />
          <div style={{ ...absoluteFill, background: "rgba(255, 244, 240, 0.16)" }} />
        </>
      )}
      {tint === "bright" && (
        <div
          style={{
            ...absoluteFill,
            background:
              "radial-gradient(circle at 50% 40%, rgba(24,190,214,0.10), transparent 60%), radial-gradient(circle at 20% 80%, rgba(139,231,245,0.10), transparent 55%)",
          }}
        />
      )}
    </div>
  );
};
