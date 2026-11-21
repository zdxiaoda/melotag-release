import type { CSSProperties } from "react";

/** Fill the nearest positioned ancestor (older Remotion versions export this
 * from "remotion"; defined locally so the project is version-agnostic). */
export const absoluteFill: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};
