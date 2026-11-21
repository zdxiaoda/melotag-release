import React from "react";
import { Composition } from "remotion";
import { loadFont as loadNotoSans } from "@remotion/google-fonts/NotoSans";
import { loadFont as loadNotoSansJP } from "@remotion/google-fonts/NotoSansJP";
import { loadFont as loadNotoSansSC } from "@remotion/google-fonts/NotoSansSC";
import { Trailer } from "./Trailer";
import { Thumbnail } from "./Thumbnail";
import { FPS, HEIGHT, LANGUAGE_CODES, WIDTH, getLanguage, totalFrames } from "./data/captions";

// Fonts load over the network at render time (OFL-1.1, not bundled).
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
          durationInFrames={totalFrames(getLanguage(code))}
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
