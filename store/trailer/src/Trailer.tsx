import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TitleCard } from "./components/TitleCard";
import { FeatureBeat } from "./components/FeatureBeat";
import { EndCard } from "./components/EndCard";
import { getLanguage, TITLE_FRAMES, END_FRAMES } from "./data/captions";

export const Trailer: React.FC<{ language: string }> = ({ language }) => {
  const spec = getLanguage(language);
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const globalFadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const globalFadeOut = interpolate(frame, [durationInFrames - 24, durationInFrames - 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(globalFadeIn, globalFadeOut);

  // Background music: ChiliChill《给你的BGM Vol.1》 (see ../../audio/README.md).
  // Fades are applied at render time: 1.5s in, 3s out.
  const audioVolume = (f: number): number =>
    interpolate(
      f,
      [0, 45, durationInFrames - 90, durationInFrames - 1],
      [0, 1, 1, 0.9],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

  let cursor = TITLE_FRAMES;

  return (
    <AbsoluteFill style={{ backgroundColor: "#04060E", opacity }}>
      <Sequence from={0} durationInFrames={TITLE_FRAMES}>
        <TitleCard language={spec} />
      </Sequence>
      {spec.beats.map((beat) => {
        const from = cursor;
        cursor += beat.durationInFrames;
        return (
          <Sequence key={beat.name} from={from} durationInFrames={beat.durationInFrames}>
            <FeatureBeat language={spec} beat={beat} />
          </Sequence>
        );
      })}
      <Sequence from={durationInFrames - END_FRAMES} durationInFrames={END_FRAMES}>
        <EndCard language={spec} />
      </Sequence>
      <Audio src={staticFile("bgm.m4a")} volume={audioVolume} />
    </AbsoluteFill>
  );
};
