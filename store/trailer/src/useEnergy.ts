import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const BANDS = 32;

/**
 * All scene animation maths is written against a 30fps "logical" time base so
 * the 60fps output keeps the exact same motion timing. Frame ranges in the
 * components are logical frames.
 */
export const useLogicalFrame = (): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (frame * 30) / fps;
};

/**
 * Raw frequency spectrum (0..1 per band) of the trailer BGM at the current
 * frame. Returns zeros while the audio metadata is still loading.
 */
export const useSpectrum = (): number[] => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audioData = useAudioData(staticFile("bgm.m4a"));
  if (!audioData) {
    return new Array<number>(BANDS).fill(0);
  }
  return visualizeAudio({ fps, frame, audioData, numberOfSamples: BANDS });
};

/**
 * Normalised bass energy (0..1) — drives glow pulses so the visuals breathe
 * with the music instead of pulsing on a guessed BPM.
 */
export const useBassEnergy = (): number => {
  const spectrum = useSpectrum();
  const bass = spectrum[0] * 0.5 + spectrum[1] * 0.3 + spectrum[2] * 0.2;
  return Math.min(1, bass * 1.7);
};
