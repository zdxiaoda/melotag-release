import React from "react";
import { Composition } from "remotion";
import { loadFont as loadNotoSans } from "@remotion/google-fonts/NotoSans";
import { loadFont as loadNotoSansJP } from "@remotion/google-fonts/NotoSansJP";
import { loadFont as loadNotoSansSC } from "@remotion/google-fonts/NotoSansSC";
import { Trailer } from "./Trailer";
import { Thumbnail } from "./Thumbnail";
import { FPS, HEIGHT, LANGUAGE_CODES, WIDTH, getLanguage, totalFramesAll } from "./data/captions";
import "./loadFonts";

// Noto fonts load over the network at render time (OFL-1.1, not bundled);
// Smiley Sans ships with the project (see src/loadFonts.ts).
loadNotoSans("normal", { weights: ["400", "700"], subsets: ["latin"] });
loadNotoSansSC("normal", { weights: ["400", "700"], subsets: ["chinese-simplified", "latin"] });
loadNotoSansJP("normal", { weights: ["400", "700"], subsets: ["japanese", "latin"] });

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {LANGUAGE_CODES.map((code) => (
        <Composition
          key={`trailer-${code}`}
          id={`trailer-${code}`}
          component={Trailer}
          durationInFrames={totalFramesAll()}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{ language: code }}
        />
      ))}
      {LANGUAGE_CODES.map((code) => (
        <Composition
          key={`thumb-${code}`}
          id={`thumb-${code}`}
          component={Thumbnail}
          durationInFrames={2}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{ language: code }}
        />
      ))}
    </>
  );
};
