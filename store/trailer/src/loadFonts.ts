import { continueRender, delayRender, staticFile } from "remotion";

/**
 * Load the bundled Smiley Sans (得意黑, SIL OFL 1.1 — see
 * public/fonts/OFL-1.1.txt) before the first frame renders.
 */
const handle = delayRender("Loading Smiley Sans");
const font = new FontFace("Smiley Sans", `url(${staticFile("fonts/SmileySans-Oblique.otf")})`);
font
  .load()
  .then((loaded) => {
    (document.fonts as FontFaceSet & { add: (face: FontFace) => void }).add(loaded);
    continueRender(handle);
  })
  .catch((error) => {
    console.error("Failed to load Smiley Sans", error);
    continueRender(handle);
  });
