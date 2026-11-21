import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { absoluteFill } from "../absoluteFill";
import { CaptionBar } from "./CaptionBar";
import type { BeatSpec, LanguageSpec } from "../data/captions";
import { SCREENSHOTS } from "../assets";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * One feature beat: the store screenshot with a slow Ken Burns move, a bottom
 * scrim and this beat's caption. Fades in/out against the dark background.
 */
export const FeatureBeat: React.FC<{ language: LanguageSpec; beat: BeatSpec }> = ({
  language,
  beat,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], CLAMP);
  const fadeOut = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [1, 0], CLAMP);

  const progress = interpolate(frame, [0, durationInFrames], [0, 1], CLAMP);
  const smooth = progress * progress * (3 - 2 * progress); // smoothstep, same as the old cursor easing
  const scale = beat.kenBurns.scaleFrom + (beat.kenBurns.scaleTo - beat.kenBurns.scaleFrom) * smooth;
  const x = beat.kenBurns.xFrom + (beat.kenBurns.xTo - beat.kenBurns.xFrom) * smooth;
  const y = beat.kenBurns.yFrom + (beat.kenBurns.yTo - beat.kenBurns.yFrom) * smooth;

  return (
    <div style={{ ...absoluteFill, opacity: Math.min(fadeIn, fadeOut), backgroundColor: "#04060E" }}>
      <div style={{ ...absoluteFill, overflow: "hidden" }}>
        <img
          src={SCREENSHOTS[language.code][beat.shot]}
          alt=""
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale}) translate(${x}%, ${y}%)`,
          }}
        />
      </div>
      <CaptionBar language={language} caption={beat.caption} />
    </div>
  );
};
