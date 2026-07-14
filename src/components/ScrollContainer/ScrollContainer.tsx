import { forwardRef } from "react";
import { Section } from "../Section/Section";
import { SECTIONS } from "../../constants/sections";

export const ScrollContainer = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div className="scroll-container" ref={ref}>
      <div className="background-decor">
        <div className="grid-overlay" />
        <div className="ambient-glow blue-glow" />
        <div className="ambient-glow purple-glow" />
      </div>

      <div className="sections-wrapper">
        {SECTIONS.map((section) => (
          <Section key={section.id} data={section} />
        ))}
      </div>
    </div>
  );
});
