import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { absoluteFill } from "../absoluteFill";

// Palette shared with store/tools/Generate-StoreArt.py.
export const PURPLE = "#6E5BF5";
export const CYAN = "#18BED6";
export const CYAN_LIGHT = "#8BE7F5";
export const HEAD = "#F5F7FF";
export const BODY = "#A9B4D0";
export const DIM = "#808CAB";

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
}

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
    } while (Math.hypot(x - 960, y - 560) < 300);
    particles.push({
      x,
      y,
      r: 1 + rand() * 2.2,
      alpha: 0.08 + rand() * 0.2,
      drift: 6 + rand() * 14,
    });
  }
  return particles;
};

const PARTICLES = makeParticles(72, 1907);

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
        <circle key={`${row}-${col}`} cx={x + col * 32} cy={y + row * 32} r={1.2} fill="#AFC4E8" opacity={0.07} />,
      );
    }
  }
  return <svg style={absoluteFill} width="100%" height="100%" viewBox="0 0 1920 1080">{dots}</svg>;
};

const CornerTicks: React.FC = () => {
  const inset = 54;
  const len = 14;
  const stroke = "#5E6C96";
  const common: React.CSSProperties = { position: "absolute", opacity: 0.55 };
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

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = frame / Math.max(1, durationInFrames);

  const blobs: React.CSSProperties[] = useMemo(
    () => [
      {
        left: "18%",
        top: "20%",
        width: "50%",
        height: "50%",
        background: `radial-gradient(closest-side, ${PURPLE}66, transparent)`,
      },
      {
        left: "86%",
        top: "74%",
        width: "52%",
        height: "52%",
        background: `radial-gradient(closest-side, ${CYAN}5A, transparent)`,
      },
      {
        left: "52%",
        top: "2%",
        width: "46%",
        height: "46%",
        background: "radial-gradient(closest-side, #764AF029, transparent)",
      },
      {
        left: "48%",
        top: "106%",
        width: "62%",
        height: "62%",
        background: "radial-gradient(closest-side, #1496BE22, transparent)",
      },
    ],
    [],
  );

  return (
    <div style={{ ...absoluteFill, background: "linear-gradient(180deg, #0D1024 0%, #04060E 100%)", overflow: "hidden" }}>
      {blobs.map((style, i) => (
        <div
          key={i}
          style={{
            ...absoluteFill,
            ...style,
            position: "absolute",
            filter: "blur(60px)",
            transform: `translate(${Math.sin(progress * Math.PI * 2 + i) * 18}px, ${Math.cos(progress * Math.PI * 2 + i * 1.3) * 14}px)`,
          }}
        />
      ))}
      <DotGrid x={60} y={56} cols={10} rows={7} />
      <DotGrid x={1560} y={830} cols={10} rows={7} />
      <CornerTicks />
      {PARTICLES.map((p, i) => {
        const y = p.y - ((frame / durationInFrames) * p.drift * 30) % 1080;
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
              background: "#CFE2FF",
              opacity: p.alpha,
            }}
          />
        );
      })}
    </div>
  );
};
