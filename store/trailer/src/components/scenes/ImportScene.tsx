import React from "react";
import { SceneShell } from "../SceneShell";
import { MockRow } from "../mock/MockRow";
import { Counter } from "../kinetic/Counter";
import { MOCK_TRACKS, type LanguageSpec } from "../../data/captions";

/**
 * Core flow 1 — import: mock library rows cascade in and their status pills
 * flip to "read ✓" one after another while the counter rolls up to 22.
 */
export const ImportScene: React.FC<{ language: LanguageSpec }> = ({ language }) => {
  return (
    <SceneShell language={language} caption={language.scenes.importing} shot="main" accent="#18BED6">
      <div
        style={{
          width: 1240,
          display: "flex",
          flexDirection: "column",
          gap: 13,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -62,
            right: 4,
            display: "flex",
            alignItems: "baseline",
            gap: 8,
          }}
        >
          <Counter to={22} delay={52} duration={70} fontSize={40} color="#147A46" />
          <div style={{ fontSize: 24, color: "#147A46", fontFamily: language.displayFont }}>
            / 22 · {language.ui.failed}
          </div>
        </div>
        {MOCK_TRACKS.map((track, i) => (
          <MockRow
            key={track.file}
            filename={track.file}
            status={language.ui.read}
            delay={i * 11}
            flipAt={62 + i * 11}
          />
        ))}
      </div>
    </SceneShell>
  );
};
