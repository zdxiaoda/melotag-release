import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { HookScene } from "./components/scenes/HookScene";
import { RevealScene } from "./components/scenes/RevealScene";
import { ImportScene } from "./components/scenes/ImportScene";
import { MatchScene } from "./components/scenes/MatchScene";
import { TagEditScene } from "./components/scenes/TagEditScene";
import { LyricsScene } from "./components/scenes/LyricsScene";
import { RenameScene } from "./components/scenes/RenameScene";
import { PayoffScene } from "./components/scenes/PayoffScene";
import { CtaScene } from "./components/scenes/CtaScene";
import {
  getLanguage,
  HOOK_FRAMES,
  REVEAL_FRAMES,
  SCENE_FRAMES,
  PAYOFF_FRAMES,
  CTA_FRAMES,
} from "./data/captions";
import { absoluteFill } from "./absoluteFill";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Light band with a glowing leading edge that sweeps across the cut. */
const WipeTransition: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const t = frame - at;
  if (t < -2 || t > 16) {
    return null;
  }
  const p = interpolate(t, [-2, 16], [0, 1], CLAMP);
  const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  const x = eased * 290;

  return (
    <div
      style={{
        position: "absolute",
        top: "-12%",
        bottom: "-12%",
        left: "-70%",
        width: "70%",
        transform: `translateX(${x}%) skewX(-10deg)`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          ...absoluteFill,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(247,249,255,0.98) 14%, rgba(247,249,255,0.98) 86%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "84%",
          width: 24,
          background: "linear-gradient(180deg, rgba(110,91,245,0.85), rgba(24,190,214,0.85))",
          filter: "blur(10px)",
        }}
      />
    </div>
  );
};

/** Soft radial flash that hides a hard cut. */
const FlashTransition: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const t = frame - at;
  if (t < 0 || t > 13) {
    return null;
  }
  const flash = interpolate(t, [0, 3, 12], [0, 0.38, 0], CLAMP);
  return (
    <div
      style={{
        ...absoluteFill,
        background:
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95), rgba(178,168,255,0.35) 45%, transparent 72%)",
        opacity: flash,
        pointerEvents: "none",
      }}
    />
  );
};

export const Trailer: React.FC<{ language: string }> = ({ language }) => {
  const spec = getLanguage(language);
  const { durationInFrames } = useVideoConfig();

  // Act boundaries with the transition that hides each cut.
  const a1 = HOOK_FRAMES;
  const a2 = a1 + REVEAL_FRAMES;
  const a3 = a2 + SCENE_FRAMES;
  const a4 = a3 + SCENE_FRAMES;
  const a5 = a4 + SCENE_FRAMES;
  const a6 = a5 + SCENE_FRAMES;
  const a7 = a6 + SCENE_FRAMES;
  const a8 = a7 + PAYOFF_FRAMES;

  // Background music: ChiliChill《给你的BGM Vol.1》 (see ../../audio/README.md).
  // Cut from the very start of the track; plays at full volume from frame 0
  // (4-frame anti-click ramp) and fades out over the last ~2.5 seconds.
  const audioVolume = (f: number): number =>
    interpolate(f, [0, 4, durationInFrames - 75, durationInFrames - 1], [0, 1, 1, 0], CLAMP);

  return (
    <AbsoluteFill style={{ backgroundColor: "#F7F9FF" }}>
      <Sequence from={0} durationInFrames={HOOK_FRAMES}>
        <HookScene language={spec} />
      </Sequence>
      <Sequence from={a1} durationInFrames={REVEAL_FRAMES}>
        <RevealScene language={spec} />
      </Sequence>
      <Sequence from={a2} durationInFrames={SCENE_FRAMES}>
        <ImportScene language={spec} />
      </Sequence>
      <Sequence from={a3} durationInFrames={SCENE_FRAMES}>
        <MatchScene language={spec} />
      </Sequence>
      <Sequence from={a4} durationInFrames={SCENE_FRAMES}>
        <TagEditScene language={spec} />
      </Sequence>
      <Sequence from={a5} durationInFrames={SCENE_FRAMES}>
        <LyricsScene language={spec} />
      </Sequence>
      <Sequence from={a6} durationInFrames={SCENE_FRAMES}>
        <RenameScene language={spec} />
      </Sequence>
      <Sequence from={a7} durationInFrames={PAYOFF_FRAMES}>
        <PayoffScene language={spec} />
      </Sequence>
      <Sequence from={a8} durationInFrames={CTA_FRAMES}>
        <CtaScene language={spec} />
      </Sequence>

      <WipeTransition at={a1} />
      <FlashTransition at={a2} />
      <WipeTransition at={a3} />
      <FlashTransition at={a4} />
      <WipeTransition at={a5} />
      <FlashTransition at={a6} />
      <WipeTransition at={a7} />
      <FlashTransition at={a8} />

      <Audio src={staticFile("bgm.m4a")} volume={audioVolume} />
    </AbsoluteFill>
  );
};
