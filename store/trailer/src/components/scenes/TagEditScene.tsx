import React from "react";
import { interpolate, spring } from "remotion";
import { useLogicalFrame } from "../../useEnergy";
import { SceneShell } from "../SceneShell";
import { CheckDot } from "../mock/CheckDot";
import { CYAN, PURPLE } from "../Background";
import type { LanguageSpec } from "../../data/captions";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const FIELD_DELAYS = [28, 66, 104];

/**
 * Core flow 3 — tag editing: a mock tag form where the cover tile pops in
 * with a glow, the fields type themselves out with a blinking caret, and the
 * save button settles into a green "written" state.
 */
export const TagEditScene: React.FC<{ language: LanguageSpec }> = ({ language }) => {
  const frame = useLogicalFrame();
  const fps = 30;

  const cover = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 120 } });

  const values = [language.ui.values.title, language.ui.values.artist, language.ui.values.album];
  const labels = [language.ui.fields.title, language.ui.fields.artist, language.ui.fields.album];

  const savedAt = 148;
  const saveT = interpolate(frame, [savedAt, savedAt + 8], [0, 1], CLAMP);
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.22);

  return (
    <SceneShell language={language} caption={language.scenes.tagging} shot="main" accent="#6E5BF5">
      <div
        style={{
          width: 1180,
          display: "flex",
          alignItems: "center",
          gap: 46,
          padding: "52px 56px",
          borderRadius: 22,
          background: "rgba(255, 255, 255, 0.88)",
          border: "1px solid rgba(110, 91, 245, 0.18)",
          boxShadow: "0 30px 70px rgba(40, 55, 110, 0.14)",
        }}
      >
        <div
          style={{
            width: 230,
            height: 230,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${PURPLE}, ${CYAN})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 86,
            color: "rgba(255,255,255,0.94)",
            opacity: cover,
            transform: `scale(${0.55 + 0.45 * cover}) rotate(${(1 - cover) * -10}deg)`,
            boxShadow: `0 18px 46px rgba(40,55,110,0.28), 0 0 ${30 + cover * 34}px rgba(110, 91, 245, 0.35)`,
            flexShrink: 0,
          }}
        >
          ♪
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          {labels.map((label, i) => {
            const value = values[i];
            const delay = FIELD_DELAYS[i];
            const typed = interpolate(frame, [delay, delay + Math.max(12, value.length * 2.4)], [0, value.length], CLAMP);
            const shown = value.slice(0, Math.round(typed));
            const caretOn = Math.floor(frame / 8) % 2 === 0 && typed < value.length + 3;
            return (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "13px 22px",
                  borderRadius: 12,
                  background: "rgba(248, 250, 255, 0.94)",
                  border: "1px solid rgba(110, 91, 245, 0.14)",
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    color: "#6F7A94",
                    fontFamily: language.fontFamily,
                    width: 108,
                    textAlign: "left",
                    flexShrink: 0,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: 28,
                    color: "#1B2140",
                    fontFamily: language.fontFamily,
                    whiteSpace: "nowrap",
                    textAlign: "left",
                  }}
                >
                  {shown}
                  <span style={{ color: "#6E5BF5", opacity: caretOn ? 1 : 0 }}>|</span>
                </div>
              </div>
            );
          })}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 26px",
                borderRadius: 999,
                background: saveT > 0 ? "rgba(31, 164, 91, 0.12)" : "rgba(110, 91, 245, 0.10)",
                border: `1px solid ${saveT > 0 ? "rgba(31, 164, 91, 0.5)" : `rgba(110, 91, 245, ${0.3 + pulse * 0.4})`}`,
                boxShadow: saveT > 0 ? "0 0 24px rgba(31,164,91,0.3)" : `0 0 ${10 + pulse * 18}px rgba(110,91,245,0.28)`,
              }}
            >
              {saveT > 0 ? <CheckDot delay={savedAt + 1} size={22} /> : null}
              <div
                style={{
                  fontSize: 22,
                  fontFamily: language.fontFamily,
                  color: saveT > 0 ? "#147A46" : "#5B4BE0",
                  whiteSpace: "nowrap",
                }}
              >
                {saveT > 0 ? language.ui.written : "···"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
